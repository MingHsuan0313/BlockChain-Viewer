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

        console.log(req.query);
        contract.getPastEvents("FoodSection", {
            filter: filterObject,
            fromBlock: 0,
            toBlock: "latest"
        }).then(async (events) => {
            // console.log(events);
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
    }) 
}