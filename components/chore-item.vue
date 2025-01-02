<template>
  <ion-item :style="{ backgroundColor: color }" lines="none">
    <ion-label>{{ props.content }}</ion-label>
  </ion-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  content: string;
  color: string;
}>();
</script>

<style>
  ion-item::part(native) {
    background: transparent;
  }

  ion-item {
    border-radius: 10px;
    margin: 10px;
  }
</style>