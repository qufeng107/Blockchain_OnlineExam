import "./Ownable.sol"; // Path to the imported library


contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {

    }
}
