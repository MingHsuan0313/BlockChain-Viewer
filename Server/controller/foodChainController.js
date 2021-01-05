const Web3 = require("web3");
const quorumjs = require('quorum-js');

const web3 = new Web3('http://foodchain-node1.etherhost.org:22001');
quorumjs.extend(web3);
let fs = require('fs');
const { url } = require("inspector");
let contract_abi = JSON.parse(fs.readFileSync('food3.abi', 'utf-8'));
let contract_address = '0xA4fafbE0ea4823e262b4916EF93CC5A6306A5DBc';
const contract = new web3.eth.Contract(contract_abi, contract_address);


module.exports = function (app) {
    app.get('/foodchain/fooditem', validateCookie, (req, res) => {
        let logno = req.query['logno'];
        let loghash = req.query['loghash'];
        let logdate = req.query['logdate'];
        let filterObject = {};
        if (logno != undefined) {
            filterObject['logno'] = logno;
        }
        if (loghash != undefined) {
            filterObject['loghash'] = loghash;
        }
        if (logdate != undefined) {
            filterObject['logdate'] = logdate;
        }
        console.log(req.query);
        contract.getPastEvents("FoodItem", {
            filter: filterObject,
            fromBlock: 0,
            toBlock: "latest"
        }).then(async (events) => {
            let responseObject = [];
            for (let index = 0; index < events.length; index++) {
                let event = {};
                event['logdate'] = events[index]['returnValues']['logdate'];
                event['loghash'] = events[index]['returnValues']['loghash'];
                event['logno'] = events[index]['returnValues']['logno'];
                event['blockNumber'] = events[index]['blockNumber'];
                event['event'] = events[index]['event'];
                responseObject.push(event);
            }
            res.status(200).send(JSON.stringify(responseObject))

            // console.log(events);
            // console.log(events);
            res.status(200).send(JSON.stringify(events));
        }).catch(err => {})
    })

    app.post('/foodchain/foodImage', (req, res) => {
        console.log("Hello foodImage");
        console.log(req.body);

        let filter = {};
        filter[req.body.selectFilter] = req.body.payload;

        console.log(filter)
        contract.getPastEvents("FoodImage", {
            filter: filter,
            fromBlock: 0,
            toBlock: "latest"
        }).then(async (events) => {
            console.log(events);
            res.status(200).send(JSON.stringify(events));
        }).catch(err => {})
    })

    app.post('/foodchain/foodImageReplace', (req, res) => {
        console.log("Hello foodImageReplace");
        console.log(req.body);

        let filter = {};
        filter[req.body.selectFilter] = req.body.payload;

        console.log(filter)
        contract.getPastEvents("FoodSection", {
            fromBlock: 0,
            toBlock: "latest"
        }).then(async (events) => {
            console.log(events);
            res.status(200).send(JSON.stringify(events));
        }).catch(err => {})
    })
    app.get('/foodchain/foodcontent', validateCookie, (req, res) => {
        let logno = req.query['logno'];
        let logname = req.query['logname'];
        let logorg = req.query['logorg'];
        let filterObject = {};
        if (logno != undefined) {
            filterObject['logno'] = logno;
        }
        if (loghash != undefined) {
            filterObject['logname'] = logname;
        }
        if (logdate != undefined) {
            filterObject['logorg'] = logorg;
        }
        contract.getPastEvents("FoodContent", {
            filter: filterObject, 
            fromBlock: 0,
            toBlock: "latest"
        }).then(async (events) => {
            // console.log(events);
            let responseObject = [];
            for (let index = 0; index < events.length; index++) {
                let event = {};
                event['logname'] = events[index]['returnValues']['logname'];
                event['logorg'] = events[index]['returnValues']['logorg'];
                event['logno'] = events[index]['returnValues']['logno'];
                event['blockNumber'] = events[index]['blockNumber'];
                event['event'] = events[index]['event'];
                responseObject.push(event);
            }
            res.status(200).send(JSON.stringify(responseObject))

            res.status(200).send(JSON.stringify(events));
        }).catch(err => {})

    })

    app.post('/foodchain/foodsection', validateCookie, (req, res) => {
        let {
            logno,
            title,
            begin,
            end
        } = req.body;
        const account = web3.eth.accounts.privateKeyToAccount("0xab09158d9a817633c28c74b6e6c1bf34c26ffadc1a961870beaeef38b0753495");
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;
        contract.methods.FoodLogSection(parseInt(logno), title, begin, end)
            .send({
                from: web3.eth.defaultAccount,
                gas: 2000000
        });
        res.status(200).send("ok");
    })

    app.get('/foodchain/foodsection', validateCookie, (req, res) => {
        let logno = req.query['logno'];
        let title = req.query['title'];
        let begin = req.query['begin'];
        let end = req.query['end'];
        let filterObject = {};
        if (logno != undefined) {
            if (logno.length != 0)
                filterObject['logno'] = logno;
        }
        if (title != undefined) {
            if (title.length != 0)
                filterObject['title'] = title;
        }
        if (begin != undefined) {
            if (begin.length != 0)
                filterObject['begin'] = begin;
        }
        if (end != undefined) {
            if (end.length != 0)
                filterObject['end'] = end;
        }
        console.log("filter object below");
        console.log(filterObject);
        contract.getPastEvents("FoodSection", {
            filter: filterObject,
            fromBlock: 0,
            toBlock: 'latest'
        }).then((events) => {
            console.log(events);
            let responseObject = [];
            for (let index = 0; index < events.length; index++) {
                let event = {};
                event['begin'] = events[index]['returnValues']['begin'];
                event['end'] = events[index]['returnValues']['end'];
                event['logno'] = events[index]['returnValues']['logno'];
                event['title'] = events[index]['returnValues']['title'];
                event['blockNumber'] = events[index]['blockNumber'];
                event['event'] = events[index]['event'];
                responseObject.push(event);
            }
            res.status(200).send(JSON.stringify(responseObject))
        }).catch(err => {});
    })
}
