import { useState } from 'react';

function WalletInput({ onSearch }) {
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default WalletInput;