import { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Notification } from '../models/Notification';
import UserStore from '../store/UserStore';
import { notificaitonService } from '../api/notificationService';
import NotificationItem from '../components/NotificationItem';
import { useIsFocused } from '@react-navigation/native';

export default function Notifications() {
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const currentUser = UserStore.currentUser;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && currentUser) {
      notificaitonService.getUserNotifications(currentUser.id).then((data) => {
        setNotifications(data);
      });
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      {notifications.map((notification) => (
        <NotificationItem
          notification={notification}
          key={notification.id}
          style={styles.item}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    marginVertical: 5,
  },
});
