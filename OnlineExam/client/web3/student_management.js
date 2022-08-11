import { eth, loadContract } from './provider'
import Student from "./artifacts/StudentManagement.json"
import { checkOwnership } from "./admin"


export const getStudent = async (sid) => {
  try {
    const student = await loadContract(Student)
    const studentInfo = await student.getStudent.call(sid)
  
    return { studentID: sid, studentAddr: studentInfo[0], studentPK: studentInfo[1]}

  } catch (err) {
    console.error("Err:", err)
  }

}

export const getStudentIDs = async () => {
  const student = await loadContract(Student)
  const studentIDs = await student.getStudentIDs.call()
  var IDs = new Array()
  studentIDs.forEach(ID => {
    IDs.push(parseInt(ID.words[0]))
  });
  return { storedStudentIDs: IDs}
}

export const updateStudent = async (newStudent) => {
  if (await checkOwnership() == false) return -1

  const student = await loadContract(Student)

  try {
    await ethereum.enable()
    const addresses = await eth.getAccounts()

    const result = await student.updateStudent(
      newStudent[0],
      newStudent[1],
      newStudent[2],
    {
      from: addresses[0],
    })

    return result
  } catch (err) {
    console.error("Err:", err)
  }
}

export const deleteStudent = async (sid) => {
    if (await checkOwnership() == false) return -1
  
    const student = await loadContract(Student)
  
    try {
      await ethereum.enable()
      const addresses = await eth.getAccounts()
  
      const result = await student.deleteStudent(
        sid,
      {
        from: addresses[0],
      })
  
      return result
    } catch (err) {
      console.error("Err:", err)
    }
  }