var AuctionProcess = artifacts.require("./AuctionProcess.sol");

module.exports = function(deployer) {
    deployer.deploy(AuctionProcess);
}
