import Web3 from "web3"
import * as contract from "@truffle/contract"


const provider = () => {
    // If the user has MetaMask:
    if (typeof web3 !== 'undefined') {
        return window.ethereum
    } else {
        console.error("You need to install MetaMask for this app to work!")
    }
}

export const eth = new Web3(provider()).eth


export const loadContract = artifact => {
    const contractObj = contract(artifact)
    contractObj.setProvider(provider())
  
    return contractObj.deployed();
  }