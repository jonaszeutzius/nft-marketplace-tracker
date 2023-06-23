import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
// import WalletInput from './WalletInput';
// import CollectionsList from './CollectionsList';

const App = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    let [NFTs, setNFTs] = useState([])
    let [chainArray, setChainArray] = useState([])
    const [showNoNFTsMessage, setShowNoNFTsMessage] = useState(false);
    
    const blockchains = ['eth-main','arbitrum-main','optimism-main','poly-main','bsc-main','eth-goerli']
    const [ethNFTs, setEthNFTs] = useState(null)
    const [arbitrumNFTs, setArbitrumNFTs] = useState(null)
    const [optimismNFTs, setOptimismNFTs] = useState(null)
    const [polyNFTs, setPolyNFTs] = useState(null)
    const [bscNFTs, setBscNFTs] = useState(null)
    const [goerliNFTs, setGoerliNFTs] = useState(null)
    const [numberOfChains, setNumberOfChains] = useState(0)


    const fetchNFTs = async () => {
      
      setEthNFTs(null)
      setArbitrumNFTs(null)
      setOptimismNFTs(null)
      setPolyNFTs(null)
      setBscNFTs(null)
      setGoerliNFTs(null)
      setNumberOfChains(0)

      for (const index in blockchains) {

        const blockchain = blockchains[index]
        try {
          const options = {
              method: 'GET',
              url: `http://localhost:8080/v1/nfts/owner/${walletAddress}?chain=${blockchain}&include_nft_details=true&page_size=25`,
              headers: {
                  accept: 'application/json',
                  'X-API-KEY': '2jhzbqIWanB8puiqySBIWJVf6Ovp7oPW'
              }
          }
          const response = await axios.request(options);
          setNumberOfChains(prevNumberOfChains => prevNumberOfChains + 1)
          switch (blockchain) {
            case 'eth-main':
              setEthNFTs(response.data.results)
              break;
            case 'arbitrum-main':
              setArbitrumNFTs(response.data.results)
              break;
            case 'optimism-main':
              setOptimismNFTs(response.data.results)
              break;
            case 'poly-main':
              setPolyNFTs(response.data.results)
              break;
            case 'bsc-main':
              setBscNFTs(response.data.results)
              break;
            case 'eth-goerli':
              setGoerliNFTs(response.data.results)
              break;
          }
        } catch (error) {
            // console.error('Error fetching collections:', error);
        }
      }
      if (numberOfChains === 0) {
        setShowNoNFTsMessage(true);
      } else {
        setShowNoNFTsMessage(false);
      }
    }

    // Initialize the NFTs array and the chainsArray so that both are the same length, and
    // The nft at each index corresponds to the chain at the same index
    for (let i = 0; i < 6; i++) {
      const blockchain = blockchains[i]
      switch (blockchain) {
        case 'eth-main':
          if (ethNFTs === null) {
            continue
          } else {
            NFTs = NFTs.concat(ethNFTs)
            chainArray = chainArray.concat(Array(ethNFTs.length).fill('eth-main'))
          }
          break;
        case 'arbitrum-main':
          if (arbitrumNFTs === null) {
            continue
          } else {
            NFTs = NFTs.concat(arbitrumNFTs)
            chainArray = chainArray.concat(Array(arbitrumNFTs.length).fill('arbitrum-main'))
          }
          break;
        case 'optimism-main':
          if (optimismNFTs === null) {
            continue
          } else {
            NFTs = NFTs.concat(optimismNFTs)
            chainArray = chainArray.concat(Array(optimismNFTs.length).fill('optimism-main'))
          }
          break;
        case 'poly-main':
          if (polyNFTs === null) {
            continue
          } else {
            NFTs = NFTs.concat(polyNFTs)
            chainArray = chainArray.concat(Array(polyNFTs.length).fill('poly-main'))
          }
          break;
        case 'bsc-main':
          if (bscNFTs === null) {
            continue
          } else {
            NFTs = NFTs.concat(bscNFTs)
            chainArray = chainArray.concat(Array(bscNFTs.length).fill('bsc-main'))
          }
          break;
        case 'eth-goerli':
          if (goerliNFTs === null) {
            continue
          } else {
            NFTs = NFTs.concat(goerliNFTs)
            chainArray = chainArray.concat(Array(goerliNFTs.length).fill('goerli-main'))
          }
          break;
      }
    }



    const checkData = (data) => (data ? data : 'N/A');

    return (
        <div className='App'>
          <h1 className='title'>NFT Marketplace Tracker</h1>
          <p>Input wallet address below to see NFT assets.</p>
          <div className='inputContainer'>
            <input
                type='text'
                placeholder='Wallet Address'
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            <button onClick={fetchNFTs}>View NFTs</button>
          </div>
          {showNoNFTsMessage && walletAddress !== null? (
            <p className='errorMessage'>No NFTs owned by this wallet!</p>
          ) : NFTs.length !== 0 && (
            <table>
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
                  <td>{chainArray[index]}</td>
                  <td>
                    <div className='imageContainer'>
                      {nft.nft_details.cached_images && nft.nft_details.cached_images.medium_500_500 ? (
                        <img 
                          className='image' 
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

