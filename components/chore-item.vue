<template>
  <ion-item
    lines="none" class="m-3 rounded-2xl"
    :style="{ 
      backgroundColor: `rgba(var(--ion-color-${color}-rgb), ${alpha})`
    }">

    <ion-checkbox :color="color" v-model="isCompleted"
      :disabled="isCompleted"><!-- difficult to handle -->

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
}>();

const emit = defineEmits<{
  (e: 'choreClosed', chore: Chore): void;
  (e: 'choreReopened', chore: Chore): void;
}>();

const isCompleted = ref(props.chore.isCompleted);
const alpha = computed(() => isCompleted.value ? .2 : .6);

watch(isCompleted, async (value) => {
  if (value) {
    emit('choreClosed', props.chore);
  } else {
    emit('choreReopened', props.chore);
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