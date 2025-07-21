<script setup lang="ts">
const route = useRoute();
const pokemonName = route.params.name as string;

// --- INTERFACES ---
interface PokemonTypeInfo {
  type: {
    name: string;
  };
}

interface PokemonSprites {
  other?: {
    dream_world: {
      front_default: string | null;
    };
  };
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonTypeInfo[];
}

// --- DATA FETCHING ---
// 1. Fetch Pokemon Detail
const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
const { data: pokemon, pending, error } = await useFetch<PokemonDetail>(apiUrl);

// 2. Fetch data rantai evolusi
const { data: evolutionChainData } = await useAsyncData(
  "evolutionChain",
  async () => {
    if (!pokemon.value) return null;

    // Dapatkan URL Pokemon Species dari ID pokemon
    const speciesData = await $fetch<any>(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon.value.id}/`
    );

    // Dari data species, ambil URL untuk evolution chain
    const evolutionChainUrl = speciesData.evolution_chain.url;

    // Ambil data dari URL evolution chain dan kembalikan
    return await $fetch<any>(evolutionChainUrl);
  },
  {
    watch: [pokemon], // Perintah agar useAsyncData ini dijalankan ulang jika 'pokemon' berubah
  }
);

// Computed property untuk mem-parsing data evolusi menjadi array sederhana
const evolutionList = computed(() => {
  if (!evolutionChainData.value) return [];

  const evolutionLine: { name: string; id: string }[] = [];
  let currentStage = evolutionChainData.value.chain;

  // Loop untuk menelusuri pohon evolusi
  while (currentStage) {
    const speciesName = currentStage.species.name;
    const urlParts = currentStage.species.url.split("/");
    const speciesId = urlParts[urlParts.length - 2];

    evolutionLine.push({ name: speciesName, id: speciesId });

    // Pindah ke tahap evolusi berikutnya
    currentStage = currentStage.evolves_to?.[0];
  }
  return evolutionLine;
});

// Computed property untuk mendapatkan URL gambar dengan aman
const imageUrl = computed(
  () => pokemon.value?.sprites.other?.dream_world.front_default
);
</script>

<template>
  <div class="detail-page-wrapper">
    <UContainer>
      <div class="py-12">
        <div v-if="pending" class="text-center">
          <p>Memuat detail Pokémon...</p>
        </div>
        <div v-else-if="error" class="text-center">
          <h2 class="text-2xl font-bold">Pokémon Tidak Ditemukan</h2>
          <UButton to="/" label="Kembali" class="mt-4" />
        </div>

        <UCard v-else-if="pokemon">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div
              class="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                :alt="pokemon.name"
                class="h-64 w-64 object-contain"
              />
              <div v-else class="h-64 w-64 flex items-center justify-center">
                <p>Gambar tidak tersedia</p>
              </div>
            </div>

            <div>
              <h1 class="text-4xl font-bold capitalize mb-4">
                {{ pokemon.name }}
              </h1>

              <div class="mb-6">
                <h2 class="text-xl font-semibold mb-2">Types</h2>
                <div class="flex gap-2">
                  <UBadge
                    v-for="item in pokemon.types"
                    :key="item.type.name"
                    :label="item.type.name"
                    size="lg"
                    variant="subtle"
                  />
                </div>
              </div>

              <div class="mb-6">
                <h2 class="text-xl font-semibold mb-2">Details</h2>
                <ul class="list-disc list-inside">
                  <li>Height: {{ pokemon.height / 10 }} m</li>
                  <li>Weight: {{ pokemon.weight / 10 }} kg</li>
                </ul>
              </div>

              <UButton
                to="/"
                label="Kembali ke Daftar Pokémon"
                icon="i-heroicons-arrow-left"
              />
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>

    <UContainer
      v-if="evolutionList && evolutionList.length > 1"
      class="evolution-card py-8"
    >
      <h2 class="text-2xl font-bold text-center mb-4 font-pixel">
        Evolution Chain
      </h2>
      <div class="flex justify-center items-center gap-4 flex-wrap">
        <template v-for="(evolution, index) in evolutionList">
          <EvolutionStage :name="evolution.name" :id="evolution.id" />
          <UIcon
            v-if="index < evolutionList.length - 1"
            name="i-heroicons-arrow-right-20-solid"
            class="h-8 w-8"
          />
        </template>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.detail-page-wrapper {
  background-image: url("/images/bg-detail.png");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.evolution-card {
  background-color: rgba(31, 41, 55, 0.6);
  width: 40%;
  border-radius: 10px 10px 10px 10px;
}
</style>
