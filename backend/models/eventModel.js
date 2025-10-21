const mongoose = require ('mongoose')
const eventSchema =  new mongoose.Schema({
    title:{type:String , required:true },
    description :{type:String, required : true},
    category:{type:String, enum:['Technology','Entertainment','Sports and Fitness']},
    venue:{type:String, required:true},
    date:{type:Date},
    ticketPrice:{type:Number},
    createdAt:{type:Date , default : Date.now()}

})


module.exports = mongoose.model('events',eventSchema)