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
    

    function addBid(uint patentId, uint bidAmount) public {

        address[] memory patentOwners = getOwnerList(patentId);
        // string memory name = getPatentName(patentId);

        bidList.push(Bid(patentOwners, msg.sender, bidAmount, patentId, now));
        userBidMap[msg.sender].push(now);
    }

    function allBids(uint patentId) public view returns (string memory){
        string memory xx = getPatentName(patentId);
        return(xx);
    }

    // By a person who is biding for multiple IPs
    function getMyBids() public view returns (string[] memory, uint[] memory){
        uint[] memory patents = userBidMap[msg.sender];
        // return (patents);
        string[] memory patentNames = new string[](patents.length);
        uint[] memory patentAmounts = new uint[](patents.length);

        for( uint i = 0; i<patents.length; i++){
            patentNames[i] = getPatentName(patents[i]);
            patentAmounts[i] = bidList[i].minimumBid;
        }

        return (patentNames, patents);
    }   
}