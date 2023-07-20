express=require('express');
const router = express.Router();
const path = require('path');
parentDIR = path.dirname(__filename);
parentDIR = path.dirname(parentDIR);
parentDIR = path.dirname(parentDIR);

// Routes
router.get('/', (req, res) => {
    res.sendFile(path.join(parentDIR, '/index.html'));

    }
);


module.exports = router;