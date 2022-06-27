var Web3 = require("web3")
const web3 = new Web3("https://node.stripchain.blockwell.ai")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
