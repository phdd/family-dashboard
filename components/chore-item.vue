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
  --border-radius: 1rem;
  --border-width: 0;
  --checkbox-background: transparent;
  --checkbox-background-checked: transparent;
}
</style>