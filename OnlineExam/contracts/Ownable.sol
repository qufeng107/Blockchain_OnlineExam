
contract Ownable{

    address private _owner;


    constructor() {
        _owner = msg.sender;
    }


    function viewOwner() public view virtual returns (address) {
        return _owner;
    }


    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownerable: caller is not the owner");
        _;
    }


    function transferOwnership(address newOwner) public virtual onlyOwner {
    _owner = newOwner;
    }
}