type FamilyMember = {
  name: string;
}

export const useFamily = () => {
  const members = ref<FamilyMember[]>([
    { name: 'Mama' },
    { name: 'Papa' },
    { name: 'Antonia' },
    { name: 'Nora' },
  ])

  return {
    members: readonly(members),
    name: "Familie Heisig",
  }
}
