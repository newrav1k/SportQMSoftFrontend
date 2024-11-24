import React from 'react';
import { registerToQueue } from '../services/queueService';

const QueueRegistration = ({ trainingId }) => {
    const handleRegister = async () => {
        try {
            await registerToQueue({ trainingId });
            alert('Successfully registered for the training!');
        } catch (error) {
            console.error('Error registering for the queue', error);
        }
    };

    return (
        <button onClick={handleRegister}>Join Queue</button>
    );
};

export default QueueRegistration;
