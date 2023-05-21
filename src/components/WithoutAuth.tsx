import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function WithoutAuth() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Необходимо войти в свой аккаунт!</Text>
      <Button
        title="Войти"
        onPress={() => navigation.navigate('AuthStack' as never)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    marginBottom: 20,
  },
});
