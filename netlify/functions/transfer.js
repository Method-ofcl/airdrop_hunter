const { schedule } = require("@netlify/functions");
const { ethers } = require("ethers");
require("dotenv").config();

const IERC20 = require("@openzeppelin/contracts/build/contracts/ERC20.json");

const handler = async function (event, context) {
  console.log("Received event:", event);
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  const ACCOUNT_1 = new ethers.Wallet(process.env.PRIVATE_KEY_1, provider);
  const ACCOUNT_2 = new ethers.Wallet(process.env.PRIVATE_KEY_2, provider);
  const ACCOUNT_3 = new ethers.Wallet(process.env.PRIVATE_KEY_3, provider);
  const ACCOUNT_4 = new ethers.Wallet(process.env.PRIVATE_KEY_4, provider);
  const ACCOUNT_5 = new ethers.Wallet(process.env.PRIVATE_KEY_5, provider);
  const ACCOUNT_6 = new ethers.Wallet(process.env.PRIVATE_KEY_6, provider);

  const ERC20 = new ethers.Contract(process.env.TOKEN_ADDRESS, IERC20.abi);

  await ERC20.connect(ACCOUNT_1).transfer(
    ACCOUNT_2.address,
    process.env.TRANSFER_AMOUNT
  );
  await ERC20.connect(ACCOUNT_2).transfer(
    ACCOUNT_3.address,
    process.env.TRANSFER_AMOUNT
  );
  await ERC20.connect(ACCOUNT_3).transfer(
    ACCOUNT_4.address,
    process.env.TRANSFER_AMOUNT
  );
  await ERC20.connect(ACCOUNT_4).transfer(
    ACCOUNT_5.address,
    process.env.TRANSFER_AMOUNT
  );
  await ERC20.connect(ACCOUNT_5).transfer(
    ACCOUNT_6.address,
    process.env.TRANSFER_AMOUNT
  );
  await ERC20.connect(ACCOUNT_6).transfer(
    ACCOUNT_1.address,
    process.env.TRANSFER_AMOUNT
  );

  console.log(`Transfers Complete!`);
  console.log(
    `See transactions at: https://goerli.explorer.zksync.io/address/${ACCOUNT_1.address}`
  );

  return {
    statusCode: 200,
  };
};

exports.handler = schedule("@daily", handler);
