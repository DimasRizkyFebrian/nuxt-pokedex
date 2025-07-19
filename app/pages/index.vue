<template>
  <UContainer>
    <h1 class="text-3xl font-blod text-center my-8">Nuxt Pokédex</h1>

    <div v-if="pending" class="loading">Memuat data...</div>

    <div v-else class="grid-container">
      <div v-for="pokemon in pokemonResponse?.results" :key="pokemon.name">
        <PokemonCard :name="pokemon.name" :url="pokemon.url" />
      </div>
    </div>
  </UContainer>
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
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";

// Fungsi untuk mengambil data Pokemon dari API
const {
  data: pokemonResponse,
  pending,
  error,
} = await useFetch<PokemonResponse>(apiUrl);
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
