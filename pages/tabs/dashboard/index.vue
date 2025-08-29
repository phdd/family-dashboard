<script setup lang="ts">
import { routerKey } from 'vue-router';

definePageMeta({
  alias: ['/', '/tabs'],
})
useHead({
  title: 'Übersicht',
})
</script>

<template>
  <ion-page>
    <ion-content>
      <router-link to="/tabs/chores">
        <ion-button expand="block" fill="clear" size="large">zum den Aufgaben</ion-button>
      </router-link>
    </ion-content>
  </ion-page>
</template>