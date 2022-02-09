/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");

 const ALCHEMY_API_KEY = "DiljN7UwURXAn8nQyKkRSZ78jgZcc8u8";
 const ROPSTEN_PRIVATE_KEY =
   "3d6357576ecefb735aef1ddd9eadb73e8a938f8bf4c8f9ebfdaae96a0fa8ae73";
 module.exports = {
   solidity: "0.8.9",
 
   networks: {
     ropsten: {
       url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
       accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
     },
   },
 };
 // * @type import('hardhat/config').HardhatUserConfig
 //  */
