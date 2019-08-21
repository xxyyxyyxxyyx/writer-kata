const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3-eth");
const compiledFactory = require("./build/StoryFactory.json");
const interface = compiledFactory.abi;
const bytecode = compiledFactory.evm.bytecode.object;

const provider = new HDWalletProvider(
  "popular lamp input length flight bring oblige print chicken mystery rich parent",
  "https://rinkeby.infura.io/v3/8c94f28e30d242eeb7de27cc4feb4c80"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.getAccounts();
  console.log("Attempting to deploy from account: ", accounts[0]);
  const result = await new web3.Contract(interface)
    .deploy({
      data: "0x" + bytecode
    })
    .send({
      from: accounts[0],
      gas: 3000000
    });

  console.log("Contract deployed to: ", result.options.address);
};

deploy();
