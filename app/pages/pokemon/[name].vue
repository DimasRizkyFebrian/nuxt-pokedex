<template>
  <div>
    <div v-if="pending" class="loading">Mencari Pokémon...</div>

    <div v-else-if="error" class="error">
      Pokémon tidak ditemukan. <NuxtLink to="/">Kembali ke daftar</NuxtLink>
    </div>

    <div v-else-if="pokemonDetail" class="pokemon-details">
      <img
        :src="pokemonDetail.sprites.front_default"
        :alt="pokemonDetail.name"
        class="pokemon-image"
      />
      <h1>{{ pokemonDetail.name }}</h1>

      <div class="info">
        <h3>Types</h3>
        <ul>
          <li v-for="item in pokemonDetail.types" :key="item.type.name">
            {{ item.type.name }}
          </li>
        </ul>
      </div>

      <div class="info">
        <h3>Details</h3>
        <p>Height: {{ pokemonDetail.height / 10 }} m</p>
        <p>Weight: {{ pokemonDetail.weight / 10 }} kg</p>
      </div>

      <NuxtLink to="/">Kembali ke daftar Pokémon</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Akses parameter dari URL
const route = useRoute();

// Ambil parameter `name` dari URL, contoh "bulbasur"
const pokemonName = route.params.name;

// URL API yang dinamis berdasarkan nama Pokemon
const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

// Interface untuk struktur data detail Pokemon
interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
}

// Fetch data Pokemon dari API untuk Pokémon spesifik
const {
  data: pokemonDetail,
  pending,
  error,
} = await useFetch<PokemonDetail>(apiUrl);
</script>

<style scoped>
/* `scoped` berarti style ini hanya berlaku untuk komponen ini */
.pokemon-details {
  text-align: center;
  text-transform: capitalize;
}

.pokemon-image {
  width: 150px;
  height: 150px;
}

.info {
  margin: 1rem 0;
}

.info ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
