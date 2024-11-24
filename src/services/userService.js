import api from './api';

export const registerUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const getUserProfile = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserProfile(userId);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };
        fetchUser();
    }, [userId]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserProfile;
