import api from './api';

export const getSchedule = async () => {
    const response = await api.get('/schedule');
    return response.data;
};

export const createTraining = async (trainingData) => {
    const response = await api.post('/schedule', trainingData);
    return response.data;
};

import React, { useState } from 'react';
import { createTraining } from '../services/scheduleService';

const AddTraining = () => {
    const [formData, setFormData] = useState({ name: '', time: '', slots: 0 });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTraining(formData);
            setMessage('Training added successfully!');
        } catch (error) {
            console.error('Error adding training', error);
            setMessage('Error adding training.');
        }
    };

    return (
        <div>
            <h2>Add Training</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Training Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="datetime-local"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="slots"
                    placeholder="Available Slots"
                    value={formData.slots}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Training</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddTraining;
