const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Our PR Token", function(){

    let demoToken;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function(){

        const PRtoken = await ethers.getContractFactory("PRtoken");
        demoToken = await PRtoken.deploy();
        [owner, addr1, addr2] = await ethers.getSigners();
        
    });

    describe("Deployment", function(){

        
    
        it("Assign the total supply of tokens to the owner", async function() {
           
            const ownerBalance= await demoToken.balanceOf(owner.address);
            expect(await demoToken.totalSupply()).to.equal(ownerBalance);
        });

        it("Name of the token must be equal to PR Token", async function(){

            expect(await demoToken.name()).to.equal("PR Token");
        });

        it("Name of the Token's symbol must be equal to PRT", async function(){

            expect(await demoToken.symbol()).to.equal("PRT");
        });

        it("Token's decimal value must be equal to 18", async function(){

            expect(await demoToken.decimals()).to.equal(18);
        });

        
        it("Overall TotalSupply must be equal to 100", async function(){

            expect(await demoToken.totalSupply()).to.equal(100);
        });
    
    });

    describe("Transfer", function(){


     it("Should transfer Tokens b/w the Accounts", async function(){

        
       //Transfer 50 Tokens from Owner to Address 1
       expect(await demoToken.transfer(addr1.address, 50));
       expect(await demoToken.balanceOf(addr1.address)).to.equal(50);
       expect(await demoToken.balanceOf(owner.address)).to.equal(50);
      
       
       //Transfer 5 Tokens from Address 1 to Address 2
       expect(await demoToken.connect(addr1).transfer(addr2.address, 5));
       expect(await demoToken.balanceOf(addr2.address)).to.equal(5);
       expect(await demoToken.balanceOf(addr1.address)).to.equal(45);
      
       
     });

    });

 describe("mint", function(){

    it("Amount to be minted on Owner's Account", async function(){
        
        let initialOwnerBalance=await demoToken.balanceOf(owner.address);
        console.log(initialOwnerBalance);
        await demoToken._mint(owner.address,100);
        expect(await demoToken.balanceOf(owner.address)).to.not.equal(initialOwnerBalance);
         
         await console.log(await demoToken.balanceOf(owner.address));
    })

    it("After Minting totalSupply will increase", async function(){
        
        let initialTotalSupply=await demoToken.totalSupply();
        console.log(initialTotalSupply);
        
        await demoToken._mint(owner.address,100);
         expect(await demoToken.totalSupply()).to.not.equal(initialTotalSupply);

         await console.log(await demoToken.totalSupply());
   

    })

    it("Only Owner can mint Tokens", async function(){
        
        await expect(demoToken.connect(addr1)._mint(owner.address,50)).to.be.revertedWith("only admin");
    
    })

 })

 describe("Burn", function(){

    it("After Burning Caller's Account Balance will change", async function(){
         
        await demoToken.transfer(addr1.address, 50);
        
        let initialCallerBalance=await demoToken.balanceOf(addr1.address);
        
        console.log(initialCallerBalance);
        
        await demoToken.connect(addr1)._burn(addr1.address, 25);
        
        expect(await demoToken.balanceOf(addr1.address)).to.not.equal(initialCallerBalance);
        
        await console.log(await demoToken.balanceOf(addr1.address));


    })
    
    it("After Burning Total Supply will change", async function(){

        let initialTotalSupply=await demoToken.totalSupply();
        console.log(initialTotalSupply);
        
        await demoToken.transfer(addr1.address, 50);
        
        let initialCallerBalance=await demoToken.balanceOf(addr1.address);
        
        console.log(initialCallerBalance);
        

        await demoToken._burn(addr1.address,25);
         expect(await demoToken.totalSupply()).to.not.equal(initialTotalSupply);

         

    })
   
 })


 describe("Transfer From", function(){

    it("Should let you give another address the approval to send on your behalf", async function() {
        await demoToken.connect(addr1).approve(owner.address, 50);
        await demoToken.transfer(addr1.address, 50);
        await demoToken.transferFrom(addr1.address, addr2.address, 5);
        expect(await demoToken.balanceOf(addr2.address)).to.equal(10);//5 tokens already present
      })
 })


 describe("Approve", function(){

  it("Spender assigned some amount to be spent on behalf of Caller", async function(){
    await demoToken.approve(addr1.address, 50);
    expect(await demoToken.allowance(owner.address, addr1.address)).to.equal(50);     
  })

 })

    });
