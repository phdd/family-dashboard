<template>
  <ion-list :style="{ backgroundColor: `rgba(var(--ion-color-${color}-rgb), .2)` }" class="rounded-2xl h-full">
    <ion-list-header>
      <ion-avatar class="w-20 h-20 pt-1.5 mr-4">
        <img :src="member.avatar" alt="Member Avatar" />
      </ion-avatar>
      <div class="flex flex-col w-full pr-5 pb-2 gap-3">
        <div class="flex justify-between font-serif text-2xl">
          <span>{{ member.name }}</span>
          <span class="text-gray-500">2/4</span>
        </div>
        <ion-progress-bar value="0.5" class="h-4 rounded-full" :color="color" />
      </div>
    </ion-list-header>
    
    <chore-item :color="color" content="Put away the dishes" />
    <chore-item :color="color" content="Take out the trash" />
    <chore-item :color="color" content="Walk the dog" />
  </ion-list>
</template>

<script lang="ts" setup>
defineProps<{
  member: FamilyMember;
  color: string;
}>();
</script>
