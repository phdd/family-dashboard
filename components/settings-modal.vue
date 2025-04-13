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
        <!-- <ion-list-header>
          <ion-label>Todoist</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-input
            label="Filter"
            placeholder="(today | overdue) & @dashboard"
            v-model="filter" />
        </ion-item> -->
      </ion-list>
    </ion-content>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="reload">
            <ion-icon slot="icon-only" :icon="ioniconsReloadOutline" />
          </ion-button>
          <ion-button @click="exportLocalStorage">
            <ion-icon slot="icon-only" :icon="ioniconsCloudDownloadOutline" />
          </ion-button>
          <ion-button @click="importLocalStorage">
            <ion-icon slot="icon-only" :icon="ioniconsCloudUploadOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer> 
  </ion-modal>
</template>

<script lang="ts" setup>
const { name, members } = useFamily();

const dismiss = modalController.dismiss;
const reload = () => window.location.reload();

const addMember = async (token: string) => {
  try {
    const user = await fetchTodoistUser(token);
    user.todoistToken = token;
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

const exportLocalStorage = () => {
  const data = JSON.stringify(localStorage);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'family-dashboard.json';
  a.click();
  URL.revokeObjectURL(url);
};

const importLocalStorage = async () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    
    if (file) {
      const text = await file.text();
      const data = JSON.parse(text);
      
      for (const key in data) {
        localStorage.setItem(key, data[key]);
      }

      window.location.reload();
    }
  };
  input.click();
};
</script>
