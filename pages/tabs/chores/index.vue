<script setup lang="ts">
useHead({
  title: 'Aufgaben',
})

const { members } = useFamily();
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-grid class="h-full">
        <ion-row class="h-full">
          <ion-col v-for="member in members" :key="member.name">
            <chore-list :member="member" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
