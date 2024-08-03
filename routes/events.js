const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const Event = require('../models/events')
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body)
    await event.save()
    res.status(201).json(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})



router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})



router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})



router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})


router.get('/weather/:location', async (req, res) => {
  try {
    const city = req.query.city
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router