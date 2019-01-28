pragma experimental ABIEncoderV2;

import "./PatentManager.sol";

contract Auction is PatentManager{

    // event;
    event NewBid(uint patentId, string name);
    
    struct Bid{
        address[] auctioneer;
        address bider;
        uint minimumBid;
        uint patentId;
        uint time;
    }

    Bid[] public bidList;

    //
    mapping(address => uint[]) public userBidMap;
    mapping(address => uint[]) public userBidAmountMap;
    
    

    function addBid(uint patentId, uint bidAmount) public {

        address[] memory patentOwners = getOwnerList(patentId);
        // string memory name = getPatentName(patentId);

        bidList.push(Bid(patentOwners, msg.sender, bidAmount, patentId, now));
        userBidMap[msg.sender].push(patentId);
        userBidAmountMap[msg.sender].push(bidAmount);
        
    }

    function allBids(uint patentId) public view returns (string memory){
        string memory xx = getPatentName(patentId);
        return(xx);
    }

    // By a person who is biding for multiple IPs
    function getMyBids() public view returns (uint[] memory, uint[] memory){
        return (userBidMap[msg.sender], userBidAmountMap[msg.sender]);
    }   
}