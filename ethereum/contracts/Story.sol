pragma solidity ^0.5.10;

contract StoryFactory{
    address[] public storiesAddresses;
    function createStory(string memory storyTitle, string memory storyDescription )public{
        address newStoryAddress = address(new Story(storyTitle,storyDescription,msg.sender));
        storiesAddresses.push(newStoryAddress);
    }
    function getAllStories() public view returns(address[] memory){
        return storiesAddresses;
    }
}


contract Story{
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

    function join() public {
        contributors[msg.sender] = true;
        contributorCount++;
    }
    
    function createParagraph(string memory content) public hasJoined {
        Paragraph memory newParagraph = Paragraph({
            index: paragraphIndex++,
            content: content,
            writerAddress: msg.sender
        });
        paragraphs.push(newParagraph);
        paragraphCount++;
    }

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