<script setup lang="ts">
const route = useRoute();
const pokemonName = route.params.name as string;

// Definisikan interface agar lebih aman dan jelas
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
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonTypeInfo[];
}

const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
const { data: pokemon, pending, error } = await useFetch<PokemonDetail>(apiUrl);

// Computed property untuk mendapatkan URL gambar dengan aman
const imageUrl = computed(
  () => pokemon.value?.sprites.other?.dream_world.front_default
);
</script>

<template>
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
</template>
