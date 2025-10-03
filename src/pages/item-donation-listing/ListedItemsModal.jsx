import React, { useEffect, useState } from 'react';
import { donationService } from '../../services/donationService';
import { motion, AnimatePresence } from 'framer-motion';

const ListedItemsModal = ({ isOpen, onClose, userId, onStartListing }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId) {
      setLoading(true);
      donationService.getListedItems(userId).then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
    }
  }, [isOpen, userId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 40 }} 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        >
          <motion.div 
            initial={{ scale: 0.95 }} 
            animate={{ scale: 1 }} 
            exit={{ scale: 0.95 }} 
            className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
            <h2 className="text-2xl font-bold mb-6">Your Listed Items</h2>
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-500 mb-4">No items listed yet.</div>
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition"
                  onClick={onStartListing}
                >
                  Start Listing Item
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-lg shadow p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <div className="text-sm text-gray-500">Status: {item.status}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ListedItemsModal;
