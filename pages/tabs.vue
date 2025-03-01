<script lang="ts" setup>
const family = useFamily();

const currentTime = ref("");

const refreshTime = () => {
  currentTime.value = new Date().toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  refreshTime();
  setInterval(() => {
    refreshTime();
  }, 10000);
});
</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button class="pr-2" size="large">{{ currentTime }}</ion-button>
        </ion-buttons>
        <ion-title class="font-serif text-3xl">Familie {{ family.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-tabs>
        <ion-router-outlet />

        <ion-tab-bar slot="bottom" class="bg-slate-200 flex">
          <ion-tab-button tab="dashboard" href="/tabs/dashboard" layout="label-hide" disabled>
            <ion-icon :icon="ioniconsHomeOutline" />
            <ion-label>Übersicht</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="mandala" href="/tabs/mandala" layout="label-hide">
            <ion-icon :icon="ioniconsColorPaletteOutline" />
            <ion-label>Mandala</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="chores" href="/tabs/chores" layout="label-hide">
            <ion-icon :icon="ioniconsCheckboxOutline" />
            <ion-label>Aufgaben</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="calendar" href="/tabs/calendar" layout="label-hide" disabled>
            <ion-icon :icon="ioniconsCalendarNumberOutline" />
            <ion-label>Kalender</ion-label>
          </ion-tab-button>

          <div class="flex-1 text-end opacity-50">
            <ion-button id="open-settings" fill="clear" size="large" color="dark">
              <ion-icon :icon="ioniconsSettingsOutline" />
            </ion-button>
          </div>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
    <settings-modal />
  </ion-page>
</template>
