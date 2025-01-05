<script setup lang="ts">
useHead({
  title: 'Aufgaben',
})

const { members } = useFamily()
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-grid class="h-full pt-0">
        <ion-row class="h-full">
          <ion-col v-for="(member, index) in members" :key="member.id">
            <chore-list :member="member"
                        :color="`member-${index + 1}`" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
