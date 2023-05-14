import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

export default function SignIn() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Login</Text>
      <Button
        title="singup"
        onPress={() => navigation.navigate('SignUp' as never)}
      />
    </View>
  );
}
