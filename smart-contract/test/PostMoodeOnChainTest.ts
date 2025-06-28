import { ethers } from "hardhat";
import { expect } from "chai";

describe("MoodBoard", function () {
  let moodBoard;
  let mockWorldId;
  let user1, user2;

  beforeEach(async function () {
    [user1, user2] = await ethers.getSigners();

    const MockWorldId = await ethers.getContractFactory("MockWorldIdAddressBook");
    mockWorldId = await MockWorldId.deploy();
    await mockWorldId.deployed();

    const MoodBoard = await ethers.getContractFactory("MoodBoard");
    moodBoard = await MoodBoard.deploy(mockWorldId.address);
    await moodBoard.deployed();
  });

  it("should allow creating a post when verified", async function () {
    await mockWorldId.setVerified(user1.address, Math.floor(Date.now() / 1000) + 86400);

    const tx = await moodBoard.connect(user1).createPost("ipfs://someContent", "hello world");
    const receipt = await tx.wait();

    expect(receipt.events[0].event).to.equal("PostCreated");
    const post = await moodBoard.posts(1);
    expect(post.contentURI).to.equal("ipfs://someContent");
    expect(post.poster).to.equal(user1.address);
  });

  it("should allow tipping a post", async function () {
    await mockWorldId.setVerified(user1.address, Math.floor(Date.now() / 1000) + 86400);
    await moodBoard.connect(user1).createPost("ipfs://tipme", "pls tip");

    const balanceBefore = await ethers.provider.getBalance(user1.address);
    const tx = await moodBoard.connect(user2).tipPost(1, {
      value: ethers.utils.parseEther("0.01"),
    });
    await tx.wait();

    const post = await moodBoard.posts(1);
    expect(post.totalTips).to.equal(ethers.utils.parseEther("0.01"));
  });
});
