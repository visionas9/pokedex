import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";

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

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

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
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemon.map((p) => (
        <Pressable
          onPress={() =>
            router.navigate({ pathname: "/details", params: { name: p.name } })
          }
          key={p.name}
        >
          <View
            style={{
              // @ts-ignore
              backgroundColor: colorsByType[p.types[0].type.name] + 50,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.type}>{p.types[0].type.name}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: p.image }}
                style={{ width: 200, height: 200 }}
              />
              <Image
                source={{ uri: p.imageBack }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// styling variables
const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});
