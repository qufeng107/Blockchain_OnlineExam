import "./Ownable.sol"; // Path to the imported library


contract UniversityInit is Ownable {
    // The following function can only be called by the owner


    function addStudent() onlyOwner public {

    }
}
