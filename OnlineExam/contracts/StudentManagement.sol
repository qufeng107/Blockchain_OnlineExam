
import "./Ownable.sol"; // Path to the imported library

pragma solidity >=0.7.0 <0.9.0;


contract StudentManagement{
    // The following function can only be called by the owner

    struct student {
        address studentAddr;
        string studentPK;
    }

    mapping (uint => student[]) private students;

    // Emits an event when a new student is added, you can use this to update remote student lists.
    event studentAdded(uint studentID, address studentAddr, string studentPK);

    function getStudent(uint _studentID) public view returns (student [] memory){
        return students[_studentID];
    }

    function addStudent(uint _studentID, address _studentAddr, string memory _studentPK) public {
        // require the student ID to not be empty.
        require(_studentID != 0, "student ID is empty!");

        // require the student address to not be empty.
        require(_studentAddr != address(0x0), "student address is empty!");

        // require the student public key to not be empty.
        require(bytes(_studentPK).length > 0, "student public key is empty!");

        // adds the student to the storage.
        student memory newStudent = student(_studentAddr, _studentPK);
        students[_studentID].push(newStudent);

        // emits item added event.
        emit studentAdded(_studentID, newStudent.studentAddr, newStudent.studentPK);
    }
}
