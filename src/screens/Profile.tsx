import { Button, Input } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '../models/User';
import UserStore from '../store/UserStore';
import { userService } from '../api/userService';

export default function Profile() {
  const [user, setUser] = useState<User>(
    UserStore.currentUser ? { ...UserStore.currentUser } : { id: -1, email: '' }
  );

  useEffect(() => {
    userService.getCurrentUser().then((value) => {
      if (value) {
        setUser({ ...value });
      }
    });
  }, []);

  const onSave = () => {
    userService.updateCurrentUser(user).then((value) => {
      setUser(value);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View>
          <Text>Имя</Text>
          <Input
            placeholder="Имя"
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
        </View>
        <View>
          <Text>Фамилия</Text>
          <Input
            value={user.lastname}
            placeholder="Фамилия"
            onChangeText={(text) => setUser({ ...user, lastname: text })}
          />
        </View>
        <View>
          <Text>Отчество</Text>
          <Input
            value={user.surname}
            placeholder="Отчество"
            onChangeText={(text) => setUser({ ...user, surname: text })}
          />
        </View>
        <View>
          <Text>Телефон</Text>
          <Input
            value={user.phone}
            placeholder="Телефон"
            onChangeText={(text) => setUser({ ...user, phone: text })}
          />
        </View>
        <View>
          <Text>Почта</Text>
          <Input
            value={user.email}
            placeholder="Почта"
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
        </View>
      </View>
      <View style={styles.bottomBtn}>
        <Button title="Сохранить" disabled={!user.email} onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  inputs: {
    marginVertical: 5,
  },
  bottomBtn: {
    marginBottom: 10,
  },
});
