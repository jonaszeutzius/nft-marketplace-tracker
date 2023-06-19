import React from 'react';
import axios from 'axios';
import WalletInput from './WalletInput';
import CollectionsList from './CollectionsList';

const App = () => {
    const [collections, setCollections] = React.useState([]);

    const fetchCollections = async (address) => {
      try {
          const options = {
              method: 'GET',
              url: `${process.env.REACT_APP_API_BASE_URL}/${address}`,
              headers: {
                  accept: 'application/json',
                  'X-API-KEY': process.env.REACT_APP_API_KEY
              }
          };
         
          const response = await axios.request(options);
          setCollections(response.data.collections);
      } catch (error) {
          console.error('Error fetching collections:', error);
      }
  };
 

    return (
        <div className="App">
            <WalletInput onSearch={fetchCollections} />
            <CollectionsList collections={collections} />
        </div>
    );
};

export default App;

