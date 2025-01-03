<template>
  <ion-list :style="{ backgroundColor: `rgba(var(--ion-color-${color}-rgb), .2)` }" class="rounded-2xl h-full">
    <ion-list-header>
      <ion-avatar class="w-16 h-16 pt-1.5 mr-4">
        <ion-img v-if="!showInitials" :src="collaborator.avatar" alt="collaborator Avatar" @ionError="showInitials = true" />
        <div v-else class="flex items-center justify-center w-full h-full rounded-full text-3xl text-white" :style="{ backgroundColor: `var(--ion-color-${color})` }">
          {{ collaborator.name.charAt(0) }}
        </div>
      </ion-avatar>
      <div class="flex flex-col w-full pr-5 gap-2">
        <div class="flex justify-between font-serif text-2xl">
          <span>{{ collaborator.name }}</span>
          <span class="text-gray-500">
            {{ tasks.filter(task => task.isCompleted).length }}/{{ tasks.length }}
          </span>
        </div>
        <ion-progress-bar :value="taskDoneRatio" class="h-3 rounded-full" :color="color" />
      </div>
    </ion-list-header>

    <transition-group name="list" tag="div">
      <chore-item v-for="task in tasks" :key="task.id"
        :color="color"
        :task="task" />
    </transition-group>
  </ion-list>
</template>

<script lang="ts" setup>
import type { Task } from '@doist/todoist-api-typescript';

const props = defineProps<{
  collaborator: Collaborator;
  tasks: Task[];
  color: string;
}>();

const showInitials = ref(false);
const taskDoneRatio = computed(() =>
  props.tasks.filter(task => task.isCompleted).length / props.tasks.length);
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.2s ease;
}
</style>