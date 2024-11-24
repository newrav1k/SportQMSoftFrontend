import React, { useEffect, useState } from 'react';
import { getSchedule } from '../services/scheduleService';

const Schedule = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const data = await getSchedule();
                setSchedule(data);
            } catch (error) {
                console.error('Error fetching schedule', error);
            }
        };
        fetchSchedule();
    }, []);

    return (
        <div>
            <h2>Training Schedule</h2>
            <ul>
                {schedule.map((session) => (
                    <li key={session.id}>
                        {session.name} - {session.time} ({session.availableSlots} slots available)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;
