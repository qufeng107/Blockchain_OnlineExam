// Import the contract...
const Student = artifacts.require("StudentManagement");

module.exports = (deployer) => {
  // Deploy it!
  deployer.deploy(Student);
}