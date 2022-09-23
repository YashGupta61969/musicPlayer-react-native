import { StyleSheet, StatusBar } from 'react-native';
import Songs from './components/Songs';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Player from './components/Player';
import Icons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import songs from './data/data'


const colors = {
  graident: ['#cc208e', '#6713d2'],
  white:'#fdfbff',
  gray:'#b1a7bb',
  ui:'#9c16ad',
  bg:'#170524'
}

const Tab = createBottomTabNavigator()

 function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
      barStyle={'light-content'}
      />

    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: colors.bg,
        },
        headerTintColor: colors.white,
        tabBarStyle:{
          height:488,
          paddingVertical:20
        }
      }}>

        <Tab.Screen name='Songs' component={Songs} options={{
          tabBarActiveTintColor:colors.ui,
          tabBarInactiveTintColor:colors.white,
          tabBarStyle:{
            backgroundColor:colors.bg
          },
          tabBarIcon:({ color, size})=>{
            return <Icons name={'musical-notes-outline'} size={size} color={color} />
          }
        }}/>
        <Tab.Screen name='Player' component={Player} options={{
          tabBarActiveTintColor:colors.ui,
          tabBarInactiveTintColor:colors.white,
          tabBarStyle:{
            backgroundColor:colors.bg
          },
          tabBarIcon:({ color, size})=>{
            return <Feather name={'play'} size={size} color={color} />
          }
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
  },
});


export default App