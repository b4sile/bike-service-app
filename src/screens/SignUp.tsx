import { Button, Input } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { userService } from '../api/userService';
import ModalsStore from '../store/ModalsStore';

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

const initialState: RegisterForm = {
  email: '',
  name: '',
  password: '',
  repeatedPassword: '',
};

export default function SignUp() {
  const [registerForm, setRegisterForm] = useState<RegisterForm>(initialState);

  const onSave = () => {
    userService
      .signUp(registerForm)
      .then(() => {
        ModalsStore.addCommonModalItem({
          message: 'Отлично, теперь вы можете войти в свой аккаунт!',
        });
        setRegisterForm(initialState);
      })
      .catch(() => {
        ModalsStore.addCommonModalItem({
          message: 'Ошибка, проверьте правильность введенных данных.',
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View>
          <Text>Имя</Text>
          <Input
            placeholder="Имя"
            value={registerForm.name}
            onChangeText={(text) =>
              setRegisterForm({ ...registerForm, name: text })
            }
          />
        </View>
        <View>
          <Text>Почта</Text>
          <Input
            value={registerForm.email}
            placeholder="Почта"
            onChangeText={(text) =>
              setRegisterForm({ ...registerForm, email: text })
            }
          />
        </View>
        <View>
          <Text>Пароль</Text>
          <Input
            value={registerForm.password}
            placeholder="Пароль"
            secureTextEntry
            onChangeText={(text) =>
              setRegisterForm({ ...registerForm, password: text })
            }
          />
        </View>
        <View>
          <Text>Повторите пароль</Text>
          <Input
            value={registerForm.repeatedPassword}
            placeholder="Повторите пароль"
            secureTextEntry
            onChangeText={(text) =>
              setRegisterForm({ ...registerForm, repeatedPassword: text })
            }
          />
        </View>
      </View>
      <View style={styles.bottomBtn}>
        <Button
          title="Зарегистрироваться"
          disabled={
            !registerForm.email ||
            !registerForm.password ||
            registerForm.password !== registerForm.repeatedPassword
          }
          onPress={onSave}
        />
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
