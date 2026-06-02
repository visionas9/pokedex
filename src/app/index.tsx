import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  console.log(JSON.stringify(pokemon[0], null, 2));
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
              imageBack: details.sprites.back_default,
              types: details.types,
            };
          }),
        );

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
          <Text>{p.types[0].type.name}</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: p.image }}
              style={{ width: 100, height: 100 }}
            />
            <Image
              source={{ uri: p.imageBack }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// styling variables
const styles = StyleSheet.create({
  name: {},
});
