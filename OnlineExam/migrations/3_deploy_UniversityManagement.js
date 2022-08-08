// Import the contract...
const UniversityManagement = artifacts.require("UniversityManagement");

module.exports = function(deployer) {
  // Deploy it!
  deployer.deploy(UniversityManagement);
}