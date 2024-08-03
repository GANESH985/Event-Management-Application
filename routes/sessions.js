const express = require('express')

const router = express.Router()

const Session = require('../models/session')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find()
    res.json(sessions)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})



router.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await new Session({ user: decoded.id, ipAddress: req.ip }).save()
  }
  next()
})


module.exports = router
