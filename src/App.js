import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import Schedule from './components/Schedule';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Schedule />} />
                    <Route path="/register" element={<UserRegistration />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
