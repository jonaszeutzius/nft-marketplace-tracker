import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
// import WalletInput from './WalletInput';
// import CollectionsList from './CollectionsList';

const App = () => {
    const [NFTs, setNFTs] = useState(null)
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState(null);
    const [blockchain, setBlockchain] = useState('eth-main')

    const fetchNFTs = async () => {
      // const nfts = []
      // const blockchains = ["eth-main","arbitrum-main","optimism-main" ,"poly-main" ,"bsc-main","eth-goerli"]
      // for (const index in blockchains) {
        try {
          const options = {
              method: 'GET',
              url: `http://localhost:8080/v1/nfts/owner/${walletAddress}?chain=${blockchain}&include_nft_details=true`,
              headers: {
                  accept: 'application/json',
                  'X-API-KEY': '2jhzbqIWanB8puiqySBIWJVf6Ovp7oPW'
              }
          }
          const response = await axios.request(options);
          console.log(response)
          setNFTs(response.data.results);
          setError(null)
        } catch (error) {
            console.error('Error fetching collections:', error);
            setError('Error: Verify chain and wallet address are valid!');
        }
    }

    const checkData = (data) => (data ? data : 'N/A');

    const handleBlockchainChange = event => {
      setBlockchain(event.target.value);
    };  

    return (
        <div className='App'>
          <h1 className='title'>NFT Marketplace Tracker</h1>
          <p>Input wallet address below to see NFT assets.</p>
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
            <button onClick={fetchNFTs}>View NFTs</button>
          </div>
          {error ? (
            <p className="errorMessage">{error}</p>
          ) : NFTs && (
            <table>
              {console.log(NFTs)}
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th>NFT Number</th>
                  <th>Chain</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
              {NFTs.map((nft, index) => (
                <tr style={{ backgroundColor: '#f2f2f2' }} key={index}>
                  <td>{index + 1}</td>
                  <td>{blockchain}</td>
                  <td>
                    <div className="imageContainer">
                      {nft.nft_details.cached_images && nft.nft_details.cached_images.medium_500_500 ? (
                        <img 
                          className="image" 
                          src={nft.nft_details.cached_images.medium_500_500} 
                          alt={nft.nft_details.name}/>
                      ) : (
                        <div className='message'>
                          Image not available.
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
        </div>
          
    );
};

export default App;

