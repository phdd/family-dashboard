<template>
  <ion-item :style="{ backgroundColor: color }" lines="none" class="m-3 rounded-xl">
    <ion-checkbox>
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