const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
let userList = [
    {
        'username':"root",
        'email':"root@gmail.com",
        'password':"0000"
    },
    {
        'username': "marks",
        'email': "marks@gmail.com",
        'password': "apple"
    }
]

let sessionStorage = {};

app.post('/auth/login',(req, res) => {
    let { username, password } = req.body;
    for(let index = 0;index < userList.length;index++) {
        if(userList[index].username == username && userList[index].password == password) {
            let uid = randomBytes(4).toString('hex');
            let session_id = randomBytes(8).toString('hex');
            sessionStorage[uid] = session_id;
            res.cookie('session_id', session_id);
            res.cookie('uid', uid);
            res.status(200).send('ok');
            return;
        }
    }
    res.status(400).send('user not found');
});

app.post('/auth/register', (req, res) => {
    let { username, password, email } = req.body;
    if(isUserValid(username, email)) {
        let user = {
            'username': username,
            'password': password,
            'email': email
        }
        userList.push(user);
        res.status(201).send('user created');
    }
    else {
        res.status(400).send('username or email has been used!!');
    }
});

function validateCookie(req, res, next) {
    const { cookies } = req;
    let uid = cookies['uid'];
    let session_id = cookies['session_id'];
    // console.log(cookies);
    if (uid in sessionStorage) {
        if(sessionStorage[uid] == session_id)
            next();
        else res.status(403).send("msg: Not Authenticated");
    }
    else res.status(403).send("msg: Not Authenticated");
}

app.get('/testing',validateCookie, (req, res) => {
    console.log("testing gg");
    res.status(200).send("OKa");
})

function isUserValid(username, email) {
    for(let index = 0;index < userList.length;index++) {
        if(username == userList[index].username || email == userList[index].email)
            return false;
    }
    return true;
}

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})