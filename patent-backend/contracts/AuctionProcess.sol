// In this particular contract our aim would be to 
// write a contract which would handle the auctioning process for the bids made for a particular Item 
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

    // Maps auctioneer to the aucitonId 
    // May contain multiple auctionIds 
    mapping(address => Auction[]) auctioneerAuctionMap;
    mapping(uint=>uint) auctionToPriceMap;

    function createAuction(uint patentId, uint minimumBid, uint numberOfDays) public returns(uint) {
            
        uint auctionId = uint(keccak256(abi.encode(patentId)));
        uint num_seconds = numberOfDays*24*60*60;
        uint endTime = block.timestamp - num_seconds;

        // useless warning invoked !
        auctioneerAuctionMap[msg.sender].push(Auction(auctionId, patentId, endTime, minimumBid, getPatentType(patentId), getOwnerList(patentId)));
        auctionToPriceMap[auctionId] = minimumBid;

        return (auctionId);
    }

    function getResult(uint auctionId) private returns (string, address){
        // this function is going to define the result process i.e how are we going to take out the result and decide the winner for the auction. 
        AddressPrice[] priceMap = allBids(auctionId);
        uint maxBid = auctionToPriceMap[auctionId];
        address winner;
        for ( uint bidderCount = 0; bidderCount < priceMap.length ; bidderCount++ ){
            if(priceMap[bidderCount].bidPrice > maxBid){
                maxBid = priceMap[bidderCount].bidPrice;
                winner = priceMap[bidderCount].bidderAddress;
            }
        }

        if(winner != 0x0){
            return ("SUCCESS", winner)
        }else{
            return ("FAILURE", winner)
        }
    } 
}