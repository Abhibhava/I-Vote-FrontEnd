
// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateElectionForm = ({ onClose, onSuccess }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [parties, setParties] = useState([{ name: '' }]);
//     const [votingEndTime, setVotingEndTime] = useState('');
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     const handlePartyChange = (index, event) => {
//         const newParties = [...parties];
//         newParties[index].name = event.target.value;
//         setParties(newParties);
//     };

//     const addPartyField = () => {
//         setParties([...parties, { name: '' }]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/root/elections', {
//                 title,
//                 description,
//                 parties,
//                 status: 'Live',
//                 votingEndTime: new Date(new Date().getTime() + 10 * 60 * 1000).toISOString(), // Set to 10 minutes from now
//             });
//             setSuccess('Election created successfully!');
//             setError(null);
//             if (onSuccess) {
//                 onSuccess(response.data); // Call the onSuccess prop with the response data
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'An error occurred');
//             setSuccess(null);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//                 <h2 className="text-2xl font-bold mb-4">Create New Election</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Title</label>
//                         <input
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Description</label>
//                         <textarea
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Parties</label>
//                         {parties.map((party, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 value={party.name}
//                                 onChange={(e) => handlePartyChange(index, e)}
//                                 className="w-full p-2 mb-2 border border-gray-300 rounded"
//                                 required
//                             />
//                         ))}
//                         <button
//                             type="button"
//                             onClick={addPartyField}
//                             className="bg-blue-500 text-white py-2 px-4 rounded"
//                         >
//                             Add Party
//                         </button>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Voting End Time (minutes from now)</label>
//                         <input
//                             type="number"
//                             value={votingEndTime}
//                             onChange={(e) => setVotingEndTime(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded"
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-green-500 text-white py-2 px-4 rounded"
//                     >
//                         Create Election
//                     </button>
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         className="w-full bg-red-500 text-white py-2 px-4 rounded mt-2"
//                     >
//                         Cancel
//                     </button>
//                     {error && <div className="text-red-500 mt-2">{error}</div>}
//                     {success && <div className="text-green-500 mt-2">{success}</div>}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateElectionForm;
import React, { useState } from 'react';
import axios from 'axios';

const CreateElectionForm = ({ onClose, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [parties, setParties] = useState([{ name: '' }]);
    const [status, setStatus] = useState('Live'); // New state for status
    const [votingEndTime, setVotingEndTime] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handlePartyChange = (index, event) => {
        const newParties = [...parties];
        newParties[index].name = event.target.value;
        setParties(newParties);
    };

    const addPartyField = () => {
        setParties([...parties, { name: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/root/elections', {
                title,
                description,
                parties,
                status,
                votingEndTime: new Date(new Date().getTime() + 10 * 60 * 1000).toISOString(), // Set to 10 minutes from now
            });
            setSuccess('Election created successfully!');
            setError(null);
            if (onSuccess) {
                onSuccess(response.data); // Call the onSuccess prop with the response data
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setSuccess(null);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Create New Election</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="Live">Live</option>
                            <option value="Upcoming">Upcoming</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Parties</label>
                        {parties.map((party, index) => (
                            <input
                                key={index}
                                type="text"
                                value={party.name}
                                onChange={(e) => handlePartyChange(index, e)}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                required
                            />
                        ))}
                        <button
                            type="button"
                            onClick={addPartyField}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add Party
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Voting End Time (minutes from now)</label>
                        <input
                            type="number"
                            value={votingEndTime}
                            onChange={(e) => setVotingEndTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded"
                    >
                        Create Election
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded mt-2"
                    >
                        Cancel
                    </button>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                    {success && <div className="text-green-500 mt-2">{success}</div>}
                </form>
            </div>
        </div>
    );
};

export default CreateElectionForm;
