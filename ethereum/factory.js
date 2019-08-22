import web3 from "./web3";
import StoryFactory from "./build/StoryFactory.json";

const instance = new web3.Contract(
  StoryFactory.abi,
  "0x07FC5fa706AB209E8A0D33F5d0b4155b26597559"
);

export default instance;
