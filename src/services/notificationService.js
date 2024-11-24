import React, { useState } from 'react';
import { sendNotification } from '../services/notificationService';

const SendNotification = () => {
    const [formData, setFormData] = useState({ userId: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendNotification(formData);
            setStatus('Notification sent successfully!');
        } catch (error) {
            console.error('Error sending notification', error);
            setStatus('Error sending notification.');
        }
    };

    return (
        <div>
            <h2>Send Notification</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userId"
                    placeholder="User ID"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit">Send</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default SendNotification;
