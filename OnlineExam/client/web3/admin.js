import { eth, loadContract } from './provider'

import University from "./artifacts/UniversityManagement.json"
import Student from "./artifacts/StudentManagement.json"
import Exam from "./artifacts/ExamManagement.json"
import Key from "./artifacts/KeyManagement.json"



export const checkOwnership = async () => {
  
  await ethereum.enable() // Prompt user to let our DApp access their addresses
  const addresses = await eth.getAccounts() // Get user's ETH addresses
  const university = await loadContract(University)
  const ownerStatus = await university.isOwner.call(addresses[0])

  return { isOwner: ownerStatus, accountAddress: addresses[0]}
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
    console.error("Err:", err)
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
    console.error("Err:", err)
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
    console.error("Err:", err)
  }
}

export const getInitAddr = async () => {
  
  const exam = await loadContract(Exam)
  const universityAddr = await exam.showUniversityContractAddr.call()
  const studentAddr = await exam.showStudentContractAddr.call()

  return { StoredUniversityManagementContractAddress: universityAddr, StoredStudentManagementContractAddress: studentAddr}
}