import React,{useState } from "react";
import {ethers} from "ethers";

const App = ()=>{
      //okay basically i want this app to do three thingd without me lookiung
        //today we did 2/3
        //transactions tommorow
        //and write to the blockchain = we make a response for the leader to be able to read 

      // the purpose of this app is for leaders to be able to inteacte in a ui with the blockchain and make a command and only people with the certain address can accesss the message in this case an order and hit amount
      // tomorrow the soilders can leave a message back for the leadeer 
        //we got to see how we make exclusive to certain addresses and how you add and remobe address that have permission to see message

      const [connectedAddress,setConnectedAddress] = useState(null);
      const [hit,setHit] = useState(null)
      const [word,setWord] = useState("")

        const connectMetamask = async() =>{
          const provider = new ethers.BrowserProvider(window.ethereum) // this is the local connection 
          const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
          const address= ethers.formatEther(accounts[0]);
              setConnectedAddress(address)
              console.log(provider)
        }

        const read = async ()=>{
          //okay we have deployed in remix to sepolia netwoek un eth blockchain 
          //we need the provider the erc and the contract address 
          const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/d1389089801b4e438f109936b38f311d")
          const contractAddress = "0x7274Cb6b7553AA1D859aE72A5E1033eAF015adb0";
          const ERC20_ABI = [
            "function ogcall() view returns(string)",
            "function hit() view returns (string)"
          ] // this is becuse of the way the contract are complied the varible are treated as functisb when alling 
          const contract = new ethers.Contract(contractAddress,ERC20_ABI,provider) //now we need a contract instance to get info from 
          
          
          setWord(await contract.ogcall())  
          setHit(await contract.hit())
          console.log(contract)
       
        }

        const transact = async()=>{
          // to conduct a eth to eth tranasction that dosent involve a contrct 
            //we need the provider the private key the address for me and someone else and the wallet instance and then we make 
              
            try {
              
            const acct1="0x00533d59596D8B5d4CE9F126b14C96934E39b733"
              const acct2= "0x388C818CA8B9251b393131C08a736A67ccB19297"
              const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/d1389089801b4e438f109936b38f311d")
              const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786"
              const wallet = new ethers.Wallet(privateKey,provider);


              const a1balb4 =await  provider.getBalance(acct1)
              const a2bakb2 = await provider.getBalance(acct2)

              console.log(a1balb4)
              console.log(a2bakb2)

                const tx= await wallet.sendTransaction({
                  to:acct2,
                  value:ethers.parseEther("0.025")
                })


                await tx.wait()
                console.log(tx)

                const a1balaf = await provider.getBalance(acct1)
              const a2bakaf = await provider.getBalance(acct2)

              console.log(a1balaf)
              console.log(a2bakaf)
            } catch (error) {
            
    console.error("Transaction failed:", error.message);
  }
            
            

          }


    return(<div>
<button onClick={connectMetamask}>connect</button>
      <p>
        {connectedAddress} is the connected wallet to get the word from up top`
        </p>
<button onClick={read}>getWork</button>
<p> the big homie say... {word}</p>
<p> and that he got ${hit} on it </p>

<button onClick={transact}>sendBread</button>



    </div>)

};

export default App;