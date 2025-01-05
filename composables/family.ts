import { useLocalStorage } from '@vueuse/core';

// todoist filter pro member zB: #Dashboard & assigned to me & (today | overdue)
export const useFamily = () => {
  const name = useLocalStorage<string>('family/name', 'Muster');
  const members = useLocalStorage<Member[]>('family/members', []);

  return {
    name,
    members
  };
}
