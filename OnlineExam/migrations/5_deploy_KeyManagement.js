// Import the contract...
const KeyManagement = artifacts.require("KeyManagement");

module.exports = function(deployer) {
  // Deploy it!
  deployer.deploy(KeyManagement);
}