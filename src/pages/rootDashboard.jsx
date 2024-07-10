
// import React, { useState } from 'react';
// import CreateElectionForm from './electionForm'; // Ensure the path is correct

// const RootDashboard = () => {
//     const [isCreatingElection, setIsCreatingElection] = useState(false);

//     const handleCreateElection = () => {
//         setIsCreatingElection(true);
//     };

//     const handleCloseForm = () => {
//         setIsCreatingElection(false);
//     };

//     const handleElectionCreated = (newElection) => {
//         // Handle the newly created election, e.g., add it to the state or refresh the election list
//         console.log('New election created:', newElection);
//         setIsCreatingElection(false); // Close the form after successful creation
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
//             <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
//                 <h1 className="text-3xl font-bold mb-4 text-center">Root Dashboard</h1>
//                 <button
//                     onClick={handleCreateElection}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
//                 >
//                     Create New Election
//                 </button>
//                 {isCreatingElection && (
//                     <CreateElectionForm onClose={handleCloseForm} onSuccess={handleElectionCreated} />
//                 )}
//                 {/* Render existing elections here */}
//             </div>
//         </div>
//     );
// };

// export default RootDashboard;
import React, { useState } from 'react';
import CreateElectionForm from './electionForm';
import Navbar from './navBar';
const RootDashboard = () => {
    const [isCreatingElection, setIsCreatingElection] = useState(false);

    const handleCreateElection = () => {
        setIsCreatingElection(true);
    };

    const handleCloseForm = () => {
        setIsCreatingElection(false);
    };

    const handleElectionCreated = (newElection) => {
        // Handle the newly created election, e.g., add it to the state or refresh the election list
        console.log('New election created:', newElection);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
            <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center">Root Dashboard</h1>
                <div className="flex justify-center">
                    <button
                        onClick={handleCreateElection}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
                    >
                        Create New Election
                    </button>
                </div>
                {isCreatingElection && (
                    <CreateElectionForm onClose={handleCloseForm} onSuccess={handleElectionCreated} />
                )}
                {/* Render existing elections here */}
            </div>
        </div>
        </div>
        
    );
};

export default RootDashboard;
