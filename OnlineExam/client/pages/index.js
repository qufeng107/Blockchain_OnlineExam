import React from 'react'
import 
{ checkOwnership, 
  addOwner, 
  deleteOwner, 
  initialization, 
  resetAddr, 
  getInitAddr
} from "../web3/admin"
import 
{ getStudent, 
  getStudentIDs, 
  updateStudent, 
  deleteStudent
} from "../web3/student_management"
import 
{ getExam, 
  getExamIDs, 
  updateExam,
  setExpired, 
  deleteExam
} from "../web3/exam_management"
import 
{ getDK, 
  updateDKs,
  deleteDKs
} from "../web3/key_management"


export default class IndexPage extends React.Component {


  checkOwner = async () => {
    const ownership = await checkOwnership()
      console.log(ownership)
  }

  createOwner = async () => {
    const tx = await addOwner('0xA9bfd7969c8a9982968d870C9e62e6b6A9748976')
    console.log(tx)
  }

  removeOwner = async () => {
    const tx = await deleteOwner('0xA9bfd7969c8a9982968d870C9e62e6b6A9748976')
    console.log(tx)
  }

  init = async () => {
    const tx = await initialization('0x6d16E6A92747083d2dee4e269435603c686fd469',
      '0x550831db75F00657AF8aB9256F04f4c06D54a77A')
    console.log(tx)
  }

  reset = async () => {
    const tx = await resetAddr('0x6d16E6A92747083d2dee4e269435603c686fd469',
      '0x550831db75F00657AF8aB9256F04f4c06D54a77A')
    console.log(tx)
  }
  showInitAddr = async () => {
    const tx = await getInitAddr('0x6d16E6A92747083d2dee4e269435603c686fd469',
     '0x550831db75F00657AF8aB9256F04f4c06D54a77A')
    console.log(tx)
  }

  getStudentInfo = async () => {
    const tx = await getStudent(1)
    console.log(tx)
  }

  showStudentIDs = async () => {
    const tx = await getStudentIDs()
    console.log(tx)
  }
  
  updateStudentInfo = async () => {
    const newStudent = new Array(
      888,
      "0xe2899bddFD890e320e643044c6b95B9B0b84157A",
      "pk888"
    )
    const tx = await updateStudent(newStudent)
    console.log(tx)
  }

  deleteStudentInfo = async () => {
    const tx = await deleteStudent(1)
    console.log(tx)
  }

  getExamInfo = async () => {
    const tx = await getExam(1)
    console.log(tx)
  }

  showExamIDs = async () => {
    const tx = await getExamIDs()
    console.log(tx)
  }
  
  updateExamInfo = async () => {
    // newExam[0],  // exam id
    // newExam[1],  // students' id array
    // newExam[2],  // start time
    // newExam[3],  // end time
    // newExam[4],  // marker public key
    // newExam[5],  // description
    const newExam = new Array(
      1,
      [1,2,888],
      "2022",
      "2023",
      "marker1",
      "exam1"
    )
    const tx = await updateExam(newExam)
    console.log(tx)
  }

  setExamStatus = async () => {
    const tx = await setExpired(1, true)
    console.log(tx)
  }

  deleteExamInfo = async () => {
    const tx = await deleteExam(1)
    console.log(tx)
  }

  getExamDK = async () => {
    const tx = await getDK(
      1, 
      "0x5045bF5Bf64570E7752a8D3c9C925D372B347d29"
    )
    console.log(tx)
  }

  updateExamDKs = async () => {
    // newDKs[0],  // exam id
    // newDKs[1],  // students' address array
    // newDKs[2],  // students' decryption key array
    const newDKs = new Array(
      1,
      ["0x5045bF5Bf64570E7752a8D3c9C925D372B347d29", "0xA9bfd7969c8a9982968d870C9e62e6b6A9748976"],
      ["DK1", "DK2"],
    )
    const tx = await updateDKs(newDKs)
    console.log(tx)
  }

  deleteExamDKs = async () => {
    const tx = await deleteDKs(
      1, 
      ["0x5045bF5Bf64570E7752a8D3c9C925D372B347d29"]
    )
    console.log(tx)
  }

  render() {
    return (
      <div>
        <button onClick={this.checkOwner}>
          Check ownership
        </button>

        <button onClick={this.createOwner}>
          Add a new owner
        </button>

        <button onClick={this.removeOwner}>
          Delete a new owner
        </button>

        <button onClick={this.init}>
          Initialization
        </button>

        <button onClick={this.reset}>
          Reset (Contract creator only)
        </button>

        <button onClick={this.showInitAddr}>
          Show config
        </button>

        <button onClick={this.getStudentInfo}>
          Get student info
        </button>

        <button onClick={this.showStudentIDs}>
          Get student IDs
        </button>

        <button onClick={this.updateStudentInfo}>
          Update student
        </button>

        <button onClick={this.deleteStudentInfo}>
          Delete student
        </button>

        <button onClick={this.getExamInfo}>
          Get exam info
        </button>

        <button onClick={this.showExamIDs}>
          Get exam IDs
        </button>

        <button onClick={this.updateExamInfo}>
          Update exam
        </button>

        <button onClick={this.setExamStatus}>
          Set expired
        </button>

        <button onClick={this.deleteExamInfo}>
          Delete exam
        </button>

        <button onClick={this.getExamDK}>
          Get exam DK
        </button>

        <button onClick={this.updateExamDKs}>
          Update DKs
        </button>

        <button onClick={this.deleteExamDKs}>
          Delete DKs
        </button>
      </div>
    )
  }
}




