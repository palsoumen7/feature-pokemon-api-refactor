import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchPokemon, fetchPokemonDetailsThunk } from '../store/pokemonSlice';
import '../styles/List.css';

const List = () => {
    const dispatch = useAppDispatch();
    const { list, details, loading } = useAppSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(fetchPokemon());
    }, [dispatch]);

    useEffect(() => {
        if (list.length > 0) {
            dispatch(fetchPokemonDetailsThunk(list));
        }
    }, [list, dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="pokemon-list">
            {details.map((pokemon) => (
                <div key={pokemon.name} className="pokemon-item">
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="pokemon-image"
                    />
                    <p className="pokemon-name">{pokemon.name}</p>
                </div>
            ))}
        </div>
    );
};

export default List;
