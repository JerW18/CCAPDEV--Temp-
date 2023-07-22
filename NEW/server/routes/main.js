express=require('express');
const router = express.Router();
const path = require('path');
parentDIR = path.dirname(__filename);
parentDIR = path.dirname(parentDIR);
parentDIR = path.dirname(parentDIR);
// Routes
router.get('/', (req, res) => {
    res.sendFile(path.join(parentDIR, 'public/index.html'));

    }
);
const User=require('../models/user.js');
const Reservation=require('../models/reservation.js');
const Lab=require('../models/lab.js')

router.get('/getLabs', (req, res) => {
    Lab.find({}).then((data)=>{
        res.json(data);
    });
});

router.get('/getReservations', (req, res) => {
    Reservation.find({}).then((data)=>{
        res.json(data);
    });
});

router.get('/getUsers', (req, res) => {
    User.find({}).then((data)=>{
        res.json(data);
    });
});

router.get('/getUser', (req, res) => {
    const password = req.query.password;
    const email = req.query.email;
    //if there was a user found return success else return null
    User.findOne({password,email}).then((data)=>{
        res.json(data);
    });

});

router.get('/getLab', (req, res) => {
    const labCode=req.query.labCode;
    console.log(labCode);
    Lab.findOne({labCode}).then((data)=>{
        res.json(data);
    });
});





module.exports = router;



const initialize=require('../initializedb.js');
const reservation=require('../models/reservation.js');
//README: Uncomment the lines below to initialize the database
initialize.createUser();
//initialize.createReservations();
//initialize.createLabs();

/*reservation.insertMany([{
    email: "admin1@dlsu.edu.ph",
    reservationID: "R0000069",
    labSeat: {
        lab: "G503",
        seat: "022"
    },
    reservationDate: {
        date: "2023-6-25",
        startTime: "03:08PM",
        endTime: null
    },reservedDate: {
        date: "2023-6-26",
        startTime: 25,
        endTime: 31
    },
    walkInStudent: "cellinia_texas@dlsu.edu.ph",
    isAnonymous: true
}])*/