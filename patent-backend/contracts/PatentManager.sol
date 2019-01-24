pragma solidity ^0.5.0;

contract PatentManager {

    struct Patent {
        address payable[] owners;
        address payable[] lisenceHolders;
    }

    Patent[] private patents;
    
    function registerPatent(address payable[] memory owners, address payable[] memory lisenceHolders) public returns (uint) {
        patents.push(Patent(owners, lisenceHolders));
        return (patents.length-1);
    }

    function addOwner(uint id, address payable person) public {
        patents[id].owners.push(person);
    }

    function addLisenceHolder(uint id, address payable person) public {
        patents[id].lisenceHolders.push(person);
    }
    
    function transferPatent(uint id, address payable receiver) public {
        for (uint i = 0; i < patents[id].owners.length; i++) {
            if (patents[id].owners[i]==msg.sender) {
                patents[id].owners[i]=receiver;
                break;
            }
        }
    }

    function getPatents(uint id) public view returns (address payable[] memory, address payable[] memory) {
        return (patents[id].owners, patents[id].lisenceHolders);
    }
}
