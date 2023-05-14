import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './Menu';
import Profile from './Profile';
import Requests from './Requests';

const Stack = createNativeStackNavigator();

export default function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: 'Мой профиль' }}
      />
      <Stack.Screen
        name="Requests"
        component={Requests}
        options={{ headerTitle: 'Мои заявки' }}
      />
    </Stack.Navigator>
  );
}
