
// import "./Ownable.sol"; // Path to the imported library

pragma solidity >=0.7.0 <0.9.0;

// SPDX-License-Identifier: MIT

// interface of university management contract.
interface UniversityInterface{

    // check if it's the university address.
    function isOwner(address owner) external view returns (bool);
}


contract KeyManagement{

    address owner;
    address universityContract;

    // exam paper decryption keys for students in each exam. 
    // map exam ID to student addresses, map student address to unique decryption key.
    mapping (uint => mapping (address => string)) private examDKs;

    // Emits an event when exam paper decryption keys for students of an exam is added
    //, you can use this to update remote DKs lists.
    event examDKsAdded(uint examID);

    // Emits an event when exam paper decryption keys of students in an exam is deleted
    //, you can use this to update remote DKs lists.
    event DKsDeleted(uint examID, address [] studentAddr);


    constructor() {
        owner = msg.sender;
    }

    // modifier: only owner (university) address can call the 'onlyOwner' function.
    modifier onlyOwner() {
        require(UniversityInterface(universityContract).isOwner(msg.sender) == true, "Ownerable: caller is not the owner");
        _;
    }

    // initial set up of contract address of university management.
    function init(address _owner) public{
        require(owner == msg.sender, "Ownerable: caller is not the owner");
        universityContract = _owner;
    }

    // change contract address of university management.
    function changeInit(address _owner) public onlyOwner{
        universityContract = _owner;
    }

    // show university management contract address.
    function showUniversityContractAddr() public view returns(address){
        return universityContract;
    }

    // get exam paper decryption key by exam ID and student address.
    function getDK(uint _examID, address _studentAddr) external view returns (string memory){
        
        return examDKs[_examID][_studentAddr];
    }

    // add exam paper decryption keys for students in an exam.
    function updateDKs(uint _examID, address [] memory _studentAddr, string [] memory _DKs) public onlyOwner{

        // require the exam ID to not be empty.
        require(_examID != 0, "exam ID is empty!");

        // require the student address list to not be empty.
        require(_studentAddr.length > 0, "student address list is empty!");

        // require the exam paper decryption key list to not be empty.
        require(_DKs.length > 0, "exam paper decryption key list is empty!");

        // require the number of student equals to the number of DK.
        require(_DKs.length == _studentAddr.length, "the number of student not equals to the number of DK!");

        uint length = _studentAddr.length;
        // adds the exam paper decryption keys to the storage.
        for (uint i = 0; i < length; i++) {
            examDKs[_examID][_studentAddr[i]] = _DKs[i];
        }
        
        // emits exam paper decryption keys added event.
        emit examDKsAdded(_examID);
    }

    // delete exam paper decryption keys of an exam by exam ID and student addresses.
    function deleteDKs(uint _examID, address [] memory _studentAddr) public onlyOwner{

        // require the exam ID to not be empty.
        require(_examID != 0, "exam ID is empty!");

        // require the student address list to not be empty.
        require(_studentAddr.length > 0, "student address list is empty!");

        uint length = _studentAddr.length;
        // delete the exam paper decryption key.
        for (uint i = 0; i < length; i++) {
            delete examDKs[_examID][_studentAddr[i]];
        }

        // emits exam paper decryption key deleted event.
        emit DKsDeleted(_examID, _studentAddr);
    }

}
