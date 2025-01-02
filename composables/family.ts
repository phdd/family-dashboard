export type FamilyMember = {
  name: string;
  avatar: string;
}

export const useFamily = () => {
  const members = ref<FamilyMember[]>([
    { name: 'Papa', avatar: 'https://gravatar.com/avatar/f01b51ac29bc6f06e4b6d5b45e279306?s=200' },
    { name: 'Mama', avatar: 'https://gravatar.com/avatar/f01b51ac29bc6f06e4b6d5b45e279307?s=200' },
    { name: 'Antonia', avatar: 'https://gravatar.com/avatar/f01b51ac29bc6f06e4b6d5b45e279308?s=200' },
    { name: 'Nora', avatar: 'https://gravatar.com/avatar/f01b51ac29bc6f06e4b6d5b45e279309?s=200' },
  ])

  return {
    members: readonly(members),
    name: "Familie Heisig",
  }
}
