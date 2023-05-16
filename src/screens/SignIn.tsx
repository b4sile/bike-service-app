import { useNavigation } from '@react-navigation/native';
import { Button, Dialog, Input, Text } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { userService } from '../api/userService';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const onSignIn = (): void => {
    userService
      .signIn({ email, password })
      .then(() => {
        navigation.navigate('Home' as never);
      })
      .catch(() => {
        setVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Input
          style={styles.input}
          placeholder="Адрес электронной почты"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={styles.input}
          placeholder="Пароль"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Войти"
          onPress={onSignIn}
          disabled={!email || !password}
        />
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.notAccount}>
          <View style={styles.line}></View>
          <Text>Еще нету аккаунта?</Text>
          <View style={styles.line}></View>
        </View>
        <Button
          title="Создать аккаунт"
          onPress={() => navigation.navigate('SignUp' as never)}
        />
      </View>
      <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Text>Неверный логин или пароль!</Text>
      </Dialog>
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
  bottomBlock: {
    marginBottom: 10,
  },
  line: {
    backgroundColor: '#262626',
    width: 100,
    height: 1,
  },
  notAccount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
  },
});
