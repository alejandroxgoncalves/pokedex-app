import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { setFavorites } from './store/favoritesSlice';
import store from './store/store';

function LoadFavoritesOnStart({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favorites');
        if (stored) {
          dispatch(setFavorites(JSON.parse(stored)));
        }
      } catch (error) {
        console.error('Error cargando favoritos desde AsyncStorage:', error);
      }
    };
    loadFavorites();
  }, []);

  return children;
}

export default function Layout() {
  return (
    <Provider store={store}>
      <LoadFavoritesOnStart>
        <Tabs
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#fecd29',
              height: 60,
            },
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === 'index') {
                iconName = 'home';
              } else if (route.name === 'favorites') {
                iconName = 'heart';
              }
              return (
                <Ionicons name={iconName} size={28} color={focused ? '#1d3557' : '#555'} />
              );
            },
          })}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="favorites" />
        </Tabs>
      </LoadFavoritesOnStart>
    </Provider>
  );
}
