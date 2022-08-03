pragma solidity >=0.7.0 <0.9.0;

contract Ownable{

    // map owner address (can have multiple owners)
    mapping (address => bool) private owners;

    constructor() {
        owners[msg.sender] = true;
    }

    // add new owner address
    function addOwner(address newOwner) public onlyOwner{
        owners[newOwner] = true;
    }

    // check if it's the owner address
    function isOwner(address owner) public view returns (bool){
        return owners[owner];
    }

    modifier onlyOwner() {
        require(owners[msg.sender] == true, "Ownerable: caller is not the owner");
        _;
    }

}