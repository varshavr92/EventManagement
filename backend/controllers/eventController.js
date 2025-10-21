const Event = require('../models/eventModel')

//create new event 

exports.createEvent = async (req,res)=>{
    try{
        const event = new Event(req.body)
        const savedEvent= await event.save()
        res.status(200).json(savedEvent)
    }catch(err){
        res.status(400).json({message: err.message})
    }
};

//get all events
exports.getAllEvents = async (req,res)=>{
    try{
        const event =  await Event.find().sort({date:1})
        res.status(200).json(event)
    }catch(err){
        res.status(400).json({message : err.message})
    }
};


//get event by ID

exports.getEventById = async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id)
        if(!event) return res.status(400).json({message: 'Event not found'})
        res.status(300).json(event)
    }catch(err){
        res.status(400).josn({message: err.message})
    }
}

//update event

exports.updateEvent = async(req,res)=>{
    try{
        const updateEvent= await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true , runValidators:true}
        )
        if(!updateEvent) return res.status(400).josn({message:"Event not found"})
            res.status(200).json(updateEvent)
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

// delete event

exports.deleteEvent = async(req,res)=>{
    try{
        const deleteEvent = await Event.findByIdAndDelete(req.params.id)
        if(!deleteEvent) return res.status(400).json({message : "Event not found"})
        res.status(200).json({message:"Event deleted successfully"})
    }catch(err){
        res.status(400).json({message: err.message})

    }
};