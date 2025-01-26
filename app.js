require('dotenv').config();

const path = require('path');

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const router = require('./server/routes/main.js');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const connectDB = require('./server/config/db.js');
const { connect } = require('http2');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.static(__dirname + '/public'));
app.use(expressLayout);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.set('layout', './layouts/main');
app.set('view engine', 'hbs');

app.use('/', require('./server/routes/main.js'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`Server running on http://localhost:${PORT}`);
}
);