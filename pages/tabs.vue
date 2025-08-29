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

  const scriptId = 'weatherwidget-io-js';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    document.body.appendChild(script);
  }
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

        <ion-tab-bar slot="bottom" class="flex" style="height: 100px;">
          <!-- <ion-tab-button tab="dashboard" href="/tabs/dashboard" layout="label-hide" disabled>
            <ion-icon :icon="ioniconsHomeOutline" />
            <ion-label>Übersicht</ion-label>
          </ion-tab-button> -->

          <!-- <ion-tab-button tab="mandala" href="/tabs/mandala" layout="label-hide">
            <ion-icon :icon="ioniconsColorPaletteOutline" />
            <ion-label>Mandala</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="chores" href="/tabs/chores" layout="label-hide">
            <ion-icon :icon="ioniconsCheckboxOutline" />
            <ion-label>Aufgaben</ion-label>
          </ion-tab-button> -->
          
          <!-- <ion-tab-button tab="calendar" href="/tabs/calendar" layout="label-hide" disabled>
            <ion-icon :icon="ioniconsCalendarNumberOutline" />
            <ion-label>Kalender</ion-label>
          </ion-tab-button> -->
          
          <div class="flex-1">
            <a class="weatherwidget-io" href="https://forecast7.com/de/51d1113d91/radeberg/" data-label_1="Radeberg" data-label_2="Wetter" data-font="Roboto" data-icons="Climacons Animated" data-theme="pure">Radeberg Wetter</a>
          </div>

          <div class="text-end w-24 mr-6 opacity-50">
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
