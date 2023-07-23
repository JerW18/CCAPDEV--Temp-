const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    picture:{
        type:String,
        default:"../images/student_profile.jpg"
    },
    bio:{
        type:String
    }
});

module.exports=mongoose.model('User',userSchema);