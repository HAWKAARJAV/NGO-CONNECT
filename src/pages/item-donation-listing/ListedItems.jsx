import React, { useEffect, useState } from 'react';
import { getListedItems } from '../../services/donationService';

const ListedItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch listed items from the backend/service
    getListedItems().then(setItems);
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Your Listed Items</h1>
      {items.length === 0 ? (
        <div className="text-gray-500">No items listed yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-2">{item.description}</p>
              <div className="text-sm text-gray-500">Status: {item.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListedItems;
