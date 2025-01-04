<template>
  <ion-item
    lines="none" class="m-3 rounded-2xl"
    :style="{ 
      backgroundColor: `rgba(var(--ion-color-${color}-rgb), ${alpha})`
    }">

    <ion-checkbox :color="color" v-model="isCompleted" :disabled="assigneeToken === '' || isCompleted">
      <ion-label :style="{
        opacity: isCompleted ? .6 : 1,
        fontSize: '110%'
      }">{{ props.task.content }}</ion-label>
      <ion-note>{{ props.task.description }}</ion-note>
    </ion-checkbox>
  </ion-item>
</template>

<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core';

const props = defineProps<{
  task: Task;
  color: string;
}>();

const { closeTask, reopenTask } = useTodoist();
const assigneeToken = useLocalStorage(`todoist-token-${props.task.assigneeId}`, '');

const isCompleted = ref(props.task.isCompleted);
const alpha = computed(() => isCompleted.value ? .2 : .6);

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
  --border-width: 0px;
  --checkmark-width: 4px;
  --border-radius: 100px;
  
  --checkmark-color: white;
  --border-color: rgba(255, 255, 255, .8);
  --checkbox-background: white;
  --checkbox-background-checked: transparent;
}
</style>