<script setup lang="ts">
useHead({
  title: 'Aufgaben',
})

// const { collaborators, tasks } = useTodoist();
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-grid class="h-full pt-0">
        <ion-row class="h-full">
          <!-- <ion-col v-for="(collaborator, index) in collaborators" :key="index">
            <chore-list :collaborator="collaborator"
                        :tasks="tasks.filter(task => task.assigneeId === collaborator.id)"
                        :color="`collaborator-${index + 1}`" />
          </ion-col> -->
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
