const Counter = artifacts.require("Counter");
contract('Counter test', async (accounts) => {
    let instance;
    before(async () => {
        instance = await Counter.deployed();//deploy contract
    });
    it("Initial value of counter should be zero", async () => {
        let count = await instance.getCount.call({ from: accounts[0] });
        assert.equal(count, 0);
    });
});