pragma experimental ABIEncoderV2;

import "./AuctionProcess.sol";

contract Bidding{

    // event;
    event NewBid(uint patentId, string name);

    struct AddressPrice{
        address bidderAddess;
        uint bidPrice;
    }

    struct BidPrice{
        uint auctionId;
        uint bidPrice;
    }

    mapping(address => BidPrice[]) public userBidMap;
    mapping(uint => AddressPrice[]) public auctionToBidersMap;

    function addBid(uint auctionId, uint bidAmount) public {

        // @ TODO :
        /**
        In this portion we have to add the require function the checks whether the time at which bidders is trying to bid is it less than the time for the auction or not ! */

        userBidMap[msg.sender].push(BidPrice(auctionId, bidAmount));
        auctionToBidersMap[auctionId].push(AddressPrice(msg.sender, bidAmount));
    }

    // returns all bids filed for a particular auctionID
    function allBids(uint auctionId) public view returns (AddressPrice[] memory){
        return auctionToBidersMap[auctionId];
    }

    // By a person who is biding for multiple IPs
    function getMyBids() public view returns (BidPrice[] memory){
        return userBidMap[msg.sender];
    }   
}