const { expect } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorage;

  beforeEach(async () => {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy(42);
    await simpleStorage.deployed();
  });

  it("should return the initial stored value", async function () {
    expect(await simpleStorage.get()).to.equal(42);
  });

  it("should set the stored value", async function () {
    await simpleStorage.set(99);
    expect(await simpleStorage.get()).to.equal(99);
  });

  it("should increment the counter for incorrect guess", async function () {
    let guess = 10;
    await simpleStorage.checkAndSend(guess, { value: ethers.utils.parseEther("0.5") });
    expect(await simpleStorage.getCounter()).to.equal(1);
  });

  it("should reset the counter for correct guess", async function () {
    let guess = await simpleStorage.get();
    await simpleStorage.checkAndSend(guess, { value: ethers.utils.parseEther("0.5") });
    expect(await simpleStorage.getCounter()).to.equal(0);
  });

  it("should emit an event for incorrect guess", async function () {
    let guess = 10;
    await expect(simpleStorage.checkAndSend(guess, { value: ethers.utils.parseEther("0.5") }))
      .to.emit(simpleStorage, "GuessedIncorrect")
      .withArgs(await ethers.provider.getSigner(0).getAddress(), guess);
  });

  it("should emit an event for correct guess", async function () {
    let guess = await simpleStorage.get();
    await expect(simpleStorage.checkAndSend(guess, { value: ethers.utils.parseEther("0.5") }))
      .to.emit(simpleStorage, "GuessedCorrect")
      .withArgs(await ethers.provider.getSigner(0).getAddress(), guess);
  });

  it("should require correct value to be sent", async function () {
    let guess = 10;
    await expect(simpleStorage.checkAndSend(guess, { value: ethers.utils.parseEther("0.1") }))
      .to.be.revertedWith("Incorrect value sent");
  });

  it("should reset the counter", async function () {
    await simpleStorage.resetCounter();
    expect(await simpleStorage.getCounter()).to.equal(0);
  });
});
