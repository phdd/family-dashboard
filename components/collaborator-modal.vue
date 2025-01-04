<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <ion-buttons slot="start" class="ps-3">
        <avatar :collaborator="collaborator" :color="color" size="small" />
      </ion-buttons>
      <ion-title class="-ml-4">{{ collaborator.name }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismiss">
          <ion-icon slot="icon-only" :icon="ioniconsCloseOutline" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content v-if="tab === 'settings'" class="ion-padding">
    <ion-item>
      <ion-input
        label="Todoist-Token"
        placeholder="92bfca8..."
        v-model="token" />
    </ion-item>
  </ion-content>
  <ion-content v-else-if="tab === 'details'" class="ion-padding">
    <!-- TODO -->
  </ion-content>
  <ion-footer class="ion-no-border">
    <ion-toolbar>
      <ion-segment v-model="tab" class="-mb-0.5">
        <ion-segment-button value="details" layout="icon-start" disabled>
          <ion-icon :icon="ioniconsInformationCircleOutline" />
          <ion-label>Details</ion-label>
        </ion-segment-button>
        <ion-segment-button value="settings" layout="icon-start">
          <ion-icon :icon="ioniconsSettingsOutline" />
          <ion-label>Einstellungen</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core';

const props = defineProps<{
  collaborator: Collaborator;
  color: string;
}>();

const token = useLocalStorage(`todoist-token-${props.collaborator.id}`, '');
const tab = ref('settings');

const dismiss = () => modalController.dismiss();
</script>
