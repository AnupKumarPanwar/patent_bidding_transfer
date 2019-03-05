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
    event printRemainingAuctionTime(uint remainingTime);
    event printAuctionResult(string msg, address winner);
    event duplicateAuction(string msg);
    
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
    function createAuction(uint patentId, uint minimumBid, uint numberOfDays, address publicAddressOwner) public {
        
     
        uint num_seconds = numberOfDays*24*60*60;
        uint endTime = block.timestamp + num_seconds;
        string memory patentType = getPatentType(patentId);
        address[] memory ownersList = getOwnerList(patentId);
        Auction memory resultantAuction;
        uint auctionId = 123123;


        address publicAddress = publicAddressOwner;
        Auction[] memory auctions = auctioneerAuctionMap[publicAddress];

        
        for (uint j = 0; j<auctions.length ; j++){
            auctionId = patentId;
            Auction memory auction = auctions[j];
            if(auction.auctionId == auctionId){
                emit duplicateAuction("Auction Id Already exists");
                return;
            }
            
            resultantAuction = Auction(auctionId, auctionId, endTime, minimumBid, patentType, ownersList);
            auctioneerAuctionMap[publicAddress].push(resultantAuction);
                
        }
    
        auctionId = patentId;
        resultantAuction = Auction(auctionId, auctionId, endTime, minimumBid, patentType, ownersList);
        auctioneerAuctionMap[publicAddress].push(resultantAuction);
        
      
   
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

    function getResult(uint auctionId) public {
        Auction memory auction = auctionIdToAuctionMap[auctionId];
        uint timeNow = block.timestamp;

        uint remianingTime = timeNow - auction.endTime;
        emit printRemainingAuctionTime(remianingTime);
        
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
            emit printAuctionResult("SUCCESS", winner);
        }else{
            emit printAuctionResult("FAILURE", winner);
        }
        return;
    } 

    // function getResult(uint auctionId)
}