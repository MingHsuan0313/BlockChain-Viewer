const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider('ws://localhost:22000')
  // new Web3.providers.HttpProvider("http://localhost:22000")
);

const quorumjs = require("../lib/index.js");

// Call extend to add Quorum into web3 instance
quorumjs.extend(web3);



var sub = web3.quorum.eth.subscribe('newBlockHeaders', function (error, _) {
  // var sub = web3.quorum.eth.subscribe('newBlockHeaders', function (error, _) {
  if (error) console.log(error);
})

sub.on('data', function (blockHeader) {
  console.log(blockHeader)
  // process blocks
});