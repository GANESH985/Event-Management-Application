const express = require('express')
const mongoose = require('mongoose')
const request = require('request')
const weatherData = require('./WeatherData')

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


router.get('/weather/', async (req, res) => {
  if(!req.query.address){
    return res.send("Location is required!")
  }
  weatherData(req.query.address,(error,result)=>{
    if(error){
      return res.send(error)
    }
    res.send(result)
  })
  

})

module.exports = router