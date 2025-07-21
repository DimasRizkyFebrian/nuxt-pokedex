<template>
  <NuxtLink
    :to="`/pokemon/${name}`"
    class="flex flex-col items-center gap-2 transition hover:scale-105"
  >
    <div
      class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-32 flex items-center justify-center"
    >
      <img :src="imageUrl" :alt="name" class="w-24 h-24 object-contain" />
    </div>
    <p class="capitalize font-bold text-lg">{{ name }}</p>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  id: string;
}>();

// ID untuk mendapatkan gambar dari Pokemon
const imageUrl = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
});
</script>

<style></style>
