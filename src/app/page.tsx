"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Input,
  SimpleGrid,
  Button,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import PokemonCard from "../components/PokemonCard";
import { getPokemonList } from "../utils/fetchPokemon";
import useDebounce from "@/utils/useDebounce";

import "@fontsource/press-start-2p";
import "@fontsource/poppins";

interface Pokemon {
  name: string;
  url: string;
  id: string;
}

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  const fetchPokemons = async (url?: string) => {
    setLoading(true);
    try {
      const data = await getPokemonList(url);
      setPokemonList(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setFilteredPokemon(data.results);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [debouncedSearch, pokemonList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blue.800, blue.600)"
      p={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Title */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        fontFamily="Press Start 2P"
        color="yellow.300"
        textAlign="center"
        mb={4}
      >
        Pokémon Search
      </Text>

      {/* Search Input */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Input
          placeholder="Search Pokémon..."
          value={search}
          onChange={handleInputChange}
          bg="white"
          borderRadius="lg"
          textAlign="center"
          fontFamily="Poppins, sans-serif"
          fontSize="lg"
          fontWeight="medium"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)"
          _focus={{
            borderColor: "yellow.500",
            boxShadow: "0 0 5px rgba(255, 215, 0, 0.5)",
          }}
          _hover={{
            borderColor: "yellow.400",
          }}
          p="12px"
          width="100%"
          maxW="400px"
          mb={6}
        />
      </motion.div>

      {loading ? (
        <Flex justifyContent="center" alignItems="center" mt={10}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Loading..."
              boxSize="80px"
            />
          </motion.div>
        </Flex>
      ) : (
        <>
          {/* Pokémon Grid */}
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={5} mb={6}>
            {filteredPokemon.length === 0 ? (
              <Text
                textAlign="center"
                fontSize="xl"
                fontFamily="Press Start 2P"
                color="red.400"
                mt={4}
              >
                No Pokémon Found
              </Text>
            ) : (
              filteredPokemon.map((pokemon) => {
                const id = pokemon.url.split("/").filter(Boolean).pop() || "";
                return (
                  <motion.div
                    key={id}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PokemonCard name={pokemon.name} id={id} />
                  </motion.div>
                );
              })
            )}
          </SimpleGrid>

          {/* Pagination Controls */}
          <Flex mt={4} justify="center" gap={4}>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                onClick={() => fetchPokemons(prevPage!)}
                disabled={!prevPage}
                colorScheme="yellow"
                variant="solid"
                fontFamily="Press Start 2P"
                fontSize="sm"
              >
                Previous
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                onClick={() => fetchPokemons(nextPage!)}
                disabled={!nextPage}
                colorScheme="yellow"
                variant="solid"
                fontFamily="Press Start 2P"
                fontSize="sm"
              >
                Next
              </Button>
            </motion.div>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default HomePage;
