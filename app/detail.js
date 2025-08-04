import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from './store/favoritesSlice';



export default function DetailScreen() {
  const { name } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav.name === name);

  useEffect(() => {
  fetchPokemonDetails();
}, [name]);


  const fetchPokemonDetails = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(response.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron obtener los detalles del Pokémon.');
    }
  };

  const toggleFavorite = () => {
    if (!pokemon) return;

    const image =
      pokemon.sprites.other?.['official-artwork']?.front_default ||
      pokemon.sprites.front_default ||
      '';

    if (isFavorite) {
  dispatch(removeFavorite(name));
} else {
  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    '';

  dispatch(addFavorite({ name, image })); 
}

  };

  if (!pokemon) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Cargando...</Text>
      </View>
    );
  }

  const { height, weight, types } = pokemon;
  const image =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    '';

  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        <Text style={styles.info}>Tipo: {types.map((t) => t.type.name).join(', ')}</Text>
        <Text style={styles.info}>Altura: {height / 10} m</Text>
        <Text style={styles.info}>Peso: {weight / 10} kg</Text>

        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Text style={styles.favoriteText}>
            {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: '#457b9d',
    marginBottom: 5,
  },
  favoriteButton: {
    marginTop: 20,
    backgroundColor: '#e63946',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  favoriteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 18,
    color: '#1d3557',
  },
});
