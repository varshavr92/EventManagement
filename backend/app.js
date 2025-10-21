require('dotenv').config()
const express = require ('express')
const app = express()
const Port = process.env.PORT || 3000

const morgan =require('morgan')
const cors = require('cors')
const connectDB = require('./connection')
const eventRoute = require('./routes/eventRoute')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())



app.use('/api/events', eventRoute);   

// Default route
app.get('/', (req, res) => {
  res.send('Event Booking System API is running...');
});

connectDB()
app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})
