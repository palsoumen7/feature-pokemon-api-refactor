import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemons, fetchPokemonDetails } from '../services/pokemonService';

interface PokemonState {
    list: { name: string; url: string }[];
    details: { name: string; image: string }[];
    loading: boolean;
}

const initialState: PokemonState = {
    list: [],
    details: [],
    loading: false,
};


export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async () => {
    const pokemons = await fetchPokemons();
    return pokemons;
});

export const fetchPokemonDetailsThunk = createAsyncThunk(
    'pokemon/fetchPokemonDetails',
    async (list: { name: string; url: string }[]) => {
        const details = await Promise.all(
            list.map(async (pokemon) => {
                const pokemonDetails = await fetchPokemonDetails(pokemon.url);
                return pokemonDetails;
            })
        );
        return details;
    }
);

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemon.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchPokemon.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchPokemonDetailsThunk.fulfilled, (state, action) => {
                state.details = action.payload;
            });
    },
});

export default pokemonSlice.reducer;
