<script setup lang="ts">
useHead({
  title: 'Aufgaben',
})

const { members } = useFamily();

const listColor = (memberColor: string) => 
  rgbaForColor(memberColor, .3);

const choreColor = (memberColor: string) => 
  rgbaForColor(memberColor, .6);
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col v-for="member in members" :key="member.name">
            <ion-list :style="{ backgroundColor: listColor(member.color) }" class="rounded-xl">

              <ion-list-header>
                <ion-avatar class="w-20 h-20 pt-1.5 mr-4">
                  <img :src="member.avatar" alt="Member Avatar" />
                </ion-avatar>
                <div class="flex flex-col w-full pr-3 pb-2 gap-3">
                  <div class="flex justify-between font-serif text-2xl">
                    <span>{{ member.name }}</span>
                    <span class="text-gray-500">2/4</span>
                  </div>
                  <ion-progress-bar value="0.5" class="h-4 rounded-full" />
                </div>
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
