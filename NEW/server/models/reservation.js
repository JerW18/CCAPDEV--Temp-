const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const reservationSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    reservationID:{
        type:String,
        required:true,
        unique:true
    },
    labSeat:{
        type:Object,
        required:true
    },
    requestDateAndTime:{
        type:Object,
        default:Date.now,
        required:true
    },
    reservedDateAndTime:{
        type:Object,
        required:true,
        unique:true
    },
    walkInStudent:{
        type:String,
    },
    isAnonymous:{
        type:Boolean,
        required:true
    }
});

module.exports=mongoose.model('Reservation',reservationSchema);