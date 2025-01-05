<template>
  <ion-avatar :class="`${size} mr-3`">
    <ion-img v-if="!showInitials" :class="size" :src="member.avatarUrl" alt="collaborator Avatar" @ionError="showInitials = true" />
    <div v-else :class="`${size} flex items-center justify-center rounded-full text-3xl text-white`" :style="{ backgroundColor: `var(--ion-color-${color})` }">
      {{ member.fullName.charAt(0) }}
    </div>
  </ion-avatar>
</template>

<script lang="ts" setup>
const props = defineProps<{
  member: Member;
  color: string;
  size?: 'small' | 'medium' | 'large';
}>();

const showInitials = ref(!props.member.avatarUrl);
const size = computed(() => ({
  small: 'w-10 h-10',
  medium: 'w-16 h-16',
  large: 'w-24 h-24',
})[props.size ?? 'medium']);
</script>
