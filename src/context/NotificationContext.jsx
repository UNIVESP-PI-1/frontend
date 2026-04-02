import { createContext, useContext, useState } from 'react';
import Toast from '../components/ui/Toast';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const notify = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            {notification && (
                <Toast 
                    {...notification} 
                    onClose={() => setNotification(null)} 
                />
            )}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => useContext(NotificationContext);
