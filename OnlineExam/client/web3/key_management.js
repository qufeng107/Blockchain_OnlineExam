import { eth, loadContract } from './provider'
import Key from "./artifacts/KeyManagement.json"
import { checkOwnership } from "./admin"


export const getDK = async (eid, studentAddr) => {

  try {
    const key = await loadContract(Key)
    const keyInfo = await key.getDK.call(eid, studentAddr)
  
    return {DK: keyInfo}
    
  } catch (err) {
    console.error("Err:", err )
    alert('Possible Error:\n' +
    '1. Metamask connection error\n' +
    '2. Exam ID does not exist\n' +
    '3. Input format error\n' +
    '4. Blockchain issues')  
  }
  
}

export const updateDKs = async (newDKs) => {
  if (await checkOwnership() == false) return -1

  const key = await loadContract(Key)

  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()

    const result = await key.updateDKs(
      newDKs[0],  // exam id
      newDKs[1],  // students' address array
      newDKs[2],  // students' decryption key array
    {
      from: addresses[0],
    })

    return result
  } catch (err) {
    console.error("Err:", err )
    alert('Possible Error:\n' +
    '1. Metamask connection error\n' +
    '2. Have not ownership of the smart contract\n' +
    '3. Input format error\n' +
    '4. Blockchain issues')    
  }
}

export const deleteDKs = async (eid, studentAddr) => {
  if (await checkOwnership() == false) return -1
  
  const key = await loadContract(Key)
  
  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()
  
    const result = await key.deleteDKs(
      eid,  // exam id
      studentAddr,  // students' address array
    {
      from: addresses[0],
    })
  
    return result
  } catch (err) {
    console.error("Err:", err )
    alert('Possible Error:\n' +
      '1. Metamask connection error\n' +
      '2. Student ID does not exist\n' +
      '3. Blockchain issues')
  }
}