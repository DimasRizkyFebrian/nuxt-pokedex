<template>
  <UContainer>
    <h1 class="text-3xl font-blod text-center my-8">Nuxt Pokédex</h1>

    <div class="mb-6">
      <UInput
        v-model="searchQuery"
        placeholder="Cari Pokémon..."
        icon="i-heroicons-magnifying-glass"
        size="lg"
      />
    </div>

    <div v-if="pending" class="loading">Memuat data...</div>

    <div v-else-if="filteredPokemon.length === 0" class="text-center">
      <p>Tidak ada Pokémon yang cocok dengan "{{ searchQuery }}".</p>
    </div>

    <div v-else class="grid-container">
      <div v-for="pokemon in filteredPokemon" :key="pokemon.name">
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
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";

// Fungsi untuk mengambil data Pokemon dari API
const { data: pokemonResponse, pending } = await useFetch<PokemonResponse>(
  apiUrl
);

// State untuk menyimpan keyword pencarian
const searchQuery = useState("searchQuery", () => "");

// Computed property untuk daftar pokemon yang terfilter berdasarkan keyword pencarian
const filteredPokemon = computed(() => {
  // Jika data belum ada, kembalikan array kosong
  if (!pokemonResponse.value) {
    return [];
  }
  // Jika kotak pencarian kosong, tampilkan semua pokemon
  if (!searchQuery.value) {
    return pokemonResponse.value.results;
  }
  // Jika ada isinya, filter berdasarkan nama
  return pokemonResponse.value.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
