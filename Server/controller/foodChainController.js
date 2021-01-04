const Web3 = require("web3");
const quorumjs = require('quorum-js');

const web3 = new Web3('http://foodchain-node1.etherhost.org:22001');
quorumjs.extend(web3);
let fs = require('fs');
let contract_abi = JSON.parse(fs.readFileSync('food3.abi', 'utf-8'));
let contract_address = '0xA4fafbE0ea4823e262b4916EF93CC5A6306A5DBc';
const contract = new web3.eth.Contract(contract_abi, contract_address);


module.exports = function (app) {
    app.get('/foodchain/fooditem', validateCookie, (req, res) => {
        let logno = req.query['logno'];
        let loghash = req.query['loghash'];
        let logdate = req.query['logdate'];
        let filterObject = {};
        if(logno != undefined) {
            filterObject['logno'] = logno;
        }
        if(loghash != undefined) {
            filterObject['loghash'] = loghash;
        }
        if(logdate != undefined) {
            filterObject['logdate'] = logdate;
        }
        filterObject['logno'] = '7122'
        console.log(req.query);
        contract.getPastEvents("FoodSection", {
            filter: filterObject,
            fromBlock: 0,
            toBlock: "latest"
        }).then(async (events) => {
            // console.log(events);
            console.log(events);
            res.status(200).send(JSON.stringify(events));
        }).catch(err => {})
    })

    app.get('/foodchain/foodcontent', validateCookie, (req, res) => {
        let logno = req.query['logno'];
        let logname = req.query['logname'];
        let logorg = req.query['logorg'];
        contract.getPastEvents("FoodSection", {
            filter: {
                title: ['綠茶']
            },
            fromBlock: 0,
            toBlock: "latest"
        }).then(async (events) => {
            // console.log(events);
            res.status(200).send(JSON.stringify(events));
        }).catch(err => {})

    })

    app.get('/foodchain/foodsection', validateCookie, (req, res) => {
        let logno = req.query['logno'];
        let title = req.query['title'];
        let begin = req.query['begin'];
        let end = req.query['end'];
        let filterObject = {};
        if(logno != undefined) {
            if(logno.length != 0)
                filterObject['logno'] = logno;
        }
        if(title != undefined) {
            if(title.length != 0)
                filterObject['title'] = title;
        }
        if(begin != undefined) {
            if(begin.length != 0)
                filterObject['begin'] = begin;
        }
        if(end != undefined) {
            if(end.length != 0)
                filterObject['end'] = end;
        }
        console.log("filter object below");
        console.log(filterObject);
        contract.getPastEvents("FoodSection", {
            filter: filterObject,
            fromBlock: 0,
            toBlock: 'latest'
        }).then((events) => {
            let responseObject = [];
            for(let index = 0;index < events.length;index++) {
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