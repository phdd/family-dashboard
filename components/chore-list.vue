<template>
  <ion-list :style="{ backgroundColor: `rgba(var(--ion-color-${color}-rgb), .1)` }" class="rounded-2xl h-full">
    <ion-list-header class="pt-2" @click="openCollaboratorModal">
      <avatar :member="member" :color="color" />
      <div class="flex flex-col w-full pr-3 gap-2">
        <div class="flex justify-between font-serif text-2xl">
          <span>{{ firstName }}</span>
          <span class="text-gray-500 pr-3">
            <!-- {{ tasks.filter(task => task.isCompleted).length }}/{{ tasks.length }} -->
          </span>
        </div>
        <ion-progress-bar :value="taskDoneRatio" class="h-3 rounded-full" :color="color" />
      </div>
    </ion-list-header>

    <!-- <transition-group name="list" tag="div">
      <chore-item v-for="task in tasks" :key="task.id"
        :color="color"
        :task="task" />
    </transition-group> -->
  </ion-list>
</template>

<script lang="ts" setup>
import CollaboratorModal from './collaborator-modal.vue';

const props = defineProps<{
  member: Member;
  color: string;
}>();

const taskDoneRatio = computed(() => 0);
  // props.tasks.filter(task => task.isCompleted).length / props.tasks.length);

const firstName = computed(() => props.member.fullName.split(' ')[0]);

const openCollaboratorModal = async () => {
  console.log('openCollaboratorModal NIY');
  // (await modalController.create({
  //   component: CollaboratorModal,
  //   componentProps: {
  //     collaborator: props.collaborator,
  //     color: props.color,
  //   },
  // })).present();
};
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