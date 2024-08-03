const express = require('express')

const router = express.Router()

const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { createClient } = require('@supabase/supabase-js')

require('dotenv').config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY are required.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

router.post('/register', async (req, res) => {
  const { email, password } = req.body
  try {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    await new User({ 
      email, password: await bcrypt.hash(password, 10) 
    }).save()
    res.status(201).json({ 
      message: 'User registered successfully' 
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const user = await User.findOne({ email })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
module.exports = router
