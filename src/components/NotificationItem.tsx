import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from '@rneui/themed';
import { Notification } from '../models/Notification';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

interface NotificationItemProps {
  notification: Notification;
  style?: StyleProp<ViewStyle> | undefined;
}

export default function NotificationItem({
  notification,
  style,
}: NotificationItemProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.itemDesc}>
        <Text>{notification.description}</Text>
      </View>
      <View>
        <Text style={styles.itemDate}>
          {format(new Date(notification.createdAt), 'dd MMMM H:mm', {
            locale: ru,
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    backgroundColor: '#d4d3d2',
  },
  itemDesc: {
    marginBottom: 5,
  },
  itemDate: {
    fontSize: 10,
    color: '#726D6D',
  },
});
