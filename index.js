const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;
require('./database/db');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

app.use('/card',require('./Router/Card'));
app.use('/player',require('./Router/Player'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});