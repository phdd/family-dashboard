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
        placeholder="92bfca8..."
        v-model="token"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-select label="Aufgaben" placeholder="Projekt XY" v-model="projectId">
          <ion-select-option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="reload">
            <ion-icon slot="icon-only" :icon="ioniconsReloadOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-modal>
</template>

<script lang="ts" setup>
const modal = ref<any>(null);
const dismiss = () => modal.value?.$el.dismiss();

const { token, projects, projectId } = useTodoist();
const reload = () => {
  window.location.reload();
};
</script>
