import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserStore from '../store/UserStore';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      UserStore.currentUser = null;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        styles.container,
      ]}
    >
      <View style={{ marginVertical: 10 }}>
        <View style={styles.navBtn}>
          <Button
            title="Мой профиль"
            onPress={() => navigation.navigate('Profile' as never)}
          />
        </View>
        <View style={styles.navBtn}>
          <Button
            title="Мои заявки"
            onPress={() => navigation.navigate('Requests' as never)}
          />
        </View>
      </View>
      <View style={styles.navBtn}>
        <Button title="Выйти" onPress={onLogout} />
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
  navBtn: {
    marginTop: 10,
    marginBottom: 10,
  },
});
