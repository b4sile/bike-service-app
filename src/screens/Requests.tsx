import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Request } from '../models/Request';
import { requestService } from '../api/requestService';
import UserStore from '../store/UserStore';
import RequestItem from '../components/RequestItem';

export default function Requests() {
  const [requests, setRequests] = useState<Array<Request>>([]);
  const currentUser = UserStore.currentUser;

  useEffect(() => {
    if (currentUser) {
      requestService.getUserRequests(currentUser.id).then((data) => {
        setRequests(data);
      });
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      {requests.map((request, index) => (
        <RequestItem
          key={request.id}
          request={request}
          index={index + 1}
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
