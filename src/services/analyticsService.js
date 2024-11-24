import React, { useState, useEffect } from 'react';
import { getPopularityAnalytics } from '../services/analyticsService';

const AnalyticsPopularity = () => {
    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getPopularityAnalytics();
                setAnalytics(data);
            } catch (error) {
                console.error('Error fetching popularity analytics', error);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div>
            <h2>Popularity Analytics</h2>
            <ul>
                {analytics.map((item) => (
                    <li key={item.sectionId}>
                        Section: {item.sectionName}, Bookings: {item.bookings}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnalyticsPopularity;
