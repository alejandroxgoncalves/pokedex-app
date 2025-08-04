import { useRouter } from 'expo-router';
import { Alert, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PokemonCard from './components/PokemonCard';
import { removeFavorite } from './store/favoritesSlice';

export default function FavoritesScreen() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const handleRemove = (name) => {
    Alert.alert('Eliminar', `¿Quitar a ${name} de favoritos?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => dispatch(removeFavorite(name)) },
    ]);
  };
  
  const handlePressCard = (name) => {
    router.push({ pathname: '/detail', params: { name } });
  };
  
  
  console.log('FAVORITOS EN REDUX:', favorites);// Log para verificar favoritos en Redux
  return (
    <ImageBackground source={require('../assets/bg.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={require('../assets/pokeball.png')} style={styles.pokeball} />
            <Text style={styles.emptyText}>No hay ningún Pokémon en favoritos.</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => handleRemove(item.name)}>
                <PokemonCard
                  name={item.name}
                  image={item.image}
                  onPress={() => handlePressCard(item.name)}
                />
              </TouchableOpacity>
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
  logo: { width: 200, height: 80, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pokeball: { width: 100, height: 100, opacity: 0.3 },
  emptyText: { fontSize: 18, marginTop: 10, color: '#1d3557', fontWeight: 'bold' },
});
