
// import "./Ownable.sol"; // Path to the imported library

pragma solidity >=0.7.0 <0.9.0;

// SPDX-License-Identifier: MIT

// interface of university management contract
interface UniversityInterface{

    // check if it's the university address
    function isOwner(address owner) external view returns (bool);
}


contract StudentManagement{
    // The following function can only be called by the owner

    address owner;
    address universityContract;

    struct student {
        bool isExist;
        address studentAddr;
        string studentPK;
    }

    mapping (uint => student) private students;

    // Emits an event when a new student is added, you can use this to update remote student lists.
    event studentAdded(uint studentID, address studentAddr, string studentPK);

    // Emits an event when a new student is added, you can use this to update remote student lists.
    event studentDeleted(uint studentID);

    constructor() {
        owner = msg.sender;
    }

    // modifier: only owner (university) address can call the function
    modifier onlyOwner() {
        require(UniversityInterface(universityContract).isOwner(msg.sender) == true, "Ownerable: caller is not the owner");
        _;
    }

    // initial set up of contract address of university management
    function init(address _owner) public{
        require(owner == msg.sender, "Ownerable: caller is not the owner");
        universityContract = _owner;
    }

    // change contract address of university management
    function changeInit(address _owner) public onlyOwner{
        universityContract = _owner;
    }

    // show university management contract address
    function showUniversityContractAddr() public view returns(address){
        return universityContract;
    }

    // get student infomation by ID
    function getStudent(uint _studentID) external view returns (address, string memory){
        
        // require the student exists.
        require(students[_studentID].isExist == true, "student does not exist!");

        return (students[_studentID].studentAddr, students[_studentID].studentPK);
    }

    // update or add student
    function updateStudent(uint _studentID, address _studentAddr, string memory _studentPK) public onlyOwner{

        // require the student ID to not be empty.
        require(_studentID != 0, "student ID is empty!");

        // require the student address to not be empty.
        require(_studentAddr != address(0x0), "student address is empty!");

        // require the student public key to not be empty.
        require(bytes(_studentPK).length > 0, "student public key is empty!");

        // adds the student to the storage.
        students[_studentID].isExist = true;
        students[_studentID].studentAddr = _studentAddr;
        students[_studentID].studentPK = _studentPK;

        // emits student added event.
        emit studentAdded(_studentID, students[_studentID].studentAddr, students[_studentID].studentPK);
    }

    // delete student
    function deleteStudent(uint _studentID) public onlyOwner{

        // require the student ID to not be empty.
        require(_studentID != 0, "student ID is empty!");

        // adds the student to the storage.
        students[_studentID].isExist = false;

        // emits student deleted event.
        emit studentDeleted(_studentID);
    }
}
