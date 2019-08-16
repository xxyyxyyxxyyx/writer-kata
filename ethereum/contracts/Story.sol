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
    }
    address public creator;
    mapping(address => bool) public contributors;
    string public title;
    string public description;
    Paragraph[] public paragraphs;
    uint public paragraphIndex;

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
    }
    
    function createParagraph(string memory content) public hasJoined {
        Paragraph memory newParagraph = Paragraph({
            index: paragraphIndex++,
            content: content
        });
        paragraphs.push(newParagraph);
    }
    
}