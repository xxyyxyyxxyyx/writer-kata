import Web3 from "web3-eth";
let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/8c94f28e30d242eeb7de27cc4feb4c80"
  );
  web3 = new Web3(provider);
}

export default web3;
