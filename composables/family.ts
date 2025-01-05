import { useLocalStorage } from '@vueuse/core';

// jede chore list entspricht einen family member
// jedes member brauch eigenes token 
// jede chore-list muss separat abgefragt werden, weil die Task-IDs verschieden sind
// todoist filter pro member zB: #Dashboard & assigned to me & (today | overdue)
export const useFamily = () => {
  const name = useLocalStorage<string>('family/name', 'Muster');
  const members = useLocalStorage<Member[]>('family/members', []);

  return {
    name,
    members
  };
}
