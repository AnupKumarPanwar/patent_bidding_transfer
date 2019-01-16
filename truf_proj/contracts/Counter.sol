pragma solidity >=0.4.0 <0.6.0;

contract Counter {
    event CounterIncrementedEvent(uint count);
    event CounterDecrementedEvent(uint count);

    uint private count = 0;

    function incrementCounter () public {
        count += 1;
        emit CounterIncrementedEvent(count);
    }

    function decrementCounter () public {
        count -= 1;
        emit CounterDecrementedEvent(count);
    }

    function getCount() public view returns ( uint ){
        return count;
    }
}
