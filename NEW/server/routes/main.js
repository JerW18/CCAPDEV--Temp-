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
    res.sendFile(path.join(parentDIR, 'public/index.html'));

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
    const password = req.query.password;
    const email = req.query.email;
    //if there was a user found return success else return null
    User.findOne({ password, email }).then((data) => {
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

router.post('/addReservation', async (req, res) => {

    let last = await Reservation.find().sort({ $natural: -1 }).limit(1)
    console.log("gonk");
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


function checkSessionToken(req, res, next) {
    const token = req.session.token;
  
    if (token) {
      try {
        // Verify the token using your secret key (process.env.MYSECRET)
        const decoded = jwt.verify(token, process.env.MYSECRET);
        req.user = decoded; // Store the decoded token in the request object for future use
        return next(); // Proceed to the next middleware or route handler
      } catch (err) {
        // Token verification failed, clear the invalid token from the session
        delete req.session.token;
      }
    }
  
    // If there's no valid token or token verification failed, proceed to the next middleware or route handler
    return next();
  }
  
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
          if(rememberMe){
              const token = jwt.sign({email}, process.env.MYSECRET, { expiresIn: '1h' });
              res.cookie('token', token, {
                  httpOnly: true,
                  maxAge: 3 * 7 * 24 * 1000 * 60 * 60, // three weeks
              });
          } else {
              const token = jwt.sign({email}, process.env.MYSECRET, { expiresIn: '1h' });
              res.cookie('token', token, {
                  httpOnly: true,
              });
          }
          
  
          // sessions
          //res.session.token = token;
  
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
  
  
  router.get('/home', (req, res) => {
          res.sendFile(path.join(parentDIR, 'public/html/reserve.html'));
  });
  
  /*
  router.get('/home', (req, res) => {
    console.log("Cookies", req.cookies);
    console.log("Cookie Token", req.cookies.token);
  
    // Check if the 'token' cookie exists
    if (req.cookies.token) {
      try {
        // Verify the 'token' cookie using your secret key (process.env.MYSECRET)
        const decoded = jwt.verify(req.cookies.token, process.env.MYSECRET); // decoded is username
        
        console.log("working");
        console.log(decoded);
  
        res.sendFile(path.join(parentDIR, 'public/html/reserve.html'));
  
        //res.redirect('html/reserve.html');
      } catch (err) {
        // If verification fails, clear the invalid 'token' cookie
        console.log("not working");
        res.clearCookie('token');
        // Proceed to check the session 'token'
      }
    }else{
      res.redirect('/');
    }
    
  });*/

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