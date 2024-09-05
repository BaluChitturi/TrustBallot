import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import { useState, useEffect } from "react";
import './App.css';
import BarChart from "./BarChart";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [dataA, setDataA] = useState("nill");
  const [dataB, setDataB] = useState("nill");
  const [dataC, setDataC] = useState("nill");

  async function readData(contract) {
    const dataA = await contract.methods.getter().call();
    const dataB = await contract.methods.getter1().call();
    const dataC = await contract.methods.getter2().call();
    
    setDataA(parseInt(dataA));
    setDataB(parseInt(dataB));
    setDataC(parseInt(dataC));
  }

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    async function template() {
      const web3 = new Web3(provider);
      console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );
      setState({ web3: web3, contract: contract });
    }
  
    provider && template();
  }, []);

  useEffect(() => {
    const { contract } = state;
  
    contract && readData(contract);
    contract && setupPolling(contract);
  }, [state]);

  async function setupPolling(contract) {
    // Set up continuous monitoring (polling) with a specified interval (e.g., every 5 seconds)
    setInterval(() => {
      readData(contract);
    }, 5000);
  }

  return (
    <div className="App">
      <h1>Live Counting</h1>
      <p className="ContractData">Contract Data A: {dataA}</p>
      <p className="ContractData">Contract Data B: {dataB}</p>
      <p className="ContractData">Contract Data C: {dataC}</p>
      <BarChart yValues={[dataA,dataB,dataC]} />

    </div>
  );
}

export default App;
