<script lang="ts" setup>
// import '@ionic/vue/css/palettes/dark.always.css';
const { $pwa } = useNuxtApp()

watchEffect(() => {
  if ($pwa?.needRefresh) {
    $pwa.updateServiceWorker();
  }
});
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLoadingIndicator />
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
