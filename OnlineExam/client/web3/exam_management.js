import { eth, loadContract } from './provider'
import Exam from "./artifacts/ExamManagement.json"
import { checkOwnership } from "./admin"


export const getExam = async (eid) => {

  try {
    const exam = await loadContract(Exam)
    const examInfo = await exam.getExam.call(eid)
  
    return { examID: eid, examInformation: examInfo}
    
  } catch (err) {
    console.error("Err:", err)
  }
  
}

export const getExamIDs = async () => {
  const exam = await loadContract(Exam)
  const examIDs = await exam.getExamIDs.call()
  var IDs = new Array()
  examIDs.forEach(ID => {
    IDs.push(parseInt(ID.words[0]))
  });
  return { storedExamIDs: IDs}
}

export const updateExam = async (newExam) => {
  if (await checkOwnership() == false) return -1

  const exam = await loadContract(Exam)

  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()

    const result = await exam.updateExam(
      newExam[0],  // exam id
      newExam[1],  // students' id array
      newExam[2],  // start time
      newExam[3],  // end time
      newExam[4],  // marker public key
      newExam[5],  // description
    {
      from: addresses[0],
    })

    return result
  } catch (err) {
    console.error("Err:", err)
  }
}

export const setExpired = async (eid, status) => {
    if (await checkOwnership() == false) return -1
  
    const exam = await loadContract(Exam)
  
    try {
      await ethereum.enable()
      const addresses = await eth.getAccounts()
  
      const result = await exam.setExpired(
        eid,
        status,  // boolean (is the exam expired)
      {
        from: addresses[0],
      })
  
      return result
    } catch (err) {
      console.error("Err:", err)
    }
}

export const deleteExam = async (eid) => {
    if (await checkOwnership() == false) return -1
  
    const exam = await loadContract(Exam)
  
    try {
      await ethereum.enable()
      const addresses = await eth.getAccounts()
  
      const result = await exam.deleteExam(
        eid,
      {
        from: addresses[0],
      })
  
      return result
    } catch (err) {
      console.error("Err:", err)
    }
}