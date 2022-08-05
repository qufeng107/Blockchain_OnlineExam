// Import the contract...
const University = artifacts.require("UniversityManagement");

module.exports = (deployer) => {
  // Deploy it!
  deployer.deploy(University);
}