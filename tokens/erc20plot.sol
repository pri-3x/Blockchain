// SPDX-License-Identifier: GPL-3.0

pragma solidity^0.8.5;

contract Rupee{
    string public name="RUPEE";
    string public symbol="INR";
    uint8 public decimal=18;
    uint public total_supply;
    mapping(address=>uint) public plot;
    
    address private owner;
    mapping(address=>uint256) public balance;

    constructor(){
    owner=msg.sender;
    balance[msg.sender]=total_supply;
}
function mint(address account,uint amount)public{
    require(msg.sender==owner,"only admin");
    balance[account]+=amount;
    total_supply+=amount;

}
function contractAmount() public view returns(uint)
       {
           return (balance[address(this)]);
       }

       function PlotBuy(uint no) public 
       {
             require(balance[msg.sender]>=(no*1000 * 10**18), "Not enough tokens");
             
             balance[msg.sender]-=(no*1000);
             balance[address(this)]+=(no*1000);
             plot[msg.sender]+=no;
       }

       function PlotSell(uint no) public 
       {
              require(plot[msg.sender]>=no, "not enough plots to sell"); 
              plot[msg.sender]-=no;
              balance[msg.sender]+=(no*1000);
             balance[address(this)]-=(no*1000);
             plot[msg.sender]-=no;
       }

}
