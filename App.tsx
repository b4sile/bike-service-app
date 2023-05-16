import Home from './src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Request from './src/screens/Request';
import Notifications from './src/screens/Notifications';
import {
  Feather,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import UserStore from './src/store/UserStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MenuStack from './src/screens/MenuStack';
import AuthStack from './src/screens/AuthStack';
import { useEffect } from 'react';
import { userService } from './src/api/userService';

const Tab = createBottomTabNavigator();

export default observer(function App() {
  const isAuth = UserStore.isAuth;

  useEffect(() => {
    userService.getCurrentUser().then();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              title: 'Главная',
              tabBarIcon: ({ focused }) => (
                <Feather
                  name="book-open"
                  size={24}
                  color={focused ? 'rgb(0, 122, 255)' : 'black'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Request"
            component={Request}
            options={{
              headerTitle: 'Заявка',
              title: 'Заявка',
              tabBarIcon: ({ focused }) => (
                <MaterialIcons
                  name="miscellaneous-services"
                  size={24}
                  color={focused ? 'rgb(0, 122, 255)' : 'black'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
              headerTitle: 'Уведомления',
              title: 'Уведомления',
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={focused ? 'rgb(0, 122, 255)' : 'black'}
                />
              ),
            }}
          />
          {isAuth ? (
            <Tab.Screen
              name="MenuStack"
              component={MenuStack}
              options={{
                title: 'Меню',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <FontAwesome5
                    name="user-circle"
                    size={24}
                    color={focused ? 'rgb(0, 122, 255)' : 'black'}
                  />
                ),
              }}
            />
          ) : (
            <Tab.Screen
              name="AuthStack"
              component={AuthStack}
              options={{
                title: 'Войти',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <SimpleLineIcons
                    name="login"
                    size={24}
                    color={focused ? 'rgb(0, 122, 255)' : 'black'}
                  />
                ),
              }}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
});
