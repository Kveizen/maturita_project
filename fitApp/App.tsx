import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './app/screens/Login';
import HomeScreen from './app/screens/tabs/HomeScreen';
import ExerciseScreen from './app/screens/tabs/ExerciseScreen';
import ConnectScreen from './app/screens/tabs/ConnectScreen';
import HistoryScreen from './app/screens/tabs/HistoryScreen';
import Profilecreen from './app/screens/tabs/ProfileScreen';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Exercises" component={ExerciseScreen} />
      <Tab.Screen name="Connect" component={ConnectScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={Profilecreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, [])

  return (
    <NavigationContainer>
        {user ? (
          <MyTabs/>
        ):(
          <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
};