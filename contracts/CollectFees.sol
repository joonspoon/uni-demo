// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

/* This contract will only release funds to it's owner. */

contract CollectFees {

    address private owner = msg.sender;

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

    function withdrawEther() external onlyOwner {
        address payable ownerAddress = payable(msg.sender);
        ownerAddress.transfer(getBalance());
    }

    function getBalance() private onlyOwner view returns (uint) {
        return address(this).balance;
    }

     function getBalanceInEther() public view returns (uint) {
        return address(this).balance/1 ether;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    // temp for testing
    function receiveFee() public payable {}
}
