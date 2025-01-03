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
          <span class="text-gray-500">2/4</span>
        </div>
        <ion-progress-bar value="0.5" class="h-3 rounded-full" :color="color" />
      </div>
    </ion-list-header>
    
    <chore-item v-for="task in tasks" :key="task.id"
      :color="color"
      :task="task" />
  </ion-list>
</template>

<script lang="ts" setup>
import type { Task } from '@doist/todoist-api-typescript';

defineProps<{
  collaborator: Collaborator;
  tasks: Task[];
  color: string;
}>();

const showInitials = ref(false);
</script>
