const StudentManagement = artifacts.require('StudentManagement')
const UniversityManagement = artifacts.require('UniversityManagement')


contract("StudentManagement", (accounts) => {

    it("U: check ownership", async () => {
        const U = await UniversityManagement.deployed()
        const S = await StudentManagement.deployed()

        await S.init('0x3D0Cc06fa5eA3bc9CbE3d7101f8b461BceE1180A')

        const isOwner = await U.isOwner.call('0xEBA7CBb393Fd29B181513cd5bab8FDA33D639054')
        console.log(isOwner)
        const test = await S.test.call('0xEBA7CBb393Fd29B181513cd5bab8FDA33D639054')
        console.log(test);

        const isOwner1 = await U.isOwner.call('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        console.log(isOwner1)
        const test3 = await S.test.call('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        console.log(test3);

        await U.addOwner('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        const isOwner2 = await U.isOwner.call('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        console.log(isOwner2)
        const test4 = await S.test.call('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        console.log(test4);

        await U.deleteOwner('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        const isOwner3 = await U.isOwner.call('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        console.log(isOwner3)
        const test5 = await S.test.call('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        console.log(test5);

        await U.deleteOwner('0xEBA7CBb393Fd29B181513cd5bab8FDA33D639054')
        const isOwner4 = await U.isOwner.call('0xEBA7CBb393Fd29B181513cd5bab8FDA33D639054')
        console.log(isOwner4)
        const test1 = await S.test.call('0xEBA7CBb393Fd29B181513cd5bab8FDA33D639054')
        console.log(test1);

        await U.addOwner('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        const isOwner5 = await U.isOwner.call('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        console.log(isOwner5)

        assert.equal(isOwner5, true)
    })





    it("S: should add student", async () => {
        const S = await StudentManagement.deployed()
        await S.addStudent(33292353, '0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74', "123456")
        const value = await S.getStudent.call(33292353)

        assert.equal(value[0][0], '0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        assert.equal(value[0][1], '123456')

      })

    it("S: change init", async () => {
        const S = await StudentManagement.deployed()

        const addrU = await S.test1.call()
        console.log(addrU);
        value1 = await S.test.call('0xEBA7CBb393Fd29B181513cd5bab8FDA33D639054')
        console.log(value1);

        await S.changeInit('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')

        const addrU1 = await S.test1.call()
        console.log(addrU1);

        value = await S.test.call('0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        console.log(value);

        assert.equal(value, true)
    })

    it("S: should add student", async () => {
        const S = await StudentManagement.deployed()
        await S.addStudent(33292354, '0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74', "123456")
        const value = await S.getStudent.call(33292353)

        assert.equal(value[0][0], '0xa0d934Ae101Ce0a951f72338FfDA4c979Fc1Cc74')
        assert.equal(value[0][1], '123456')

      })
  })