import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
        const data = await res.json();
        setPokemon(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getPokemon();
  }, []);

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  return (
    <ScrollView>
      {pokemon.map((p) => (
        <View key={p.name}>
          <Text>{p.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
