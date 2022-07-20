pragma solidity >=0.4.25;

contract Token{

  address public owner;

  mapping (address => uint) public balances;

  event Transfer(address from, address to, uint amount);

  constructor() public {
    owner = msg.sender;
  }

  
}