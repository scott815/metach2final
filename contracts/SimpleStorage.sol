// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 storedData;
    uint256 counter;
    uint256 public randomGuess;

    event GuessedCorrect(address indexed sender, uint256 guessedNumber);
    event GuessedIncorrect(address indexed sender, uint256 guessedNumber);

    constructor(uint256 initialValue) {
        storedData = initialValue;
        counter = 0;
    }

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function checkAndSend(uint256 num) public payable {
        require(msg.value == 0.5 ether, "Incorrect value sent");
        if (num == storedData) {
            counter = 0;
            emit GuessedCorrect(msg.sender, num);
        } else {
            counter++;
            emit GuessedIncorrect(msg.sender, num);
        }
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function resetCounter() public {
        counter = 0;
    }
}
