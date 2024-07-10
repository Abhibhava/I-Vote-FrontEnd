import Login from './pages/login';
import Signup from './pages/signup';
import HomePage from './pages/homePage';
import { Route, Routes } from 'react-router-dom';
import UserDashboard from './pages/userDashboard';
import ProtectedRoute from './pages/protectedroute';
import ElectionVotingPage from './pages/electionByID';
import RootDashboard from './pages/rootDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<ProtectedRoute element={UserDashboard} />} />
        <Route path="/elections/:id" element={<ProtectedRoute element={ElectionVotingPage} />} />
        <Route path="/root-dashboard" element={<ProtectedRoute element={RootDashboard} />} />
      </Routes>
    </div>
  );
}

export default App;
