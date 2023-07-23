express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
parentDIR = path.dirname(__filename);
parentDIR = path.dirname(parentDIR);
parentDIR = path.dirname(parentDIR);

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieParser());

// Routes
router.get('/', (req, res) => {
    if (!req.cookies.token) {
        res.redirect('html/index.html');
    }
    else {
        res.redirect('html/reserve.html');
    }
}
);

const User = require('../models/user.js');
const Reservation = require('../models/reservation.js');
const Lab = require('../models/lab.js')

router.get('/getLabs', (req, res) => {
    Lab.find({}).then((data) => {
        res.json(data);
    });
});

router.get('/getReservations', (req, res) => {
    Reservation.find({}).then((data) => {
        res.json(data);
    });
});

router.get('/getUsers', (req, res) => {
    User.find({}).then((data) => {
        res.json(data);
    });
});

router.get('/getUser', (req, res) => {
    const email = req.query.email;
    //if there was a user found return success else return null
    User.findOne({ email: email }).then((data) => {
        res.json(data);
    });
});

router.get('/getLab', (req, res) => {
    const labCode = req.query.labCode;
    console.log(labCode);
    Lab.findOne({ labCode }).then((data) => {
        res.json(data);
    });
});

router.post('/addUser', (req, res) => {

    const user = new User(req.body);
    console.log(user)
    user.save().then((data) => {
        res.status(201).json(data);
    }
    ).catch((error) => {
        res.status(500).json(error);
    }
    );
});

router.get("/getCredentials", (req, res) => {
    // Checks if there are cookies...
    if (req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.MYSECRET);
            const email = decoded.email;

            User.findOne({ email }).then((data) => {
                if (!data.isAdmin) {
                    res.json({ credLevel: 1, email });
                } else {
                    res.json({ credLevel: 2, email });
                }
            }).catch((err) => {
                // If verification fails, clear the invalid 'token'.
                res.json({ credLevel: 0 });
                res.clearCookie('token');
            });
        } catch (err) {
            // If verification fails, clear the invalid 'token'.
            res.json({ credLevel: 0 });
            res.clearCookie('token');
        }
    }
    // If there are no cookies, send "0" for guest.
    else {
        res.json({ credLevel: 0 });
    }
});

router.post('/login', async (req, res) => {

    console.log("Backend");
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.rememberMe);

    const password = req.body.password;
    const email = req.body.email;
    const rememberMe = req.body.rememberMe;

    if (!password || !email) {
        console.log("Login Failed");
        res.status(401).json({ success: false, message: 'Login failed! Incomplete inputs.' });
    }
    else {
        User.findOne({ password, email }).then((data) => {
            console.log(data);

            if (!data) {
                res.status(401).json({ success: false, message: 'Login failed! Invalid credentials.' });
            }
            else {
                if (rememberMe) {
                    const token = jwt.sign({ email }, process.env.MYSECRET, { expiresIn: '1h' });
                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 3 * 7 * 24 * 1000 * 60 * 60, // three weeks
                    });
                } else {
                    const token = jwt.sign({ email }, process.env.MYSECRET, { expiresIn: '1h' });
                    res.cookie('token', token, {
                        httpOnly: true,
                    });
                }

                console.log("Login Successful");
                res.status(200).json({ success: true, message: 'Login successful!' });
            }

        }).catch((err) => {
            console.error('Error:', err);
            console.log("Login Errored");
            return res.status(500).json({ success: false, message: 'An error occurred during login.' });
        });
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


router.get('/home', (req, res) => {
    res.sendFile(path.join(parentDIR, 'public/html/reserve.html'));
});

/*
router.get('/home', (req, res) => {
  console.log("Cookies", req.cookies);
  console.log("Cookie Token", req.cookies.token);
 
  // Check if the 'token' cookie exists
  
  
});*/

router.post('/addReservation', async (req, res) => {
    let last = await Reservation.find().sort({ $natural: -1 }).limit(1);
    let newresID = parseInt(last[0].reservationID.substring(1)) + 1;
    newresID = "R" + newresID.toString().padStart(7, "0");
    const reservation = new Reservation({ ...req.body, reservationID: newresID });
    console.log(reservation)
    reservation.save().then((data) => {
        res.status(201).json(data);
    }
    ).catch((error) => {
        res.status(500).json(error);
    }
    );
});

router.put("/editReservation", async (req, res) => {

    const reservationID = req.body.reservationID;
    const reservationEmail = req.body.email;
    const reservationData = req.body;

    try {
        const editedReservation = await Reservation.updateOne(
            { reservationID, reservationEmail },
            {
                $set: {
                    reservationData
                }
            }
        );

        if (editedReservation.nModified === 0) {
            res.status(400);
            res.end();
        } else {
            res.status(201);
            res.end();
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/editUserPassword", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

});
/*
router.put("/editUser", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const is



    router.delete('/deleteReservation', (req, res) => {
        const reservationID = req.body.reservationID;
        // Checks if there are cookies...
        if (req.cookies.token) {
            try {
                const decoded = jwt.verify(req.cookies.token, process.env.MYSECRET);
                const email = decoded.email;

                User.findOne({ email }).then((data) => {
                    if (data.isAdmin) {
                        Reservation.deleteOne({ reservationID }).then((result) => {
                            console.log(result);
                        });
                        res.status(201);
                        res.end();
                    } else {
                        Reservation.deleteOne({ reservationID, email }).then((result) => {
                            console.log(result);
                            if (result.deletedCount == 0) {
                                res.status(400);
                                res.end();
                            } else {
                                res.status(201);
                                res.end();
                            }
                        });
                    }
                }).catch((err) => {
                    // If verification fails, clear the invalid 'token'.
                    res.status(400);
                    res.end();
                    res.clearCookie('token');
                });
            } catch (err) {
                // If verification fails, clear the invalid 'token'.
                res.status(400);
                res.end();
            }
        }
        // If there are no cookies, send "0" for guest.
        else {
            res.status(403);
            res.end();
        }
    });



    module.exports = router;



    const initialize = require('../initializedb.js');
    const reservation = require('../models/reservation.js');
    const { appendFile } = require('fs');
//README: Uncomment the lines below to initialize the database
//initialize.createUser();
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