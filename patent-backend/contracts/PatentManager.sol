pragma experimental ABIEncoderV2;

contract PatentManager {

    struct Patent {
        address payable[] owners;
        address payable[] lisenceHolders;
        string patentName;
        string patentType;
        string issueDate;
        uint patentId;
    }

    Patent[] private patents;

    mapping(uint => address[]) public patentOwnerMap;
    
    //store name of the patent for a particular patentId
    mapping(uint => string) public patentNameMap;

    mapping(address => Patent[]) public ownerPatentsMap;

    function registerPatent(address payable[] memory owners, address payable[] memory lisenceHolders, string memory patentName, string memory issueDate, string memory patentType) public returns (uint) {
        uint patentId = patents.length;
        patents.push(Patent(owners, lisenceHolders, patentName, patentType, issueDate, patentId));
        patentOwnerMap[patentId] = owners;
        patentNameMap[patentId] = patentName;
        for (uint i = 0; i < owners.length; i++) {
            ownerPatentsMap[owners[i]].push(patents[patentId]);
        }
        return patentId;
    }

    function addOwner(uint patentId, address payable person) public {
        patents[patentId].owners.push(person);
        ownerPatentsMap[person].push(patents[patentId]);
    }

    function addLisenceHolder(uint patentId, address payable person) public {
        patents[patentId].lisenceHolders.push(person);
    }
    
    function transferPatent(uint patentId, address payable receiver) public {
        for (uint i = 0; i < patents[patentId].owners.length; i++) {
            if (patents[patentId].owners[i]==msg.sender) {
                patents[patentId].owners[i]=receiver;
                break;
            }
        }

        for (uint i = 0; i < ownerPatentsMap[msg.sender].length; i++) {
            uint pos = 0;
            if (ownerPatentsMap[msg.sender][i].patentId==patentId) {
                pos = i;
                break;
            }
            uint last = ownerPatentsMap[msg.sender].length - 1;
            ownerPatentsMap[msg.sender][pos] = ownerPatentsMap[msg.sender][last];
            delete ownerPatentsMap[msg.sender][last];
        }

        for (uint i = 0; i < ownerPatentsMap[msg.sender].length; i++) {
            uint pos = 0;
            if (ownerPatentsMap[msg.sender][i].patentId==patentId) {
                pos = i;
                break;
            }
            uint last = ownerPatentsMap[msg.sender].length - 1;
            ownerPatentsMap[msg.sender][pos] = ownerPatentsMap[msg.sender][last];
            delete ownerPatentsMap[msg.sender][last];
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