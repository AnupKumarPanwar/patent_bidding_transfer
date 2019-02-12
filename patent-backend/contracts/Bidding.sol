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

    function addBid(uint auctionId, uint bidAmount) public {

        userBidMap[msg.sender].push(BidPrice(auctionId, bidAmount));
        auctionToBidersMap[auctionId].push(AddressPrice(msg.sender, bidAmount));
    }

    function allBids(uint auctionId) public view returns (AddressPrice[] memory){
        return auctionToBidersMap[auctionId];
    }

    // By a person who is biding for multiple IPs
    function getMyBids() public view returns (BidPrice[] memory){
        return userBidMap[msg.sender];
    }   
}