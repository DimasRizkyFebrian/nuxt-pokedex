<template>
  <NuxtLink :to="`/pokemon/${props.name}`">
    <UCard class="text-center transition hover:scale-105 hover:shadow-lg">
      <template #header>
        <p class="text-gray-500 dark:text-gray-400">#{{ pokemonId }}</p>
      </template>

      <img :src="imageUrl" :alt="props.name" class="mx-auto h-24 w-24" />

      <template #footer>
        <h3 class="text-lg font-bold capitalize">{{ props.name }}</h3>
      </template>
    </UCard>
  </NuxtLink>
</template>

<script lang="ts" setup>
// Komponen untuk menerima 'props' dari parent
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

// Ektrak ID pokemon dari URL untuk mendapatkan gambar berkualitas tinggi
const pokemonId = computed(() => props.url.split("/")[6]);

// URL untuk gambar resmi Pokemon
const imageUrl = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId.value}.svg`
);
</script>

<style></style>
