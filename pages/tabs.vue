<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet />
        
        <ion-tab-bar slot="top">
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
