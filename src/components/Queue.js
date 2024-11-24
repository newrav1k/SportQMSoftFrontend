import React from 'react';
import { registerToQueue } from '../services/queueService';

const Queue = ({ trainingId }) => {
    const handleRegister = async () => {
        try {
            await registerToQueue({ trainingId });
            alert('Successfully registered!');
        } catch (error) {
            console.error('Error registering to queue', error);
        }
    };

    return (
        <button onClick={handleRegister}>Join Queue</button>
    );
};

export default Queue;
