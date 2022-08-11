pragma solidity >=0.7.0 <0.9.0;

// SPDX-License-Identifier: MIT

contract UniversityManagement{

    // map owner address (can have multiple owners)
    mapping (address => bool) public owners;

    constructor() {
        owners[msg.sender] = true;
    }

    // modifier: only owner (university) address can call the 'onlyOwner' function.
    modifier onlyOwner() {
        require(owners[msg.sender] == true, "Ownerable: caller is not the owner");
        _;
    }

    // add new owner address
    function addOwner(address _owner) public onlyOwner{
        owners[_owner] = true;
    }

    // delete owner address
    function deleteOwner(address _owner) public onlyOwner{
        delete owners[_owner];
    }

    // check if it's the owner address
    function isOwner(address _owner) external view returns (bool){
        return owners[_owner];
    }

}