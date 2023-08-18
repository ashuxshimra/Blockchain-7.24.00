const ethers=require("ethers"); //require is a function to get ethers from p.json
const fs=require("fs");
require("dotenv").config();//importimg .env to use here
async function main() {
//now for deployment , lets get the wallet which will fund the deploymengt here- ganache acc private key and provider willbe ganache http
const provider=new ethers.providers.JsonRpcProvider(process.env.RPC_URL); //netweork where contract to be deployed
const wallet= new ethers.Wallet(
  process.env.PRIVATE_KEY, provider
); //the wallet you will use to fund the depoymentt , here using oroivate key of ghanache fake account and will be deployed in provider n.w
// when a contract is deployed to a bc n.w , we need its abi so that we know its functiionalities and binary code which is sc low level code deployed
const abi=fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8");//getting abi and bin using fs which was obtained after compilation of contract using solc
const binary=fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8");//here utf is bascially encoding
const contractFactory=new ethers.ContractFactory(abi, binary, wallet); //creating a object which will be used for deployment , and has abi , binary, and from which wallet that is which contract to be deployed using whuchg acc on which network
console.log("Deploying, please wait...");
const contract=await contractFactory.deploy(); //deploying the contract and stop , await let tehg contract deploy first
await contract.deployTransaction.wait(1); 
console.log(`contract address is ${contract.address}`) //once run node deploy.js , this will give the address and using this address on sepolia real testnet you can track

// const transactionReceipt=await contract.deployTransaction.wait(1); //now that contract is deployed , we are making one block confirmation
// transactionreceipt is what u get when you have block confirmation , contract is deployed and making sure that we are waiting for oine block confiormation , then this receipt is basically contract was deployed and confirmed adn transaction acc to that 
console.log(contract); //getting the deployed contract , and yes etherjs librabry has multiple more tools
// we can interact with sc which is deployed in fake ganacge bc bn.w as of now using ether.js , interacting=>just as we had function buttons under deployed contracts in remix , that is interafcting hence thats why we had abi mentioned for contractfactory object
const currentFavoriteNumber=await contract.retrieve(); //using contract which is deployed we want to access retrieve function
console.log(currentFavoriteNumber.toString());
const transactionResponse=await contract.store("7");
const transactionReceipt=await transactionResponse.wait(1); //giving a block confirmation for store
const updatedFavoriteNumber=await contract.retrieve();
console.log(`updated favorite number is: ${updatedFavoriteNumber}`);

// deploy transaction is different and when no wait then you get this deployment transaction 
// console.log("here is the deployment transaction ()transaction response");
// console.log(contract.deployTransaction);//the trabsaction receipt you get aftyer simply deploying and not waiting
// console.log("here is the transacxtion receipt by havibg block confirmation");
// console.log(transactionReceipt); 
// creating and deploying a contract on bc n.w is like sending a tx too
// above u have deployed contract using etherjs but below u can also deploy by using tx data itself
// const nonce = await wallet.getTransactionCount() //this will give blockno
    // tx = {
    //   nonce: nonce, 
    //   gasPrice: 100000000000,
    //   gasLimit: 1000000,
    //   to: null,
    //   value: 0, //not sending any amount we are only , creating contract
    //   data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061035c565b60405180910390f35b610094600480360381019061008f91906103b7565b61011c565b005b6100b060048036038101906100ab919061052a565b610126565b005b6100cc60048036038101906100c79190610586565b6101b6565b6040516100d9919061035c565b60405180910390f35b6100fc60048036038101906100f791906103b7565b6101e4565b60405161010a929190610657565b60405180910390f35b60008054905090565b8060008190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018c9291906102a0565b505050806002836040516101a091906106c3565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d90610709565b80601f016020809104026020016040519081016040528092919081815260200182805461024990610709565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac90610709565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b6000819050919050565b61035681610343565b82525050565b6000602082019050610371600083018461034d565b92915050565b6000604051905090565b600080fd5b600080fd5b61039481610343565b811461039f57600080fd5b50565b6000813590506103b18161038b565b92915050565b6000602082840312156103cd576103cc610381565b5b60006103db848285016103a2565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610437826103ee565b810181811067ffffffffffffffff82111715610456576104556103ff565b5b80604052505050565b6000610469610377565b9050610475828261042e565b919050565b600067ffffffffffffffff821115610495576104946103ff565b5b61049e826103ee565b9050602081019050919050565b82818337600083830152505050565b60006104cd6104c88461047a565b61045f565b9050828152602081018484840111156104e9576104e86103e9565b5b6104f48482856104ab565b509392505050565b600082601f830112610511576105106103e4565b5b81356105218482602086016104ba565b91505092915050565b6000806040838503121561054157610540610381565b5b600083013567ffffffffffffffff81111561055f5761055e610386565b5b61056b858286016104fc565b925050602061057c858286016103a2565b9150509250929050565b60006020828403121561059c5761059b610381565b5b600082013567ffffffffffffffff8111156105ba576105b9610386565b5b6105c6848285016104fc565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156106095780820151818401526020810190506105ee565b83811115610618576000848401525b50505050565b6000610629826105cf565b61063381856105da565b93506106438185602086016105eb565b61064c816103ee565b840191505092915050565b600060408201905061066c600083018561034d565b818103602083015261067e818461061e565b90509392505050565b600081905092915050565b600061069d826105cf565b6106a78185610687565b93506106b78185602086016105eb565b80840191505092915050565b60006106cf8284610692565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061072157607f821691505b60208210811415610735576107346106da565b5b5091905056fea2646970667358221220ca0819476698c2f9c7ae9470d72ad13a8d1a180e4b7dbfa054fe8518cec716f964736f6c63430008080033",
    //   chainId: 1337, 0xbinarycontractcode , this is chainid for ganache
    // const sentTxResponse = await wallet.sendTransaction(tx); //signing and sending this tx
// however we dont use this method just
}



// main(); //node deploy.js in terminal and it will run line by line
// in remix we can simply compile our contract but locally in order to compile our contract we use solc package
// node module has all the code for whichever package u install
// for compile check the packlage.json scripts section defined the command for compile usinh solc
// now locally just as we had jsvm fake bc in remix adn fake accounts we can use ganache alternatively , it is like a fake bc that you can use for contract deployment and it also provides fake accounts which will fund our deployment
// now since the contracyt is compiled using solc now in order to interact with any bc n.w be it fake or real or to deploy the conttract on bc n.w , we will use a poprilar js libarby ether.js , so install ether.js
main()
  .then(() => ProcessingInstruction.exit(0))
  .catch((error) => {
    //this function is basiucally writtted catch the error in async functions , here main() if async function main()
    console.error(error);
    process.exit(1);
  });
