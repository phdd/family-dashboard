import { colorForString } from '~/utils/colors';

type FamilyMember = {
  name: string;
  color: string;
}

export const useFamily = () => {
  const members = ref<FamilyMember[]>([
    { name: 'Mama', color: colorForString('Mama') },
    { name: 'Papa', color: colorForString('Papa') },
    { name: 'Antonia', color: colorForString('Antonia') },
    { name: 'Nora', color: colorForString('Nora') },
  ])

  return {
    members: readonly(members),
    name: "Familie Heisig",
  }
}
