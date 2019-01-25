pragma experimental ABIEncoderV2;

contract PatentManager {

    struct Patent {
        address payable[] owners;
        address payable[] lisenceHolders;
        string patentName;
        string patentType;
        string issueDate;
    }

    Patent[] private patents;

    mapping(uint => address[]) public patentOwnerMap;
    
    //store name of the patent for a particular patentId
    mapping(uint => string) public patentNameMap;

    function registerPatent(address payable[] memory owners, address payable[] memory lisenceHolders, string memory patentName, string memory issueDate, string memory patentType) public returns (uint) {
        patents.push(Patent(owners, lisenceHolders, patentName, patentType, issueDate));
        uint patentId = patents.length-1;
        patentOwnerMap[patentId] = owners;
        patentNameMap[patentId] = patentName;
        return (patents.length-1);
    }

    function addOwner(uint patentId, address payable person) public {
        patents[patentId].owners.push(person);
    }

    function addLisenceHolder(uint patentId, address payable person) public {
        patents[patentId].lisenceHolders.push(person);
    }
    
    function transferPatent(uint patentid, address payable receiver) public {
        for (uint i = 0; i < patents[patentid].owners.length; i++) {
            if (patents[patentid].owners[i]==msg.sender) {
                patents[patentid].owners[i]=receiver;
                break;
            }
        }
    }

    function getPatents(uint patentId) public view returns (Patent memory) {
        return (patents[patentId]);
    }

    function getOwnerList(uint patentId) public view returns (address[] memory){
        return (patentOwnerMap[patentId]);
    }

    function getPatentName(uint patentId) public view returns (string memory){
        return (patentNameMap[patentId]);
    }
}

