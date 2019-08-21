import web3 from "./web3";
import Story from "./build/Story.json";

export default address => {
  return new web3.Contract(Story.abi, address);
};
