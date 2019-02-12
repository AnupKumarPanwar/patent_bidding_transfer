var PatentManager = artifacts.require("./PatentManager.sol");

module.exports = function(deployer){
    deployer.deploy(PatentManager);
}