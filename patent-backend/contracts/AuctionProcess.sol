// In this particular contract our aim would be to 
// write a contract which would handle the auctioning process for the bids made for a particular Item 
pragma experimental ABIEncoderV2;

import "./PatentManager.sol";
// import "./Auction.sol";

contract AuctionProcess is PatentManager{

    struct AuctionList {
        uint auctionId;
        uint patentId;
        uint endTime; 
        uint minimumBidAuctioneer; // set by the Auctioneer !
        string patentType;
        address[] auctioneer;
    }

    AuctionList[] public auctionList;
    mapping(address => uint[]) auctioneerAuctionMap;


    function createAuction(uint patentId, uint minimumBid, uint numberOfDays) public returns(uint) {
        uint auctionId = uint(keccak256(abi.encode(auctionList.length)));
        uint num_seconds = numberOfDays*24*60*60;
        uint endTime = block.timestamp - num_seconds;

        auctionList.push(AuctionList(auctionId, patentId, endTime, minimumBid, getPatentType(patentId), getOwnerList(patentId)));

        auctioneerAuctionMap[msg.sender].push(auctionId);
        // auctionList.push(AuctionList(auctionId,patentId))
        return (auctionId);
    }

    

    function getResult(uint auctionId) public{
        
    }
}