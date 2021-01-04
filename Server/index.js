const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

global.sessionStorage = {};
require('./controller/authController')(app);
require('./controller/foodChainController')(app);




app.get('/testing',validateCookie, (req, res) => {
    console.log("testing gg");
    res.status(200).send("OKa");
})


app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})