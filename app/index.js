import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import { loadFavorites } from './store/favoritesSlice';

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch(); // <-- PARA CARGAR FAVORITOS

  useEffect(() => {
    fetchPokemonList();
    dispatch(loadFavorites()); // <-- CARGAMOS FAVORITOS EN EL INICIO
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = response.data.results;

      // Obtener las imágenes correctas desde cada endpoint individual
      const withImages = await Promise.all(
        data.map(async (poke) => {
          const res = await axios.get(poke.url);
          return {
            name: poke.name,
            image: res.data.sprites.front_default,
          };
        })
      );

      setPokemonList(withImages);
      setFilteredPokemon(withImages);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener Pokémon:', error);
      Alert.alert('Error', 'No se pudo obtener la lista de Pokémon.');
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <SearchBar
            value={search}
            onChangeText={setSearch}
            onSearch={() => {
              const filtered = pokemonList.filter(poke =>
                poke.name.toLowerCase().includes(search.toLowerCase())
              );
              setFilteredPokemon(filtered);
            }}
          />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredPokemon}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PokemonCard
                name={item.name}
                image={item.image}
                onPress={() => router.push({ pathname: '/detail', params: { name: item.name } })}
              />
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 20, paddingTop: 50 },
});
