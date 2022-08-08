// Import the contract...
const StudentManagement = artifacts.require("StudentManagement");

module.exports = function(deployer) {
  // Deploy it!
  deployer.deploy(StudentManagement);
}