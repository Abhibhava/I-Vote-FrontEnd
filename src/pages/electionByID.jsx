import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const ElectionDetailsPage = () => {
    const { id } = useParams(); // Get the election ID from the URL
    const [election, setElection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedParty, setSelectedParty] = useState('');
    const [voteError, setVoteError] = useState(null);
    const [voteSuccess, setVoteSuccess] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        const fetchElectionDetails = async () => {
            try {
                const response = await axios.get(`https://i-vote-backend.vercel.app/election/${id}`);
                const electionData = response.data;
                setElection(electionData);

                const endTime = new Date(electionData.votingEndTime);
                const now = new Date();
                setRemainingTime(Math.max(0, endTime - now));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchElectionDetails();

        const intervalId = setInterval(() => {
            setRemainingTime(prevTime => Math.max(0, prevTime - 1000));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [id]);

    const handleVote = async () => {
        try {
            const response = await axios.post(`https://i-vote-backend.vercel.app/cast/${id}`, 
                { 
                    party: selectedParty 
                }, 
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            setVoteSuccess(response.data.message);
            setVoteError(null);
            setElection((prevElection) => ({
                ...prevElection,
                parties: response.data.totalVotes
            }));
        } catch (error) {
            setVoteError(error.response.data.message);
            setVoteSuccess(null);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen">Error: {error}</div>;
    }

    const displayCountdown = () => {
        if (remainingTime === null) return null;

        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);

        return (
            <div className="text-center text-gray-700 mt-4">
                Voting ends in: {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </div>
        );
    };

    const chartData = {
        labels: election.parties.map(party => party.name),
        datasets: [{
            data: election.parties.map(party => party.votes),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
            <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center">{election.title}</h1>
                <p className="text-gray-700 mb-6 text-center">{election.description}</p>
                {election.status === 'Closed' ? (
                    <div className="w-full max-w-md mx-auto">
                        <Pie data={chartData} />
                    </div>
                ) : (
                    <>
                        {displayCountdown()}
                        <h2 className="text-2xl font-semibold mb-4 text-center">Parties</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {election.parties.map((party) => (
                                <div
                                    key={party.name}
                                    className={`p-4 border rounded-lg cursor-pointer ${
                                        selectedParty === party.name ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300'
                                    }`}
                                    onClick={() => setSelectedParty(party.name)}
                                >
                                    <h3 className="text-xl font-medium text-center">{party.name}</h3>
                                    <button
                                        onClick={() => setSelectedParty(party.name)}
                                        className="mt-2 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                                    >
                                        Vote for {party.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                        {selectedParty && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={handleVote}
                                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
                                >
                                    Submit Vote for {selectedParty}
                                </button>
                            </div>
                        )}
                        {voteError && <div className="mt-4 text-red-500 text-center">{voteError}</div>}
                        {voteSuccess && <div className="mt-4 text-green-500 text-center">{voteSuccess}</div>}
                    </>
                )}
            </div>
        </div>
    );
};

export default ElectionDetailsPage;
