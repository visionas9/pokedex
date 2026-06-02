import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

interface PokemonType {
  type: { name: string };
}

interface PokemonAbility {
  ability: { name: string };
}

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
}

export default function Details() {
  const params = useLocalSearchParams();

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null,
  );

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${String(params.name).toLowerCase()}`,
        );
        const data = await res.json();
        setPokemonDetails(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPokemonDetails();
  }, [params.name]);

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
        {!pokemonDetails ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Image
              source={{
                uri:
                  pokemonDetails.sprites.other["official-artwork"]
                    .front_default ??
                  pokemonDetails.sprites.front_default ??
                  "",
              }}
              style={styles.image}
            />

            <Text style={styles.title}>
              #{pokemonDetails.id} {pokemonDetails.name}
            </Text>

            <View style={styles.row}>
              {pokemonDetails.types.map((t) => (
                <Text key={t.type.name} style={styles.badge}>
                  {t.type.name}
                </Text>
              ))}
            </View>

            <Text style={styles.label}>
              Height: {pokemonDetails.height / 10} m
            </Text>
            <Text style={styles.label}>
              Weight: {pokemonDetails.weight / 10} kg
            </Text>
            <Text style={styles.label}>
              Base XP: {pokemonDetails.base_experience}
            </Text>

            <Text style={styles.section}>Abilities</Text>
            {pokemonDetails.abilities.map((a) => (
              <Text key={a.ability.name} style={styles.label}>
                {a.ability.name}
              </Text>
            ))}

            <Text style={styles.section}>Stats</Text>
            {pokemonDetails.stats.map((s) => (
              <Text key={s.stat.name} style={styles.label}>
                {s.stat.name}: {s.base_stat}
              </Text>
            ))}
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  image: { width: 200, height: 200, alignSelf: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    alignSelf: "center",
  },
  row: { flexDirection: "row", gap: 8, flexWrap: "wrap", alignSelf: "center" },
  badge: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    textTransform: "capitalize",
  },
  label: { fontSize: 16, textTransform: "capitalize", alignSelf: "center" },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    alignSelf: "center",
  },
});
