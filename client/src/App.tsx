import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Announcement from './pages/Announcement';
import Schedule from './pages/Schedule';
import Courses from './pages/Courses';
import Gradebook from './pages/Gradebook';
import Performance from './pages/Performance';
import MainDashboard from './pages/MainDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard />
                    }
                >
                    <Route index element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
                    <Route path="schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
                    <Route path="courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
                    <Route path="gradebook" element={<ProtectedRoute><Gradebook /></ProtectedRoute>} />
                    <Route path="performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
                    <Route path="announcement" element={<ProtectedRoute><Announcement /></ProtectedRoute>} />

                </Route>

            </Routes>
        </Router>
    );
};

export default App;