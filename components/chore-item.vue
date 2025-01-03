<template>
  <ion-item
    lines="none" class="m-3 rounded-xl"
    :style="{ 
      backgroundColor: `rgba(var(--ion-color-${color}-rgb), ${alpha})`
    }">

    <ion-checkbox :color="color" v-model="isCompleted">
      <ion-label>{{ props.task.content }}</ion-label>
      <ion-note>{{ props.task.description }}</ion-note>
    </ion-checkbox>
  </ion-item>
</template>

<script lang="ts" setup>
const { closeTask, reopenTask } = useTodoist();

const props = defineProps<{
  task: Task;
  color: string;
}>();

const isCompleted = ref(props.task.isCompleted);
const alpha = computed(() => isCompleted.value ? .2 : 1);

watch(isCompleted, (value) => {
  if (value) {
    closeTask(props.task);
  } else {
    reopenTask(props.task);
  }
});
</script>

<style>
ion-item::part(native) {
  background: transparent;
}

ion-checkbox {
  --size: 2rem;
  --border-width: 5px;
  --border-radius: 1rem;
  --checkmark-width: 4px;
  
  --checkmark-color: white;
  --border-color: rgba(255, 255, 255, .8);
  --checkbox-background: white;
  --border-color-checked: var(--ion-color-success);
  --checkbox-background-checked: var(--ion-color-success);
}
</style>