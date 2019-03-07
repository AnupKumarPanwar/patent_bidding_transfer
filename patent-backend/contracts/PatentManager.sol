pragma experimental ABIEncoderV2;

contract PatentManager {

    struct Patent {
        address payable[] owners;
        address payable[] lisenceHolders;
        string patentName;
        string patentType;
        string patentSubType;
        string issueDate;
        uint patentId;
    }

    Patent[] public patents;

    mapping(uint => address[]) public patentOwnerMap;
    
    //store name of the patent for a particular patentId
    mapping(uint => string) public patentNameMap;

    mapping(address => Patent[]) public ownerPatentsMap;

    event printIntValue(uint value);

    function registerPatent(address payable[] memory owners, address payable[] memory lisenceHolders, string memory patentName, string memory issueDate, string memory patentType, string memory patentSubType) public returns (uint) {
        uint patentId = patents.length;
        patents.push(Patent(owners, lisenceHolders, patentName, patentType, patentSubType, issueDate, patentId));
        patentOwnerMap[patentId] = owners;
        patentNameMap[patentId] = patentName;
        for (uint i = 0; i < owners.length; i++) {
            ownerPatentsMap[owners[i]].push(patents[patentId]);
        }
        emit printIntValue(patentId);
        return patentId;
    }

    function addOwner(uint patentId, address payable person) public {
        patents[patentId].owners.push(person);
        ownerPatentsMap[person].push(patents[patentId]);
    }

    function addLisenceHolder(uint patentId, address payable person) public {
        patents[patentId].lisenceHolders.push(person);
    }
    
    function transferPatent(uint patentId, address payable receiver, address payable sender) public {
        for (uint i = 0; i < patents[patentId].owners.length; i++) {
            if (patents[patentId].owners[i]==sender) {
                patents[patentId].owners[i]=receiver;
                ownerPatentsMap[receiver].push(patents[patentId]);
                break;
            }
        }

        for (uint i = 0; i < ownerPatentsMap[sender].length; i++) {
            if (ownerPatentsMap[sender][i].patentId==patentId) {
                uint last = ownerPatentsMap[sender].length - 1;
                ownerPatentsMap[sender][i] = ownerPatentsMap[sender][last];
                delete ownerPatentsMap[sender][last];
                break;
            }
        }
    }

    function getPatent(uint patentId) public view returns (Patent memory) {
        return (patents[patentId]);
    }

    function getOwnerList(uint patentId) public view returns (address[] memory){
        return (patentOwnerMap[patentId]);
    }

    function getPatentName(uint patentId) public view returns (string memory){
        return (patentNameMap[patentId]);
    }
    
    function getPatentType(uint patentId) public view returns(string memory){
        return patents[patentId].patentType;
    }

    function getPatentsByOwner(address owner) public view returns (Patent[] memory){
        return ownerPatentsMap[owner];  
    }

}