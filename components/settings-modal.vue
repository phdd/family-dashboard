<template>
  <ion-modal trigger="open-settings">
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
      <ion-list>
        <ion-item lines="full">
          <ion-input
            label="Familienname"
            placeholder="Muster"
            v-model="name" />
        </ion-item>
        <ion-list-header>
          <ion-label>Mitglieder</ion-label>
          <ion-button @click="askForToken">
            <ion-icon slot="icon-only" :icon="ioniconsAddOutline" />
          </ion-button>
        </ion-list-header>
        <ion-item v-for="member in members" :key="member">
          <ion-label>{{ member.fullName }}</ion-label>
          <ion-button @click="removeMember(member)" slot="end" fill="clear">
            <ion-icon slot="icon-only" :icon="ioniconsRemoveOutline" />
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-footer class="ion-no-border">
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
const { name, members } = useFamily();

const dismiss = modalController.dismiss;
const reload = window.location.reload;

const addMember = async (token: string) => {
  try {
    const user = await fetchTodoistUser(token);
    members.value.push(user);
  } catch (error) {
    (await alertController.create({
      header: 'Fehler',
      message: 'Das Token ist ungültig.',
      buttons: ['OK'],
    })).present();
  }
};

const removeMember = (member: User) => {
  members.value = members.value.filter(m => m !== member);
};

const askForToken = async () => {
  (await alertController.create({
    header: 'Mitglied hinzufügen',
    message: 'Bitte gib das Todoist API-Token ein. Dieses findest du in Einstellungen > Integrationen > Developer.',
    inputs: [{ name: 'token', type: 'text', placeholder: 'Todoist API-Token' }],
    buttons: [
      { text: 'Abbrechen', role: 'cancel' },
      { text: 'Hinzufügen', role: 'submit',
        handler: ({ token }: { token: string }) =>
          addMember(token) },
    ],
  })).present();
};
</script>
