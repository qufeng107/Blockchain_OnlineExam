// Import the contract...
const ExamManagement = artifacts.require("ExamManagement");

module.exports = function(deployer) {
  // Deploy it!
  deployer.deploy(ExamManagement);
}