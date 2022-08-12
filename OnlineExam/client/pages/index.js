import React from 'react'
import { useForm } from "react-hook-form";
import { Center } from "../components/Layout"
import Button from "../components/Button"

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
  updateExamPaper,
  setExpired, 
  deleteExam
} from "../web3/exam_management"
import 
{ getDK, 
  updateDKs,
  deleteDKs
} from "../web3/key_management"





export default class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addOwnerAddr: '',
      deleteOwnerAddr: '',
      getStudentByID: 0,
      uniContAddr: '',
      stuContAddr: '',
      newUniContAddr: '',
      newStuContAddr: '',
      addstudentID: 0,
      addstudentAddr: '',
      addstudentPK: '',
      deleteStudentByID: 0,
      getExamByID: 0,
      addExamID: 0,
      addExamStudentIDs: '',
      addExamStartTime: '',
      addExamEndTime: '',
      addExamMarkerPK: '',
      addExamDescription: '',
      addExamPaperID: 0,
      addExamPaperHash: '',
      setExamStatusID: '',
      setExamStatus: false,
      deleteExamID: 0,
      getExamDKbyID: 0,
      getExamDKbyAddr: '',
      addExamDKsID: 0,
      addExamDKsStudentAddr: '',
      addExamDKs: '',
      deleteExamDKID: 0,
      deleteExamDK: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.createOwner = this.createOwner.bind(this);
    this.removeOwner = this.removeOwner.bind(this);
    this.init = this.init.bind(this);
    this.reset = this.reset.bind(this);
    this.getStudentInfo = this.getStudentInfo.bind(this);
    this.updateStudentInfo = this.updateStudentInfo.bind(this);
    this.deleteStudentInfo = this.deleteStudentInfo.bind(this);
    this.getExamInfo = this.getExamInfo.bind(this);
    this.updateExamInfo = this.updateExamInfo.bind(this);    
    this.updateExamPaperHash = this.updateExamPaperHash.bind(this);
    this.deleteExamInfo = this.deleteExamInfo.bind(this);
    this.setExamStatus = this.setExamStatus.bind(this);
    this.getExamDK = this.getExamDK.bind(this);
    this.updateExamDKs = this.updateExamDKs.bind(this);
    this.deleteExamDKs = this.deleteExamDKs.bind(this);

  }

  handleChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }


  checkOwner = async () => {
    const tx = await checkOwnership()
    console.log(tx)
    alert('Is owner? : ' + tx.isOwner + '\nCurrent address: ' + tx.accountAddress)
  }

  async createOwner(event) {
    alert('A transaction will be created to add the owner address: ' + this.state.addOwnerAddr);
    const tx = await addOwner(this.state.addOwnerAddr);
    console.log(tx)
    event.preventDefault();
  }

  async removeOwner(event) {
    alert('A transaction will be created to delete the owner address: ' + this.state.deleteOwnerAddr);
    const tx = await deleteOwner(this.state.deleteOwnerAddr)
    console.log(tx)
    event.preventDefault();
  }

  async init(event) {
    const tx = await initialization(this.state.uniContAddr,this.state.stuContAddr)
    console.log(tx)
    event.preventDefault();
  }

  async reset(event) {
    const tx = await resetAddr(this.state.newUniContAddr,this.state.newStuContAddr)
    console.log(tx)
    event.preventDefault();
  }

  showInitAddr = async () => {
    const tx = await getInitAddr()
    console.log(tx)
    alert('University Management contract address : ' + tx.UniversityContractAddr 
      + '\nStudent Management contract address : ' + tx.StudentContractAddr)
  }

  async getStudentInfo(event)  {
    const tx = await getStudent(this.state.getStudentByID)
    console.log(tx)
    alert('Student ID : ' + tx.studentID
      + '\nStudent Address : ' + tx.studentAddr
      + '\nStudent Public key : ' + tx.studentPK)
    event.preventDefault();
  }

  showStudentIDs = async () => {
    const tx = await getStudentIDs()
    console.log(tx)
    alert('Stored students\' IDs: ' + tx.storedStudentIDs)
  }

  async updateStudentInfo(event) {
    const newStudent = new Array(
      this.state.addstudentID,
      this.state.addstudentAddr,
      this.state.addstudentPK
    )
    const tx = await updateStudent(newStudent)
    console.log(tx)
    event.preventDefault();
  }

  async deleteStudentInfo(event) {
    const tx = await deleteStudent(this.state.deleteStudentByID)
    console.log(tx)
    event.preventDefault();
  }

  async getExamInfo(event) {
    const tx = await getExam(this.state.getExamByID)
    console.log(tx)    
    alert('Exam ID : ' + tx.examID
    + '\nIs exist ? ' + tx.examInformation[0]
    + '\nIs expired ? ' + tx.examInformation[1]
    + '\nStart time : ' + tx.examInformation[2]
    + '\nEnd time : ' + tx.examInformation[3]
    + '\nMarker public key : ' + tx.examInformation[4]
    + '\nDescription : ' + tx.examInformation[5]
    + '\nExam paper hash : ' + tx.examInformation[6]
    + '\nInvited Students (address, public key): ' + tx.examInformation[7])
    event.preventDefault();
  }

  showExamIDs = async () => {
    const tx = await getExamIDs()
    console.log(tx)
    alert('Stored Exams\' IDs: ' + tx.storedExamIDs)
  }
  
  async updateExamInfo(event) {
    // newExam[0],  // exam id
    // newExam[1],  // students' id array
    // newExam[2],  // start time
    // newExam[3],  // end time
    // newExam[4],  // marker public key
    // newExam[5],  // description
    const newExam = new Array(
      this.state.addExamID,
      this.state.addExamStudentIDs.split(','),
      this.state.addExamStartTime,
      this.state.addExamEndTime,
      this.state.addExamMarkerPK,
      this.state.addExamDescription
    )
    const tx = await updateExam(newExam)
    console.log(tx)
    event.preventDefault();
  }

  async updateExamPaperHash(event) {
    const tx = await updateExamPaper(this.state.addExamPaperID, this.state.addExamPaperHash)
    console.log(tx)
    event.preventDefault();
  }
  

  async setExamStatus(event) {
    const tx = await setExpired(this.state.setExamStatusID, this.state.setExamStatus)
    console.log(tx)
    event.preventDefault();
  }

  async deleteExamInfo(event) {
    const tx = await deleteExam(this.state.deleteExamID)
    console.log(tx)
    event.preventDefault();
  }

  async getExamDK(event) {
    const tx = await getDK(
      this.state.getExamDKbyID, 
      this.state.getExamDKbyAddr
    )
    console.log(tx)
    alert('Exam ID : ' + this.state.getExamDKbyID
    + '\nStudent\'s address : ' + this.state.getExamDKbyAddr
    + '\nStudent\'s DK : ' + tx.DK)
    event.preventDefault();
  }

  async updateExamDKs(event) {
    // newDKs[0],  // exam id
    // newDKs[1],  // students' address array
    // newDKs[2],  // students' decryption key array
    var newDKs = new Array(
      this.state.addExamDKsID,
      this.state.addExamDKsStudentAddr.split(','),
      this.state.addExamDKs.split(',')
    )

    const tx = await updateDKs(newDKs)
    console.log(tx)
    event.preventDefault();
  }

  async deleteExamDKs(event) {
    const tx = await deleteDKs(
      this.state.deleteExamDKID, 
      this.state.deleteExamDK.split(',')
    )
    console.log(tx)
    event.preventDefault();
  }

  



  render() {

    return (
      <Center>
          <h2>
            A <mark>decentralized</mark>, online examination platform built on Ethereum
          </h2>

          <div className="right-side">


            <div className="disclaimer">
              <p>
                MetaMask will automatically open and ask you to confirm a transaction.
              </p>
              <p>
                Please note that creating an account on the Ethereum blockchain costs a small amount of Ether.
              </p>
            </div>
          </div>
        <br/>
        Check if current address is the owner<br/>
        <button onClick={this.checkOwner}>
          Check ownership
        </button>
        <br/><br/>

        <form>
          <label>
          Add new owner address(owner only):<br/>
          <input name="addOwnerAddr" type="text" value={this.state.addOwnerAddr} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.createOwner}>
          Submit
        </button>
        <br/><br/>

        <form>
          <label>
          Delete owner address(owner only):<br/>
          <input name="deleteOwnerAddr" type="text" value={this.state.deleteOwnerAddr} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.removeOwner}>
          Submit
        </button>
        <br/><br/>

        <form>
        Setup/reset University and Student Management contract address(Contract creator only)<br/>
          <label>
          University Management contract address:<br/>
          <input name="uniContAddr" type="text" value={this.state.uniContAddr} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Student Management contract address:<br/>
          <input name="stuContAddr" type="text" value={this.state.stuContAddr} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.init}>
          Submit
        </button>
        <br/><br/>

        <form>
        Update University and Student Management contract address(owner only)<br/>
          <label>
          New University Management contract address:<br/>
          <input name="newUniContAddr" type="text" value={this.state.newUniContAddr} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          New Student Management contract address:<br/>
          <input name="newStuContAddr" type="text" value={this.state.newStuContAddr} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.reset}>
          Reset
        </button>
        <br/><br/>

        Show University and Student Management contract address<br/>
        <button onClick={this.showInitAddr}>
          Get
        </button>
        <br/><br/><br/><br/><br/><br/>

        <form>
        Show student information by ID<br/>
          <label>
          Student ID:<br/>
          <input name="getStudentByID" type="text" value={this.state.getStudentByID} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.getStudentInfo}>
          Submit
        </button>
        <br/><br/>

        Show all stored student IDs<br/>
        <button onClick={this.showStudentIDs}>
          Submit
        </button>
        <br/><br/>

        <form>
        Add/update student information (owner only):<br/>
          <label>
            Student ID:<br/>
          <input name="addstudentID" type="text" value={this.state.addstudentID} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Student public key address:<br/>
          <input name="addstudentAddr" type="text" value={this.state.addstudentAddr} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Student public key:<br/>
          <input name="addstudentPK" type="text" value={this.state.addstudentPK} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.updateStudentInfo}>
          Update
        </button>
        <br/><br/>

        <form>
        Delete student information by ID (owner only):<br/>
          <label>
          Student ID:<br/>
          <input name="deleteStudentByID" type="text" value={this.state.deleteStudentByID} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.deleteStudentInfo}>
          Delete
        </button>
        <br/><br/><br/><br/><br/><br/>

        <form>
        Show exam information by ID:<br/>
          <label>
          Exam ID:<br/>
          <input name="getExamByID" type="text" value={this.state.getExamByID} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.getExamInfo}>
          Submit
        </button>
        <br/><br/>

        Show all stored exam IDs<br/>
        <button onClick={this.showExamIDs}>
          Get
        </button>
        <br/><br/>

        <form>
        Add/update exam information (owner only):<br/>
          <label>
          Exam ID:<br/>
          <input name="addExamID" type="text" value={this.state.addExamID} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Invited students' IDs (example: 001,002,003):<br/>
          <input name="addExamStudentIDs" type="text" value={this.state.addExamStudentIDs} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Exam start time:<br/>
          <input name="addExamStartTime" type="text" value={this.state.addExamStartTime} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Exam end time:<br/>
          <input name="addExamEndTime" type="text" value={this.state.addExamEndTime} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Marker's public key:<br/>
          <input name="addExamMarkerPK" type="text" value={this.state.addExamMarkerPK} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Exam description:<br/>
          <input name="addExamDescription" type="text" value={this.state.addExamDescription} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.updateExamInfo}>
          Update
        </button>
        <br/><br/>

        <form>
        Add/update exam paper hash (owner only):<br/>
          <label>
          Exam ID:<br/>
          <input name="addExamPaperID" type="text" value={this.state.addExamPaperID} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Exam paper hash:<br/>
          <input name="addExamPaperHash" type="text" value={this.state.addExamPaperHash} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.updateExamPaperHash}>
          Update
        </button>
        <br/><br/>

        <form>
        Set exam status (owner only):<br/>
          <label>
          Exam ID:<br/>
          <input name="setExamStatusID" type="text" value={this.state.setExamStatusID} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Is the exam expired? (true or false)<br/>
          <input name="setExamStatus" type="text" value={this.state.setExamStatus} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.setExamStatus}>
          Update
        </button>
        <br/><br/>

        <form>
        Delete exam information by ID (owner only):<br/>
          <label>
          Exam ID:<br/>
          <input name="deleteExamID" type="text" value={this.state.deleteExamID} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.deleteExamInfo}>
          Delete<br/>
        </button>
        <br/><br/><br/><br/><br/><br/>

        <form>
        Show exam paper decryption key by exam ID and student address:<br/>
          <label>
          Exam ID:<br/>
          <input name="getExamDKbyID" type="text" value={this.state.getExamDKbyID} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Student address:<br/>
          <input name="getExamDKbyAddr" type="text" value={this.state.getExamDKbyAddr} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.getExamDK}>
          Get
        </button>
        <br/><br/>

        <form>
        Add/update exam paper decryption keys (owner only):<br/>
          <label>
          Exam ID:<br/>
          <input name="addExamDKsID" type="text" value={this.state.addExamDKsID} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Student addresses (example: addr1,addr2,addr3):<br/>
          <input name="addExamDKsStudentAddr" type="text" value={this.state.addExamDKsStudentAddr} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Exam decryption keys (number and order of DKs should match student addresses above):<br/>
          <input name="addExamDKs" type="text" value={this.state.addExamDKs} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.updateExamDKs}>
          Update
        </button>
        <br/><br/>

        <form>
        Delete exam paper decryption keys by exam ID and student addresses (owner only):<br/>
          <label>
          Exam ID:<br/>
          <input name="deleteExamDKID" type="text" value={this.state.deleteExamDKID} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Student addresses (example: addr1,addr2,addr3):<br/>
          <input name="deleteExamDK" type="text" value={this.state.deleteExamDK} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={this.deleteExamDKs}>
          Delete
        </button>
        <br/><br/>

      </Center>

    )
  }
}


