///@ts-nocheck

import { useEffect } from 'react';

function useNotification() {
  useEffect(() => {
    // Request permission for notifications on mount
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Function to show notifications
  const showNotification = (taskName) => {
    if (Notification.permission === 'granted') {
      new Notification('Task Reminder', {
        body: `Don't forget: ${taskName}`,
        icon: '/icon.png',
      });
    }
  };

  return { showNotification };
}

export default useNotification;
