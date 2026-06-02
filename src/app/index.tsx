import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  image: string;
}

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
        const data = await res.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon.name,
              image: details.sprites.front_default,
            };
          }),
        );
        console.log(detailedPokemons);

        setPokemon(detailedPokemons);
      } catch (err) {
        console.log(err);
      }
    };
    getPokemon();
  }, []);

  return (
    <ScrollView>
      {pokemon.map((p) => (
        <View key={p.name}>
          <Text>{p.name}</Text>
          <Image
            source={{ uri: p.image }}
            style={{ width: 100, height: 100 }}
          />
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
