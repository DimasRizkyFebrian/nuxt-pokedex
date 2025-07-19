<template>
  <div>
    <h1 class="title">Daftar Pokémon</h1>

    <div v-if="pending" class="loading">Memuat data...</div>

    <div v-else-if="error" class="error">
      Terjadi kesalahan: {{ error.message }}
    </div>

    <ul v-else-if="pokemonResponse && pokemonResponse.results">
      <li v-for="pokemon in pokemonResponse.results" :key="pokemon.name">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// Tipe data untuk hasil individu Pokemon
interface Pokemon {
  name: string;
  url: string;
}

// Tipe data untuk respons API
interface PokemonResponse {
  results: Pokemon[];
}

// Url dari PokéAPI
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";

// Fungsi untuk mengambil data Pokemon dari API
const {
  data: pokemonResponse,
  pending,
  error,
} = await useFetch<PokemonResponse>(apiUrl);
</script>

<style>
body {
  font-family: Arial, sans-serif;
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  text-transform: capitalize;
}
</style>
