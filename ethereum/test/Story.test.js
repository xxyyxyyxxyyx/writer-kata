const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3-eth");
const web3 = new Web3(ganache.provider());
const utils = require("web3-utils");
const compiledStoryFactory = require("../build/StoryFactory.json");
const compiledStory = require("../build/Story.json");

let accounts;
let storyFactory;
let story;
let storyAddress;

beforeEach(async () => {
  accounts = await web3.getAccounts();
  storyFactory = await new web3.Contract(compiledStoryFactory.abi)
    .deploy({
      data: compiledStoryFactory.evm.bytecode.object
    })
    .send({
      from: accounts[0],
      gas: 2000000
    });

  await storyFactory.methods
    .createStory("Test Title", "Test Description")
    .send({ from: accounts[0], gas: 2000000 });
  const storyAddresses = await storyFactory.methods.getAllStories().call();
  storyAddress = storyAddresses[0];
  story = await new web3.Contract(compiledStory.abi, storyAddress);
});

describe("Writing Katas", () => {
  it("deploys Story Factory and Story contracts", () => {
    assert.ok(storyFactory.options.address);
    assert.ok(story.options.address);
  });

  it("allows users to join as contributors", async () => {
    const user = accounts[1];
    await story.methods.join().send({
      from: user,
      gas: 1000000
    });
    const isContributor = await story.methods.contributors(user).call();
    assert(isContributor);
  });

  it("allows users to create paragraphs", async () => {
    const newParagraph = "This is a test paragraph";
    const user = accounts[1];
    // Join as contributor
    await story.methods.join().send({
      from: user,
      gas: 1000000
    });
    // Create a new paragraph
    await story.methods.createParagraph(newParagraph).send({
      from: user,
      gas: 2000000
    });

    const paragraph = await story.methods.paragraphs(0).call();
    console.log(paragraph);
    assert.equal(paragraph.content, newParagraph);
  });
});
