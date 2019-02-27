pragma experimental ABIEncoderV2;

contract Bidding{

    struct AddressPrice{
        address bidderAddress;
        uint bidPrice;
    }

    struct BidPrice{
        uint auctionId;
        uint bidPrice;
    }

    mapping(address => BidPrice[]) public userBidMap;
    mapping(uint => AddressPrice[]) public auctionToBidersMap;

    function addBid(uint auctionId, uint bidAmount, address sender) public {
        
        uint currentTime = block.timestamp;

        userBidMap[sender].push(BidPrice(auctionId, bidAmount));
        auctionToBidersMap[auctionId].push(AddressPrice(sender, bidAmount));
    }

    function allBids(uint auctionId) public view returns (AddressPrice[] memory){
        return auctionToBidersMap[auctionId];
    }

    // By a person who is biding for multiple IPs
    function getMyBids(address sender) public view returns (BidPrice[] memory){
        return userBidMap[sender];
    }   
}