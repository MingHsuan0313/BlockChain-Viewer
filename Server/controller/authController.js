const { randomBytes } = require('crypto');
module.exports = function (app) {
    let userList = [{
            'username': "root",
            'email': "root@gmail.com",
            'password': "0000"
        },
        {
            'username': "marks",
            'email': "marks@gmail.com",
            'password': "apple"
        }
    ]


    app.get("/dddd", (req, res) => {
        console.log("ddd")
        res.status(200).send("hello");
    })

    app.post('/auth/register', (req, res) => {
        let {
            username,
            password,
            email
        } = req.body;
        if (isUserValid(username, email)) {
            let user = {
                'username': username,
                'password': password,
                'email': email
            }
            userList.push(user);
            res.status(201).send('user created');
        } else {
            res.status(400).send('username or email has been used!!');
        }
    });

    app.post('/auth/login', (req, res) => {
        let {
            username,
            password
        } = req.body;
        for (let index = 0; index < userList.length; index++) {
            if (userList[index].username == username && userList[index].password == password) {
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



    function isUserValid(username, email) {
        for (let index = 0; index < userList.length; index++) {
            if (username == userList[index].username || email == userList[index].email)
                return false;
        }
        return true;
    }

}

global.validateCookie = function validateCookie(req, res, next) {
    const {
        cookies
    } = req;
    let uid = cookies['uid'];
    let session_id = cookies['session_id'];
    // console.log(cookies);
    if (uid in sessionStorage) {
        if (sessionStorage[uid] == session_id)
            next();
        else res.status(403).send("msg: Not Authenticated");
    } else res.status(403).send("msg: Not Authenticated");
}