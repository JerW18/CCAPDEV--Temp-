const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const labSchema=new Schema({
    labID:{
        type:String,
        required:true
    },
    labTables:{
        type:Array,
        required:true
    }
});