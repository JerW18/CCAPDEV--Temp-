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


module.exports = router;



const initialize=require('../initializedb.js');

//README: Uncomment the lines below to initialize the database
//initialize.createUser();
//initialize.createReservations();