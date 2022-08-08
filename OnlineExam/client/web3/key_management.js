import { eth, loadContract } from './provider'
import Key from "./artifacts/KeyManagement.json"
import { checkOwnership } from "./admin"


export const getDK = async (eid, studentAddr) => {

  try {
    const key = await loadContract(Key)
    const keyInfo = await key.getDK.call(eid, studentAddr)
  
    return keyInfo
    
  } catch (err) {
    console.error("Err:", err)
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
    console.error("Err:", err)
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
      console.error("Err:", err)
    }
}