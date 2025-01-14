<template>
  <ion-list :style="{ backgroundColor: `rgba(var(--ion-color-${color}-rgb), .1)` }" 
    class="rounded-2xl h-full">

    <ion-list-header class="pt-2 pb-2">
      <avatar :member="member" :color="color" />
      <div class="flex flex-col w-full pr-3 gap-2">
        <div class="flex justify-between font-serif text-2xl">
          <span>{{ firstName }}</span>
          <span class="text-gray-500 pr-3">
            <template v-if="choresOpen.length === 0">
              alles erledigt 🎉
            </template>
            <template v-else-if="choresClosed.length === 0">
              los geht's!
            </template>
            <template v-else>
              {{ choresClosed.length }} von {{ chores.length }}
            </template>
          </span>
        </div>
        <ion-progress-bar :value="choresClosed.length / chores.length"
          class="h-3 rounded-full" :color="color" />
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

const { chores, closeChore, reopenChore, choresClosed, choresOpen } = useChores(props.member);
const yippieSound = useSound(yippie, { volume: .75 });
const yaySound = useSound(yay, { volume: .75 });

const firstName = computed(() => props.member.fullName.split(' ')[0]);
const showConfetti = ref(false);

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