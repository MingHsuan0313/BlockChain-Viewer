const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
let userList = [
    {
        'username':"root",
        'email':"root@gmail.com",
        "password":"0000"
    },
    {
        'username': "marks",
        'email': "marks@gmail.com",
        'password': "apple"
    }
]

app.post('/auth/login', (req, res) => {
    let { username, password } = req.body;
    for(let index = 0;index < userList.length;index++) {
        if(userList[index].username == username && userList[index].password == password)
            res.status(200).send('ok');
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