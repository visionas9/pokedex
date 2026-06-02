import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { Stack } from "expo-router";

interface PokemonDetails {}

export default function Details() {
  const params = useLocalSearchParams();

  const [pokemonDetails, setPokemonDetails] = useState([]);

  console.log(pokemonDetails);
  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.name}`,
        );
        const data = await res.json();
        setPokemonDetails(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPokemonDetails();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
        }}
      ></ScrollView>
    </>
  );
}

// styling variables
const styles = StyleSheet.create({});
