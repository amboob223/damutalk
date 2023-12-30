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
          const address= accounts[0];
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

const write = async()=>{
  //to write we combine some of what we did earlier we got to get the provider
  //  and the wallet totransact and the erc and a contract instance an dthe private
  //   key and the contract instance and some test lunk
        const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/d1389089801b4e438f109936b38f311d")
     
  
        const acct2 = "0xda9e8e71bB750a996Af33ebB8aBb18cd9EB9DC75"
        const contractAddress = "0xb227f007804c16546Bd054dfED2E7A1fD5437678"
        const ERC20_ABI = [
          "function balanceOf(address) view returns(uint256)",
          "function transfer(address to, uint amount) returns (bool)"
        ]
        const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786";
        const wallet = new ethers.Wallet(privateKey,provider)
        const contract = new ethers.Contract(contractAddress,ERC20_ABI,wallet)
        console.log(ethers.formatEther(await contract.balanceOf(wallet.address)))
        console.log(contract)
        const balance = await contract.balanceOf(wallet.address);

            const waltract = contract.connect(wallet)
            console.log(waltract)
            const tx = await waltract.transfer(acct2,balance)
            await tx.wait()

            console.log(tx)


} // the main thing bout this one is to swap tokens not eth eth is not a smart contract its a platform used to make smart contracts 
          
const events = async()=>{
  const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/d1389089801b4e438f109936b38f311d");//this is the connection to the blockchain the reason it worked because we getting all the transactions
  const contractAddess= "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  const ERC20_ABI = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

  const block = await provider.getBlockNumber()
  const contract = new ethers.Contract(contractAddess,ERC20_ABI,provider);

  const transferevents = await contract.queryFilter("Transfer",block - 10, block)//capital T because 
  console.log(transferevents)
  console.log(block)
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
<button onClick={write}>write</button>
<button onClick={events}>event</button>


    </div>)

};

export default App;