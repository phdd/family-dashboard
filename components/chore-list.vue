<template>
  <ion-list :style="{ backgroundColor: `rgba(var(--ion-color-${color}-rgb), .1)` }" 
    class="rounded-2xl h-full">

    <ion-list-header class="pt-2 pb-2">
      <avatar :member="member" :color="color" />
      <div class="flex flex-col w-full pr-3 gap-1">
        <div class="flex justify-between font-serif text-xl">
          <span>{{ firstName }}</span>
          <span class="pr-3 -mr-3">
            <star-rating :stars="Math.round(rating * .4)" :color="color" />
          </span>
        </div>
        <div class="flex flex-row gap-2 items-center">
          <span class="w-16">Tag</span>
          <ion-progress-bar
            :value="currentDailyGoal / dailyGoal"
            class="h-3 rounded-full" :color="color" />
          <span class="w-24">{{ currentDailyGoal }}&nbsp;von&nbsp;{{ dailyGoal }}</span>
        </div>
        <div class="flex flex-row gap-2 items-center">
          <span class="w-16">Woche</span>
          <ion-progress-bar
            :value="currentWeeklyGoal / weeklyGoal"
            class="h-3 rounded-full" :color="color" />
          <span class="w-24">{{ currentWeeklyGoal }}&nbsp;von&nbsp;{{ weeklyGoal }}</span>
        </div>
      </div>
    </ion-list-header>

    <transition-group name="list" tag="div">
      <chore-item v-for="chore in chores" :key="chore.id + chore.isCompleted"
        :color="color"
        :chore="chore" 
        @chore-closed="onChoreClosed"
        @chore-reopened="onChoreReopened" />
    </transition-group>
  </ion-list>
  <confetti v-if="showConfetti" />
</template>

<script lang="ts" setup>
import { useSound } from '@vueuse/sound';
import yay from '~/assets/sounds/yay.mp3';
import yippie from '~/assets/sounds/yippie.mp3';

const props = defineProps<{
  member: Member;
  color: string;
}>();

const { chores, closeChore, reopenChore, choresOpen } = useChores(props.member);
const { rating, currentDailyGoal, dailyGoal, currentWeeklyGoal, weeklyGoal, reloadStats } = useStats(props.member);
const yippieSound = useSound(yippie, { volume: .75 });
const yaySound = useSound(yay, { volume: .75 });

const firstName = computed(() => props.member.fullName.split(' ')[0]);
const showConfetti = ref(false);

watch(chores, () => 
  reloadStats(),{
  immediate: true
});

const congratulateMember = async () => {
  showConfetti.value = true;

  (await alertController.create({
    header: `Herzlichen Glückwunsch ${firstName.value}!`,
    message: `Du hast alle Aufgaben erledigt.`,
    buttons: ['OK']
  })).present();

  setTimeout(() => showConfetti.value = false, 10000);
};

const showErrorMessage = async () => {
  (await alertController.create({
    header: 'Ups...',
    message: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    buttons: ['OK']
  })).present();
};

const onChoreClosed = async (chore: Chore) => {
  if (choresOpen.value.length === 1) {
    yaySound.play();
    congratulateMember();
  } else {
    yippieSound.play();
  }

  try {
    await closeChore(chore);
  } catch (error) {
    console.error(error);
    showErrorMessage();
  }
};

const onChoreReopened = async (chore: Chore) => {
  try {
    await reopenChore(chore);
  } catch (error) {
    console.error(error);
    showErrorMessage();
  }
};
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.2s ease;
}
</style>