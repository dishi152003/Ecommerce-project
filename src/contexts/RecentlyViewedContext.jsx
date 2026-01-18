import { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => {
    const context = useContext(RecentlyViewedContext);
    if (!context) {
        throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
    }
    return context;
};

export const RecentlyViewedProvider = ({ children }) => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('recentlyViewed');
        if (stored) {
            setRecentlyViewed(JSON.parse(stored));
        }
    }, []);

    // Save to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    const addToRecentlyViewed = (product) => {
        setRecentlyViewed((prev) => {
            // Remove if already exists
            const filtered = prev.filter((p) => p.id !== product.id);
            // Add to beginning, keep only last 10
            return [product, ...filtered].slice(0, 10);
        });
    };

    const clearRecentlyViewed = () => {
        setRecentlyViewed([]);
        localStorage.removeItem('recentlyViewed');
    };

    return (
        <RecentlyViewedContext.Provider
            value={{
                recentlyViewed,
                addToRecentlyViewed,
                clearRecentlyViewed
            }}
        >
            {children}
        </RecentlyViewedContext.Provider>
    );
};
