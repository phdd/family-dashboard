<script setup lang="ts">
useHead({
  title: 'Aufgaben',
})

const { members } = useFamily();

const listColor = (memberColor: string) => 
  rgbaForColor(memberColor, .2);

const choreColor = (memberColor: string) => 
  rgbaForColor(memberColor, .5);
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col v-for="member in members" :key="member.name">
            <ion-list :style="{ backgroundColor: listColor(member.color) }" class="chore-list">
              <ion-list-header>
                <ion-avatar slot="start">
                  <ion-text>{{ member.name.charAt(0) }}</ion-text>
                </ion-avatar>
                <ion-label>{{ member.name }}</ion-label>
              </ion-list-header>
              <chore-item :color="choreColor(member.color)" content="Put away the dishes" />
              <chore-item :color="choreColor(member.color)" content="Take out the trash" />
              <chore-item :color="choreColor(member.color)" content="Walk the dog" />
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
