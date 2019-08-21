import web3 from "./web3";
import StoryFactory from "./build/StoryFactory.json";

const instance = new web3.Contract(
  StoryFactory.abi,
  "0x5bA1619Cd2f47BD0c7E0df9588bFf68fE23E0Ffd"
);

export default instance;
