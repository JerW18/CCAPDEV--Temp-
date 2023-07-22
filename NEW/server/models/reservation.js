const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const reservationSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    reservationID:{
        type:String,
        required:true
    },
    labSeat:{
        type:Object,
        required:true
    },
    reservationDate:{
        type:Object,
        default:Date.now,
        required:true
    },
    reservedDate:{
        type:Object,
        required:true
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