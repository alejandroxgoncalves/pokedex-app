import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchBar({ value, onChangeText, onSearch, onFavorites }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Pokémon por nombre"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.favButton} onPress={onFavorites}>
        <Image source={require('../../assets/pokeball.png')} style={styles.favIcon} />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'white',
    color: '#333',
  },
  button: {
    backgroundColor: '#457b9d',
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  favButton: {
    backgroundColor: '#f1faee',
    paddingHorizontal: 8,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  favIcon: {
    width: 22,
    height: 22,
  },
});
