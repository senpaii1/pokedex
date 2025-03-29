"use client";
import { Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const MotionBox = motion(Box);

interface PokemonProps {
  name: string;
  id: string;
}

const PokemonCard = React.memo(({ name, id }: PokemonProps) => {
  return (
    <Link href={`/pokemon/${id}`}>
      <MotionBox
        p={4}
        borderRadius="lg"
        bg="white"
        textAlign="center"
        cursor="pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          mx="auto"
          loading="lazy"
        />
        <Text fontWeight="bold" mt={2}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </MotionBox>
    </Link>
  );
});

export default PokemonCard;
