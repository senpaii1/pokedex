"use client";

import { Box, Image, Text, Badge, SimpleGrid, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getPokemonDetails } from "@/utils/fetchPokemon";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import "@fontsource/press-start-2p";
import "@fontsource/poppins";

const typeColors: Record<string, string> = {
  fire: "red",
  water: "blue",
  grass: "green",
  electric: "yellow",
  psychic: "pink",
  ice: "cyan",
  dragon: "purple",
  dark: "gray",
  fairy: "pink",
  normal: "gray",
};

const fetchPokemonData = async (id: string) => {
  try {
    return await getPokemonDetails(id);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};

const PokemonDetail = () => {
  const params = useParams();
  const id = params.id as string;

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchPokemonData(id).then((data) => {
      setPokemon(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Center h="100vh" bgGradient="linear(to-b, blue.800, blue.600)">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        >
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            boxSize="80px"
          />
        </motion.div>
      </Center>
    );
  }

  if (!pokemon) {
    return (
      <Center h="100vh" bgGradient="linear(to-b, blue.800, blue.600)">
        <Text
          fontSize="xl"
          color="red.500"
          textAlign="center"
          fontFamily="Poppins"
        >
          Pokémon not found or API error.
        </Text>
      </Center>
    );
  }

  return (
    <Box
      bgGradient="linear(to-b, blue.800, blue.600)"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <Box
          p={6}
          textAlign="center"
          maxW="500px"
          mx="auto"
          bg="white"
          boxShadow="lg"
          borderRadius="lg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              mx="auto"
              boxShadow="lg"
            />
          </motion.div>

          <Text
            fontSize="2xl"
            fontWeight="bold"
            fontFamily="Press Start 2P"
            mt={3}
          >
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>

          <Box mt={3}>
            {pokemon.types.map((typeInfo: any) => (
              <Badge
                key={typeInfo.type.name}
                colorScheme={typeColors[typeInfo.type.name] || "gray"}
                m={1}
                px={2}
                py={1}
                borderRadius="full"
                fontFamily="Poppins"
              >
                {typeInfo.type.name}
              </Badge>
            ))}
          </Box>

          <Text mt={4} fontSize="lg" fontWeight="bold" fontFamily="Poppins">
            Abilities:
          </Text>
          <Box>
            {pokemon.abilities.map((abilityInfo: any) => (
              <Badge
                key={abilityInfo.ability.name}
                colorScheme="blue"
                m={1}
                fontFamily="Poppins"
              >
                {abilityInfo.ability.name}
              </Badge>
            ))}
          </Box>

          <Text mt={4} fontSize="lg" fontWeight="bold" fontFamily="Poppins">
            Base Stats:
          </Text>
          <Box>
            {pokemon.stats.map((statInfo: any) => (
              <Text key={statInfo.stat.name} fontFamily="Poppins">
                {statInfo.stat.name}: {statInfo.base_stat}
              </Text>
            ))}
          </Box>

          <Text mt={4} fontSize="lg" fontWeight="bold" fontFamily="Poppins">
            Moves:
          </Text>
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2} mt={2}>
            {pokemon.moves.slice(0, 10).map((moveInfo: any) => (
              <Badge
                key={moveInfo.move.name}
                colorScheme="purple"
                m={1}
                fontFamily="Poppins"
              >
                {moveInfo.move.name}
              </Badge>
            ))}
          </SimpleGrid>
        </Box>
      </motion.div>
    </Box>
  );
};

export default PokemonDetail;
