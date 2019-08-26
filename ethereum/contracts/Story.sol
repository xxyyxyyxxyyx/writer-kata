pragma solidity ^0.5.10;
/*
    A factory for creating Story contracts
*/
contract StoryFactory{
    address[] public storiesAddresses;
    // Creates a Story contract
    function createStory(string memory storyTitle, string memory storyDescription )public{
        address newStoryAddress = address(new Story(storyTitle,storyDescription,msg.sender));
        storiesAddresses.push(newStoryAddress);
    }
    // Returns the addresses of all story contracts
    function getAllStories() public view returns(address[] memory){
        return storiesAddresses;
    }
}


contract Story{
    // A struct which represnts a paragraph in a story
    struct Paragraph{
        uint index;
        string content;
        address writerAddress;
    }
    address public creator;
    mapping(address => bool) public contributors;
    uint public contributorCount;
    string public title;
    string public description;
    Paragraph[] public paragraphs;
    uint public paragraphIndex;
    uint public paragraphCount;

    // Boolean flag which returns true if the sender is a contributor to the story
    modifier hasJoined(){
        require(contributors[msg.sender] == true,"The user is not a contributor");
        _;
    }
    constructor(string memory storyTitle, string memory storyDescription, address storyCreator) public{
        title = storyTitle;
        description = storyDescription;
        creator = storyCreator;
        paragraphIndex = 1;
    }

    // Join the story as contributor
    function join() public {
        contributors[msg.sender] = true;
        contributorCount++;
    }
    // Creates a paragraph
    function createParagraph(string memory content) public hasJoined {
        Paragraph memory newParagraph = Paragraph({
            index: paragraphIndex++,
            content: content,
            writerAddress: msg.sender
        });
        paragraphs.push(newParagraph);
        paragraphCount++;
    }
    // Returns the details of the story
    function getSummary() public view returns(string memory, string memory, uint,uint,address){
        return(
            title,
            description,
            contributorCount,
            paragraphCount,
            creator
        );
    }
    
}