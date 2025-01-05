<template>
  <ion-item
    lines="none" class="m-3 rounded-2xl"
    :style="{ 
      backgroundColor: `rgba(var(--ion-color-${color}-rgb), ${alpha})`
    }">

    <ion-checkbox :color="color" v-model="isCompleted">
      <ion-label :style="{
        opacity: isCompleted ? .6 : 1,
        fontSize: '110%'
      }">{{ chore.content }}</ion-label>
      <ion-note>{{ chore.description }}</ion-note>
    </ion-checkbox>
  </ion-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  chore: Chore;
  color: string;
  member: Member;
}>();

const { closeChore, reopenChore } = useChores(props.member);

const isCompleted = ref(props.chore.isCompleted);
const alpha = computed(() => isCompleted.value ? .2 : .6);

const handleClosedChore = () => {
  console.log('Confetti 🥳');
};

watch(isCompleted, async (value) => {
  try {
    if (value) {
      await closeChore(props.chore);
      handleClosedChore();
    } else {
      reopenChore(props.chore);
    }
  } catch (error) {
    console.error(error);
    (await alertController.create({
      header: 'Ups...',
      message: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
      buttons: ['OK']
    })).present();
  }
});
</script>

<style>
ion-item::part(native) {
  background: transparent;
}

ion-checkbox {
  --size: 2rem;
  --border-width: 0px;
  --checkmark-width: 4px;
  --border-radius: 100px;
  
  --checkmark-color: white;
  --border-color: rgba(255, 255, 255, .8);
  --checkbox-background: white;
  --checkbox-background-checked: transparent;
}
</style>