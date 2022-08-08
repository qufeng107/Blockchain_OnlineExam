
// import "./Ownable.sol"; // Path to the imported library

pragma solidity >=0.7.0 <0.9.0;

// SPDX-License-Identifier: MIT

// interface of university management contract.
interface UniversityInterface{

    // check if it's the university address.
    function isOwner(address owner) external view returns (bool);
}

// interface of student management contract.
interface StudentInterface{
    
    // get the student address and public key by ID.
    function getStudent(uint _studentID) external view returns (address, string memory);
}


contract ExamManagement{

    address owner;
    address universityContract;
    address studentContract;

    // address and public key of a student.
    struct student{
        address studentAddr;
        string studentPK;
    }

    // exam infomation.
    struct exam {
        bool isExist;
        bool isExpired;
        string startTime;
        string endTime;
        string markerPK;
        string description;
        student[] students;
    }

    // map exam ID to exam details and invited students' information.
    mapping (uint => exam) private exams;

    // all exam IDs.
    uint [] examIDs;

    // Emits an event when a new exam is updated, you can use this to update remote exam lists.
    event examUpdated(uint examID, string startTime, string endTime, string markerPK, string description);

    // Emits an event when an exam is expired, you can use this to update remote exam lists.
    event examStatusChanged(uint examID, bool isExpired);

    // Emits an event when an exam is deleted, you can use this to update remote exam lists.
    event examDeleted(uint examID);

    constructor() {
        owner = msg.sender;
    }

    // modifier: only owner (university) address can call the 'onlyOwner' function.
    modifier onlyOwner() {
        require(UniversityInterface(universityContract).isOwner(msg.sender) == true, "Ownerable: caller is not the owner");
        _;
    }

    // initial set up of contract addresses of university management and student management.
    function init(address _universityContract, address _studentContract) public{
        require(owner == msg.sender, "Ownerable: caller is not the owner");
        universityContract = _universityContract;
        studentContract = _studentContract;
    }

    // change contract addresses of university management.
    function changeUniversityContractAddr(address _universityContract) public onlyOwner{
        universityContract = _universityContract;
    }
    
    // change contract addresses of student management.
    function changeStudentContractAddr(address _studentContract) public onlyOwner{
        studentContract = _studentContract;
    }

    // show university management contract address.
    function showUniversityContractAddr() public view returns(address){
        return universityContract;
    }
    
    // show student management contract address.
    function showStudentContractAddr() public view returns(address){
        return studentContract;
    }

    // get exam infomation by ID.
    function getExam(uint _examID) public view returns (exam memory){
        
        // require the exam exists.
        require(exams[_examID].isExist == true, "exam does not exist!");

        return exams[_examID];
    }

    // get all exam IDs
    function getExamIDs() external view returns (uint [] memory){

        return examIDs;
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

        // record exam IDs
        if(exams[_examID].isExist == false){
            examIDs.push(_examID);
            exams[_examID].isExist = true;
        }

        // update the exam info to the storage.
        exams[_examID].startTime = _startTime;
        exams[_examID].endTime = _endTime;
        exams[_examID].markerPK = _markerPK;
        exams[_examID].description = _description;

        // find all student addresses and public keys by ID
        uint length = _studentIDs.length;
        for (uint i = 0; i < length; i++) {
            student memory newStudent;
            (newStudent.studentAddr, newStudent.studentPK) = findStudentPK(_studentIDs[i]);
            exams[_examID].students.push(newStudent);
        }

        // emits exam updated event.
        emit examUpdated(_examID, exams[_examID].startTime, exams[_examID].endTime, exams[_examID].markerPK, exams[_examID].description);
    }

    // find student public key by ID
    function findStudentPK(uint _studentID) private view returns(address, string memory){

        return StudentInterface(studentContract).getStudent(_studentID);
    }

    function setExpired(uint _examID, bool _isExpired) public onlyOwner{

        // require the exam ID to not be empty.
        require(_examID != 0, "exam ID is empty!");
        
        // require the exam exists.
        require(exams[_examID].isExist != false, "exam not exists!");

        // set the exam status.
        exams[_examID].isExpired = _isExpired;

        // emits exam status changed event.
        emit examStatusChanged(_examID, exams[_examID].isExpired);
    }

    // delete exam
    function deleteExam(uint _examID) public onlyOwner{

        // require the exam ID to not be empty.
        require(_examID != 0, "exam ID is empty!");
        
        // require the exam exists.
        require(exams[_examID].isExist != false, "exam not exists!");

        
        // delete the exam info.
        delete exams[_examID];

        // exams[_examID].isExist = false;
        // exams[_examID].isExpired = false;
        // exams[_examID].startTime = "";
        // exams[_examID].endTime = "";
        // exams[_examID].markerPK = "";
        // exams[_examID].description = "";

        // delete exams[_examID].students;

        // uint length = exams[_examID].students.length;
        // for (uint i = 0; i < length; i++) {
        //     exams[_examID].students.pop();
        // }

        // emits exam deleted event.
        emit examDeleted(_examID);
    }
}
