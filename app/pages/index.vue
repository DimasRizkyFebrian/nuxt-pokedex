<template>
  <UContainer class="py-12">
    <h1 class="text-3xl font-bold text-center my-8">Nuxt Pokédex</h1>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-3 text-center">
        Filter Berdasarkan Tipe
      </h2>
      <div class="flex flex-wrap gap-2 justify-center">
        <UButton
          label="Semua"
          size="sm"
          :variant="!activeTypeUrl ? 'solid' : 'outline'"
          @click="activeTypeUrl = null"
        />
        <UButton
          v-for="type in relevantTypes"
          :key="type.name"
          :label="type.name"
          :variant="activeTypeUrl === type.url ? 'solid' : 'outline'"
          size="sm"
          class="capitalize"
          @click="activeTypeUrl = type.url"
        />
      </div>
    </div>

    <div class="mb-8 border-b border-gray-200 dark:border-gray-700"></div>

    <div class="mb-8">
      <UInput
        v-model="searchQuery"
        placeholder="Cari Pokémon..."
        icon="i-heroicons-magnifying-glass"
        size="lg"
      />
    </div>

    <div v-if="pendingPokemon" class="loading text-center">Memuat data...</div>

    <div
      v-else-if="!filteredPokemon || filteredPokemon.length === 0"
      class="text-center"
    >
      <p>Tidak ada Pokémon yang cocok dengan kriteria.</p>
    </div>

    <div v-else class="grid-container">
      <div v-for="pokemon in filteredPokemon" :key="pokemon.name">
        <PokemonCard :name="pokemon.name" :url="pokemon.url" />
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
// --- INTERFACES (Tipe Data) ---
interface Pokemon {
  name: string;
  url: string;
}
interface PokemonType {
  name: string;
  url: string;
}
interface TypesResponse {
  results: PokemonType[];
}

// --- DATA FETCHING ---
// 1. State untuk menyimpan URL tipe yang aktif. null berarti "Semua".
const activeTypeUrl = useState<string | null>("activeTypeUrl", () => null);

// Fetch daftar tipe Pokémon (tetap sama)
const { data: typesResponse } = await useFetch<TypesResponse>(
  "https://pokeapi.co/api/v2/type"
);

// 2. useAsyncData akan berjalan ulang setiap kali 'activeTypeUrl' berubah.
const { data: pokemonList, pending: pendingPokemon } = await useAsyncData(
  "pokemonList",
  async () => {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=151";
    if (activeTypeUrl.value) {
      url = activeTypeUrl.value; // Jika ada tipe yang aktif, gunakan URL tersebut.
    }

    const data = await $fetch<any>(url);

    // Normalisasi data
    if (activeTypeUrl.value) {
      // Jika dari enpoint 'type', datanya ada di 'data.pokemon'
      return data.pokemon.map((p: any) => p.pokemon) as Pokemon[];
    } else {
      // Jika dari enpoint 'pokemon', datanya ada di 'data.results'
      return data.results as Pokemon[];
    }
  },
  { watch: [activeTypeUrl] } // Perintah untuk menonton perubahan pada activeTypeUrl
);

// --- COMPUTED PROPERTIES ---
const searchQuery = useState("searchQuery", () => "");

// Computed untuk menyaring tipe yang tidak relevan
const relevantTypes = computed(() => {
  if (!typesResponse.value) return [];
  return typesResponse.value.results.filter(
    (type) => type.name !== "unknown" && type.name !== "shadow"
  );
});

// Filter Pokémon berdasarkan pencarian. Sumbernya sekarang 'pokemonList'.
const filteredPokemon = computed(() => {
  if (!pokemonList.value) return [];
  if (!searchQuery.value) {
    return pokemonList.value;
  }
  return pokemonList.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
