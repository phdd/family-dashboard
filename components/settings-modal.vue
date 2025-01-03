<template>
  <ion-modal ref="modal" trigger="open-settings">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Einstellungen</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="dismiss">
            <ion-icon slot="icon-only" :icon="ioniconsCloseOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          label="Todoist-Token"
          label-placement="stacked"
          ref="input"
          type="text"
          placeholder="92bfca8..."
        ></ion-input>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts" setup>
defineProps({
  openModal: Boolean,
});

const modal = ref<HTMLElement | null>(null);
const dismiss = () => modal.value.$el.dismiss();
</script>
