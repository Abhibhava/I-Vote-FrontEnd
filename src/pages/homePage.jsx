import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="w-full py-4 px-8 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">I-Vote</h1>
        <div>
          <Link to="/login" className="mr-4 text-indigo-600 hover:text-indigo-800 transition duration-200 ease-in-out">
            Login
          </Link>
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 transition duration-200 ease-in-out">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Welcome to I-Vote</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          I-Vote is a secure, easy-to-use online voting platform designed to facilitate the democratic process. Whether you are voting for your local government, your organization's board, or a club's leadership, I-Vote ensures your vote is counted accurately and securely.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Secure Voting</h3>
            <p className="text-gray-600">
              Our platform uses state-of-the-art encryption and security measures to ensure that your vote remains confidential and tamper-proof.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              I-Vote is designed with simplicity in mind, allowing you to cast your vote quickly and easily from any device, anywhere.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Transparent Results</h3>
            <p className="text-gray-600">
              Get instant access to election results and ensure transparency throughout the voting process with our robust reporting tools.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-white text-center text-gray-600">
        <p>Created by <Link to={"https://github.com/Ritukar-Pandey"} className="text-indigo-600 hover:text-indigo-800 transition duration-200 ease-in-out">Ritukar Pandey</Link></p>
      </footer>
    </div>
  );
}

export default HomePage;
