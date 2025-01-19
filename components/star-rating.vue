<template>
  <div class="flex">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="block h-5 w-5" :class="{ 'mr-1': i < stars }"
      :style="{
        color: `rgba(var(--ion-color-${color}-rgb), 1)`
      }"
      fill="currentColor" viewBox="0 0 20 20"
      v-for="i in stars" :key="i">
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  stars: number;
  color: string;
}>();
</script>
