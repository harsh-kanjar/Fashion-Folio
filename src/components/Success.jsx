import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase! Your order has been successfully completed.
        </p>
        <p className="text-gray-600 mb-4">
          You will receive an email confirmation shortly.
        </p>
        <Link to="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
