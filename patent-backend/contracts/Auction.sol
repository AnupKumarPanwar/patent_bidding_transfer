pragma experimental ABIEncoderV2;

import "./AuctionProcess.sol";

contract Auction is AuctionProcess{

    // event;
    event NewBid(uint patentId, string name);
    
    struct Bid{
        address bider;
        uint minimumBidBidder; // set by the bidder !
        uint auctionId;
    }

    Bid[] public bidList;

    //
    mapping(address => uint[]) public userBidMap;
    mapping(address => uint[]) public userBidAmountMap;
    mapping(uint => address[]) public auctionToBidersMap;
    

    function addBid(uint patentId, uint bidAmount) public {

        address[] memory patentOwners = getOwnerList(patentId);
        // string memory name = getPatentName(patentId);

        bidList.push(Bid( msg.sender, bidAmount, patentId));
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

    function getBidders(uint auctionId) public returns(address[] memory){
        return auctionToBidersMap[auctionId]
    }
}