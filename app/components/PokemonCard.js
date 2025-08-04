import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function PokemonCard({ name, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{capitalize(name)}</Text>
    </TouchableOpacity>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1faee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    color: '#1d3557',
    fontWeight: 'bold',
  },
});