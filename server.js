const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/events')
const sessionRoutes = require('./routes/sessions')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
   })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/sessions', sessionRoutes)

const PORT = process.env.PORT || 5002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
