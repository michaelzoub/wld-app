import { expect } from "chai";
import hre from "hardhat";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

//edit to match contract

describe("PostMoodOnChain", function () {
  it("Should pay the user", async function () {
    

    // deploy a lock contract where funds can be withdrawn
    // one year in the future
    const lock = await hre.ethers.deployContract("PostMoodOnChain", [unlockTime], {
      value: lockedAmount,
    });

    // assert that the value is correct
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });
});