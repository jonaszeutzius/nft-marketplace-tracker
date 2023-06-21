import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
// import WalletInput from './WalletInput';
// import CollectionsList from './CollectionsList';

const App = () => {
    const [collections, setCollections] = useState(null)
    const [walletAddress, setWalletAddress] = useState('');
    const [blockchain, setBlockchain] = useState('eth-main');
    const [error, setError] = useState(null);

    const fetchCollections = async () => {
      try {
          const options = {
              method: 'GET',
              url: `http://localhost:8080/v1/collections/owner/${walletAddress}?chain=${blockchain}`,
              headers: {
                  accept: 'application/json',
                  'X-API-KEY': '2jhzbqIWanB8puiqySBIWJVf6Ovp7oPW'
              }
          };
          console.log('url', options.url)
          const response = await axios.request(options);
          console.log('response', response)
          setCollections(response.data.results);
          setError(null)
      } catch (error) {
          console.error('Error fetching collections:', error);
          setError('Error: Verify chain and wallet address are valid!');
      }
    };
    
    const handleBlockchainChange = (event) => {
        setBlockchain(event.target.value);
      };
    
    const checkData = (data) => (data ? data : 'N/A');

    return (
        <div className='App'>
          <h1 className='title'>NFT Marketplace Tracker</h1>
          <p>Select a chain and input wallet address below to see NFT assets.</p>
          <div className='inputContainer'>
            <select name="blockchain" value={blockchain} onChange={handleBlockchainChange}>
              <option value="eth-main">eth-main</option>
              <option value="arbitrum-main">arbitrum-main</option>
              <option value="optimism-main">optimism-main</option>
              <option value="poly-main">poly-main</option>
              <option value="bsc-main">bsc-main</option>
              <option value="eth-goerli">eth-goerli</option>
            </select>
            <input
                type="text"
                placeholder="Wallet Address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            <button onClick={fetchCollections}>View NFTs</button>
            {console.log('chain:', blockchain)}
          </div>
          {error ? (
            <p className="errorMessage">{error}</p>
          ) : collections && (
            <table>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>NFT Number</th>
                  <th>Contract Address</th>
                  <th>Token Type</th>
                  <th>Total Quantity</th>
                  <th>Total Tokens</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(collections).map((index) => (
                  <tr style={{ backgroundColor: '#f2f2f2' }} key={index}>
                    <td>{parseInt(index) + 1}</td>
                    <td>{checkData(collections[index].contract_address)}</td>
                    <td>{checkData(collections[index].token_type)}</td>
                    <td>{checkData(collections[index].total_quantity)}</td>
                    <td>{checkData(collections[index].total_tokens)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
          
    );
};

export default App;

