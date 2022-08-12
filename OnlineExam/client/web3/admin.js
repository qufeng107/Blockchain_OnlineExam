import { eth, loadContract } from './provider'

import University from "./artifacts/UniversityManagement.json"
import Student from "./artifacts/StudentManagement.json"
import Exam from "./artifacts/ExamManagement.json"
import Key from "./artifacts/KeyManagement.json"



export const checkOwnership = async () => {
  try {
    await ethereum.enable() // Prompt user to let our DApp access their addresses
    const addresses = await eth.getAccounts() // Get user's ETH addresses
    const university = await loadContract(University)
    const ownerStatus = await university.isOwner.call(addresses[0])

    return { isOwner: ownerStatus, accountAddress: addresses[0]}
  } catch (err) {
    console.error("Err:", err )
    alert('Possible Error:\n' +
    '1. Metamask connection error\n' +
    '2. Blockchain issues')  }
}

export const addOwner = async (newOwner) => {
  if (await checkOwnership() == false) return -1

  const university = await loadContract(University)

  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()

    const result = await university.addOwner(
      newOwner,
    {
      from: addresses[0],
    })

    return result
  } catch (err) {
    console.error("Err:", err)
    alert('Possible Error:\n' +
    '1. Metamask connection error\n' +
    '2. Have not ownership of the smart contract' +
    '3. Input format error' +
    '4. Blockchain issues')
  }
}

export const deleteOwner = async (owner) => {
  if (await checkOwnership() == false) return -1

  const university = await loadContract(University)

  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()

    const result = await university.deleteOwner(
      owner,
    {
      from: addresses[0],
    })

    return result
  } catch (err) {
    console.error("Err:", err )
    alert('Possible Error:\n' +
    '1. Metamask connection error\n' +
    '2. Have not ownership of the smart contract' +
    '3. Input format error' +
    '4. Blockchain issues')
  }
}


export const initialization = async (universityAddress, studentAddress) => {
  if (await checkOwnership() == false) return -1
  
  const student = await loadContract(Student)
  const exam = await loadContract(Exam)
  const key = await loadContract(Key)

  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()

    const result1 = await student.init(
      universityAddress,
    {
      from: addresses[0],
    })

    const result2 = await exam.init(
      universityAddress,
      studentAddress,
    {
      from: addresses[0],
    })

    const result3 = await key.init(
      universityAddress,
    {
      from: addresses[0],
    })

    return {studentInit: result1, examtInit: result2, keyInit: result3}
  } catch (err) {
    console.error("Err:", err )
    alert('Possible Error:\n' +
    '1. Metamask connection error\n' +
    '2. You are not the creator of smart contract' +
    '3. Input format error' +
    '4. Blockchain issues')  
  }
}


export const resetAddr = async (universityAddress, studentAddress) => {
  if (await checkOwnership() == false) return -1

  const student = await loadContract(Student)
  const exam = await loadContract(Exam)
  const key = await loadContract(Key)

  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()

    const result1 = await student.changeInit(
      universityAddress,
    {
      from: addresses[0],
    })

    const result2 = await exam.changeInit(
      universityAddress,
      studentAddress,
    {
      from: addresses[0],
    })

    const result3 = await key.changeInit(
      universityAddress,
    {
      from: addresses[0],
    })

    return {studentInit: result1, examtInit: result2, keyInit: result3}
  } catch (err) {
    console.error("Err:", err )
    alert('Possible Error:\n' +
    '1. Metamask connection error\n' +
    '2. Have not ownership of the smart contract' +
    '3. Input format error' +
    '4. Blockchain issues')  
  }
}

export const getInitAddr = async () => {
  
  const exam = await loadContract(Exam)
  try{
    const universityAddr = await exam.showUniversityContractAddr.call()
    const studentAddr = await exam.showStudentContractAddr.call()

    return { UniversityContractAddr: universityAddr, StudentContractAddr: studentAddr}
  } catch (err) {
    console.error("Err:", err )
    alert('Possible Error:\n' +
    '1. Metamask connection error\n' +
    '2. Blockchain issues')
  }
}