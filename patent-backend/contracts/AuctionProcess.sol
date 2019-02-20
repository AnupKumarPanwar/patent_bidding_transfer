pragma experimental ABIEncoderV2;

import "./PatentManager.sol";
import "./Bidding.sol";

contract AuctionProcess is PatentManager, Bidding{

    struct Auction {
        uint auctionId;
        uint patentId;
        uint endTime; 
        uint minimumBidAuctioneer; // set by the Auctioneer !
        string patentType;
        address[] auctioneer;
    }

    event AuctionIdReturn(uint auctionId);
    
    // Maps auctioneer to the aucitonId 
    // May contain multiple auctionIds 
    mapping(address => Auction[]) auctioneerAuctionMap;
    mapping(uint=>uint) auctionToPriceMap;


    function createAuction(uint patentId, uint minimumBid, uint numberOfDays, address publicAddress) public returns(uint) {
        uint auctionId = patentId;
        uint num_seconds = numberOfDays*24*60*60;
        uint endTime = block.timestamp + num_seconds;
        // Auction(auctionId, patentId, endTime, minimumBid, getPatentType(patentId), getOwnerList(patentId));
        auctioneerAuctionMap[publicAddress].push(Auction(auctionId, patentId, endTime, minimumBid, getPatentType(patentId), getOwnerList(patentId)));
        auctionToPriceMap[auctionId] = minimumBid;
    
        return (auctionId);
    }

    function getResult(uint auctionId) public view returns (string memory , address){
        AddressPrice[] memory priceMap = allBids(auctionId);
        uint maxBid = auctionToPriceMap[auctionId];
        address winner;
        for ( uint bidderCount = 0; bidderCount < priceMap.length ; bidderCount++ ){
            if(priceMap[bidderCount].bidPrice > maxBid){
                maxBid = priceMap[bidderCount].bidPrice;
                winner = priceMap[bidderCount].bidderAddress;
            }
        }

        if(winner != address(0x0)){
            return ("SUCCESS", winner);
        }else{
            return ("FAILURE", winner);
        }
    } 

    function getAuctions(address owner) public view returns(Auction[] memory){   
        // Auction[] memory auction = auctioneerAuctionMap[owner]; 
        return auctioneerAuctionMap[owner];
    }
}