import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function Index() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPokemon();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pokedex</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
