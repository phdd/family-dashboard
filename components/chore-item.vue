<template>
  <ion-item :style="{ backgroundColor: `rgba(var(--ion-color-${color}-rgb), .3)` }" lines="none" class="m-3 rounded-xl">
    <ion-checkbox :color="color">
      <ion-label>{{ props.content }}</ion-label>  
    </ion-checkbox>
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
</style>