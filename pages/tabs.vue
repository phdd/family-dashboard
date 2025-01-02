<script lang="ts" setup>
const { name } = useFamily();

const currentTime = ref("");

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
  }, 1000);
});
</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button class="btn-time">{{ currentTime }}</ion-button>
        </ion-buttons>
        <ion-title class="font-serif text-3xl">{{ name }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-tabs>

        <ion-router-outlet />

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="dashboard" href="/tabs/dashboard" disabled>
            <ion-icon :icon="ioniconsHomeOutline" />
            <ion-label>Übersicht</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="chores" href="/tabs/chores">
            <ion-icon :icon="ioniconsCheckboxOutline" />
            <ion-label>Aufgaben</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="calendar" href="/tabs/calendar" disabled>
            <ion-icon :icon="ioniconsCalendarNumberOutline" />
            <ion-label>Kalender</ion-label>
          </ion-tab-button>

        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.btn-time {
  padding-inline: 10px;
}
</style>