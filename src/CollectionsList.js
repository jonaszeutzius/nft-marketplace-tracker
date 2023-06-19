import React from 'react';

const CollectionsList = ({ collections }) => {
  if (!collections) {
    return <p>No collections to display.</p>;
  }

  return (
    <div>
      {collections.map((collection, index) => (
        <div key={index}>
          <h2>{collection.name}</h2>
          <p>Total tokens: {collection.totalTokens}</p>
        </div>
      ))}
    </div>
  );
};

export default CollectionsList;

