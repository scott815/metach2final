// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import contractAbi from "./contract";
import { getStoredValue } from './contract';

function App() {
  const [storedValue, setStoredValue] = ('');

  useEffect(() => {
    async function fetchData() {
      const value = await getStoredValue();
      setStoredValue(value);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Stored Value: {storedValue}</h1>
    </div>
  );
}

export default App;
