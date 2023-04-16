const { ethers } = require("hardhat");

async function main() {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy(42);

  await simpleStorage.deployed();

  console.log("SimpleStorage deployed to:", simpleStorage.address);
  console.log("Stored value:", (await simpleStorage.get()).toString());

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
