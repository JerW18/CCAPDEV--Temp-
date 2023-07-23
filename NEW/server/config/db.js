const mongoose = require('mongoose');

const connectDB = async()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true//,
            //useFindAndModify:false
        });
        console.log(`MongoDB Connected: mongodb://${conn.connection.host}:27017/labReservation`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;