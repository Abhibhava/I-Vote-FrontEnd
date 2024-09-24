import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/navBar'; // Make sure the path is correct

function UserDashboard() {
  const [liveElections, setLiveElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [completedElections, setCompletedElections] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get('https://i-vote-backend.vercel.app/all/info');
        const elections = response.data;

        setLiveElections(elections.filter(election => election.status === 'Live'));
        setUpcomingElections(elections.filter(election => election.status === 'Upcoming'));
        setCompletedElections(elections.filter(election => election.status === 'Closed'));
      } catch (error) {
        console.error('Error fetching elections:', error);
      }
    };

    fetchElections();
  }, []);

  const handleElectionClick = (election) => {
    if (election.status === 'Upcoming') {
      setShowMessage(true);
    } else {
      navigate(`/elections/${election._id}`);
    }
  };

  const ElectionList = ({ title, elections }) => (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {elections.map((election) => (
          <div
            key={election._id}
            onClick={() => handleElectionClick(election)}
            className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">{election.title}</h3>
            <p className="text-gray-700">{election.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 uppercase text-xs font-semibold tracking-wide ${getStatusColor(election.status)} rounded-md`}>
                {election.status}
              </span>
              {/* <span className="text-sm text-gray-600">Votes: {election.parties.reduce((acc, curr) => acc + curr.votes, 0)}</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500 text-white';
      case 'Upcoming':
        return 'bg-yellow-500 text-gray-900';
      case 'Closed':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Elections Dashboard</h1>
        <ElectionList title="Live Elections" elections={liveElections} />
        <ElectionList title="Upcoming Elections" elections={upcomingElections} />
        <ElectionList title="Completed Elections" elections={completedElections} />
        {showMessage && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-100 p-4 text-red-700 rounded-lg shadow-lg text-center">
            These elections are not available right now.
            <button
              onClick={() => setShowMessage(false)}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;


