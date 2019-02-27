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
    // mapping(uint )
    mapping(uint=>Auction) auctionIdToAuctionMap;


    // function createAuction(uint patentId, uint minimumBid, uint numberOfDays, address publicAddress) public returns(uint) {
    //     uint auctionId = patentId;
    //     uint num_seconds = numberOfDays*24*60*60;
    //     uint endTime = block.timestamp + num_seconds;
    //     // Auction(auctionId, patentId, endTime, minimumBid, getPatentType(patentId), getOwnerList(patentId));
    //     auctioneerAuctionMap[publicAddress].push(Auction(auctionId, patentId, endTime, minimumBid, getPatentType(patentId), getOwnerList(patentId)));
    //     auctionToPriceMap[auctionId] = minimumBid;

    //     emit AuctionIdReturn(auctionId);
    
    //     return (auctionId);
    // }
    function createAuction(uint patentId, uint minimumBid, uint numberOfDays, address[] memory publicAddressOwners) public {
        
        uint auctionId = patentId;
        uint num_seconds = numberOfDays*24*60*60;
        uint endTime = block.timestamp + num_seconds;
        string memory patentType = getPatentType(patentId);
        address[] memory ownersList = getOwnerList(patentId);
        Auction memory resultantAuction;

        for (uint i = 0 ; i < publicAddressOwners.length ; i++){

            address publicAddress = publicAddressOwners[i];
            Auction[] memory auctions = auctioneerAuctionMap[publicAddress];

            for (uint j = 0; j<auctions.length ; j++){
                Auction memory auction = auctions[j];
                require(auction.auctionId == auctionId, "Patent already up for auction");
                
                resultantAuction = Auction(auctionId, auctionId, endTime, minimumBid, patentType, ownersList);
                auctioneerAuctionMap[publicAddress].push(resultantAuction);
                
            }
        }    
        auctionIdToAuctionMap[auctionId] = resultantAuction;
        emit AuctionIdReturn(auctionId);
    }

    function getPatentTimePrice(uint auctionId) public view  returns (uint, uint){
        Auction memory auction = auctionIdToAuctionMap[auctionId];
        uint endTime = auction.endTime;
        uint minimumBid = auction.minimumBidAuctioneer;
        return (endTime, minimumBid) ;
    }

    function getAuctions(address owner) public view returns(Auction[] memory){   
        return auctioneerAuctionMap[owner];
    }

    function getResult(uint auctionId) public view returns (string memory , address){
        Auction memory auction = auctionIdToAuctionMap[auctionId];
        uint timeNow = block.timestamp;
        
        require(timeNow >= auction.endTime, "{'message':'Cannot get result right now'}");
        
        AddressPrice[] memory priceMap = allBids(auctionId);
        uint maxBid = auction.minimumBidAuctioneer;
        address winner;
        for ( uint bidderCount = 0; bidderCount < priceMap.length ; bidderCount++ ){
            if(priceMap[bidderCount].bidPrice > maxBid){
                maxBid = priceMap[bidderCount].bidPrice;
                winner = priceMap[bidderCount].bidderAddress;
            }
        }

        if(winner != address(0x0)){
            // addLisenceHolder(auction.patentId, address(uint160(winner)));
            return ("SUCCESS", winner);
        }else{
            return ("FAILURE", winner);
        }
    } 

    // function getResult(uint auctionId)

   

    
}