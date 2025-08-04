import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const FAVORITES_KEY = 'favorites';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    setFavorites: (state, action) => {
      return action.payload;
    },
    addFavorite: (state, action) => {
      const exists = state.find(p => p.name === action.payload.name);
      if (!exists) {
        const newState = [...state, action.payload];
        AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newState));
        return newState;
      }
      return state;
    },
    removeFavorite: (state, action) => {
      const newState = state.filter(p => p.name !== action.payload);
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newState));
      return newState;
    },
  },
});

export const loadFavorites = () => async (dispatch) => {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      dispatch(setFavorites(parsed));
    }
  } catch (error) {
    console.error('Error al cargar favoritos:', error);
  }
};



export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
