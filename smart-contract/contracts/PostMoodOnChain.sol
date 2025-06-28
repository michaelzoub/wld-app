// SPDX-License-Identifier: MIT
//https://thegraph.com/docs/en/subgraphs/quick-start/
pragma solidity ^0.8.19;

interface IWorldIdAddressBook {
    function addressVerifiedUntil(address user) external view returns (uint256);
}

contract MoodBoard {
    IWorldIdAddressBook public immutable worldAddressBook;

    uint256 public postCount;
    uint256 public constant POST_COOLDOWN = 1 days;

    struct Post {
        uint256 id;
        address poster;
        string contentURI;
        uint256 totalTips;
    }

    mapping(uint256 => Post) public posts;
    //TODO: use TheGraph instead
    Post[] public postList;

    mapping(address => uint256) public lastPostAt;

    event PostCreated(uint256 id, address indexed poster, string contentURI, string message);
    event Tipped(uint256 indexed postId, address indexed from, uint256 amount);

    constructor(address _worldAddressBook) {
        worldAddressBook = IWorldIdAddressBook(_worldAddressBook);
    }

    function createPost(string memory contentURI, string memory message) external {
        require(bytes(contentURI).length > 0, "Content required");

        // Make sure the sender is verified with World ID
        require(
            worldAddressBook.addressVerifiedUntil(msg.sender) > block.timestamp,
            "User not verified with World ID"
        );

        // Enforce 1 post per day
        require(
            block.timestamp >= lastPostAt[msg.sender] + POST_COOLDOWN,
            "Wait before posting again"
        );

        postCount++;
        Post memory newPost = Post(postCount, msg.sender, contentURI, 0);
        posts[postCount] = newPost;
        lastPostAt[msg.sender] = block.timestamp;
        postList.push(newPost);

        emit PostCreated(postCount, msg.sender, contentURI, message);
    }

    function tipPost(uint256 postId, address targetAddress) external payable {
        require(postId > 0 && postId <= postCount, "Invalid post");
        require(msg.value > 0, "Send ETH to tip");

        Post storage post = posts[postId];
        post.totalTips += msg.value;

        (bool sent, ) = post.poster.call{value: msg.value}("");
        require(sent, "Transfer failed");

        emit Tipped(postId, msg.sender, msg.value);
    }

}
