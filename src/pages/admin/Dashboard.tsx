import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import { removeFromLocalStorage } from '../../utils/localStorage';
import Text from '../../components/atoms/Text';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeFromLocalStorage('token');
    navigate('/login');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
         <Text variant="h3"className="text-gray-800">
            👋 Welcome to the Admin Dashboard
          </Text>
         <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition duration-200"
        >Logout</Button>
      </div>

      <Text variant="p"className="text-gray-600">
        Use the sidebar to manage products, categories, prices, and markets.
      </Text>


      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition">
          <Text variant="h6"className="text-gray-700">
            📦 Products
          </Text>
          <Text variant="p"className="text-gray-600">
            Manage product listings and details.
          </Text>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition">
           <Text variant="h6"className="text-gray-700">
            🛍️ Categories
          </Text>
          <Text variant="p"className="text-gray-600">
            Organize items into categories.
          </Text>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition">
           <Text variant="h6"className="text-gray-700">
            💰 Prices
          </Text>
          <Text variant="p"className="text-gray-600">
            Control pricing and discounts.
          </Text>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow hover:shadow-md transition">
           <Text variant="h6"className="text-gray-700">
            🗺️ Markets
          </Text>
          <Text variant="p"className="text-gray-600">
            View and manage market locations.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

