// src/features/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Character {
  id: string;
  name: string;
  status: string;
  image: string;
  location: {
    name: string;
  };
}

interface FavoritesState {
  characters: Character[];
}

const initialState: FavoritesState = {
  characters: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },
    
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(character => character.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.characters;

export default favoritesSlice.reducer;
