<template>
  <ion-item
    lines="none" class="m-3 rounded-xl"
    :style="{ 
      backgroundColor: `rgba(var(--ion-color-${color}-rgb), .3)`
    }">

    <ion-checkbox :color="color">
      <ion-label>{{ props.task.content }}</ion-label>
      <ion-note>{{ props.task.description }}</ion-note>
    </ion-checkbox>
  </ion-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  task: Task;
  color: string;
}>();
</script>

<style>
  ion-item::part(native) {
    background: transparent;
  }
</style>