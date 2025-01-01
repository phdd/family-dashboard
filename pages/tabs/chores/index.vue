<script setup lang="ts">
useHead({
  title: 'Aufgaben',
})

const { members } = useFamily();
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col v-for="member in members" :key="member.name">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ member.name }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <!-- <ion-button>Erledigt</ion-button> -->
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>