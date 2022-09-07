const UniversityManagement = artifacts.require('UniversityManagement')

contract("UniversityManagement", (accounts) => {

    it("U: check ownership for an admin account", async () => {
        const U = await UniversityManagement.deployed()

        const isOwner = await U.isOwner.call('0xd746334e8Ff51D2226bF5E679E33cB54FaF6da61')
        assert.equal(isOwner, true)
    })

    it("U: check ownership for a non-admin account", async () => {
        const U = await UniversityManagement.deployed()

        const isOwner = await U.isOwner.call('0xa1d3cE059A2b12aAa33bF90a9626f5D6b44aB934')
        assert.equal(isOwner, false)
    })

    it("U: should set a non-admin account as admin", async () => {
        const U = await UniversityManagement.deployed()
        await U.addOwner('0xa1d3cE059A2b12aAa33bF90a9626f5D6b44aB934')
        const isOwner = await U.isOwner.call('0xa1d3cE059A2b12aAa33bF90a9626f5D6b44aB934')
        assert.equal(isOwner, true)
    })

    it("U: should set an admin account as non-admin", async () => {
        const U = await UniversityManagement.deployed()
        await U.deleteOwner('0xa1d3cE059A2b12aAa33bF90a9626f5D6b44aB934')
        const isOwner = await U.isOwner.call('0xa1d3cE059A2b12aAa33bF90a9626f5D6b44aB934')
        assert.equal(isOwner, false)
    })
  })