
// import "./Ownable.sol"; // Path to the imported library

pragma solidity >=0.7.0 <0.9.0;

// SPDX-License-Identifier: MIT

// interface of university management contract
interface UniversityInterface{

    // check if it's the university address
    function isOwner(address owner) external view returns (bool);
}

// interface of student management contract
interface StudentInterface{
    
    // get the student address and public key by ID
    function getStudent(uint _studentID) external view returns (address, string memory);
}


contract ExamManagement{
    // The following function can only be called by the owner

    address owner;
    address universityContract;
    address studentContract;

    struct exam {
        bool isExist;
        bool isExpired;
        string startTime;
        string endTime;
        string markerPK;
        string description;
        string[] studentPKs;
    }


    mapping (uint => exam) private exams;

    // Emits an event when a new exam is added, you can use this to update remote student lists.
    event examAdded(uint examID, string startTime, string endTime, string markerPK, string description);

    // Emits an event when a new exam is added, you can use this to update remote student lists.
    event examDeleted(uint examID);

    constructor() {
        owner = msg.sender;
    }

    // modifier: only owner (university) address can call the function
    modifier onlyOwner() {
        require(UniversityInterface(universityContract).isOwner(msg.sender) == true, "Ownerable: caller is not the owner");
        _;
    }

    // initial set up of contract addresses of university management and student management
    function init(address _universityContract, address _studentContract) public{
        require(owner == msg.sender, "Ownerable: caller is not the owner");
        universityContract = _universityContract;
        studentContract = _studentContract;
    }

    // change contract addresses of university management
    function changeUniversityContractAddr(address _universityContract) public onlyOwner{
        universityContract = _universityContract;
    }
    
    // change contract addresses of student management
    function changeStudentContractAddr(address _studentContract) public onlyOwner{
        studentContract = _studentContract;
    }

    // show university management contract address
    function showUniversityContractAddr() public view returns(address){
        return universityContract;
    }
    
    // show student management contract address
    function showStudentContractAddr() public view returns(address){
        return studentContract;
    }

    // get exam infomation by ID
    function getExam(uint _examID) public view returns (exam memory){
        
        // require the exam exists.
        require(exams[_examID].isExist == true, "exam does not exist!");

        return exams[_examID];
    }

    // update or add exam
    function updateExam(uint _examID, uint[] memory _studentIDs, string memory _startTime, string memory _endTime, string memory _markerPK, string memory _description) public onlyOwner{

        // require the exam ID to not be empty.
        require(_examID != 0, "student ID is empty!");

        // require the student IDs to not be empty.
        require(_studentIDs.length > 0, "student public key is empty!");

        // require the start time to not be empty.
        require(bytes(_startTime).length > 0, "student public key is empty!");

        // require the end time to not be empty.
        require(bytes(_endTime).length > 0, "student public key is empty!");

        // require the marker public key to not be empty.
        require(bytes(_markerPK).length > 0, "student public key is empty!");

        // adds the exam to the storage.
        exams[_examID].isExist = true;
        exams[_examID].startTime = _startTime;
        exams[_examID].endTime = _endTime;
        exams[_examID].markerPK = _markerPK;
        exams[_examID].description = _description;

        // find all student public keys by ID
        uint length = _studentIDs.length;
        for (uint i = 0; i < length; i++) {
            exams[_examID].studentPKs.push(findStudentPK(_studentIDs[i]));
        }

        // emits exam added event.
        emit examAdded(_examID, exams[_examID].startTime, exams[_examID].endTime, exams[_examID].markerPK, exams[_examID].description);
    }

    // find student public key by ID
    function findStudentPK(uint _studentID) private view returns(string memory){
        address addr;
        string memory PK;
        (addr, PK) = StudentInterface(studentContract).getStudent(_studentID);
        return PK;
    }

    // delete exam
    function deleteExam(uint _examID) public onlyOwner{

        // require the exam ID to not be empty.
        require(_examID != 0, "student ID is empty!");

        // adds the exam to the storage.
        exams[_examID].isExist = false;

        // emits exam deleted event.
        emit examDeleted(_examID);
    }
}
