import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy();

    return { lock, owner, otherAccount };
  }

  it("hoge", async function () {
    const { lock } = await loadFixture(deployFixture);

    await lock.set("key0", "value0")
    await lock.set("key1", "value1")

    expect(await lock.get("key0")).to.equal("value0");
    expect(await lock.get("key1")).to.equal("value1");

    expect(await lock.values()).to.deep.equal(["value0", "value1"]);
  });

  it("multicall", async function () {
    const { lock } = await loadFixture(deployFixture);

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(lock.interface.encodeFunctionData("set", [`key${i}`, `value${i}`]));
    }

    const results = await lock.multicall(data);

    // TODO: valuesでvalue0~value99が取得できることをテストする
  });
});
