import { TodoistApi } from '@doist/todoist-api-typescript';

export const useChores = (member: Member) => {
  const api = new TodoistApi(member.todoistToken);
  const date = ref<Date>(new Date());
  const chores = ref<Chore[]>([]);

  const reloadChores = async () => {
    try {
      const incompleteTasks = (await api
        .getTasks({ filter: '(today | overdue) & @dashboard & assigned to: me' }));

      const completedTasks =  (await fetchCompletedTodoistTasks(
        member.todoistToken, date.value.toISOString().split('T')[0]))
        
        // filter tasks that are already in incompleteTasks
        .filter((task) => !incompleteTasks.some((t) => t.id === task.id))

        // filter by @dashboard label
        .filter((task) => task.labels.includes('dashboard'))
        
        // deduplicate tasks
        .filter((task, index, self) => self.findIndex(t => t.id === task.id) === index)

      incompleteTasks.sort((a, b) => a.order - b.order);

      chores.value = [
        ...incompleteTasks,
        ...completedTasks
      ]

    } catch (e) {
      console.warn("Could not reload chores", e)
      chores.value = [];
    }
  };

  const updateChore = async (chore: Chore) => {
    chores.value = chores.value.map(t => t.id === chore.id ? chore : t);
  }

  const closeChore = async (chore: Chore) => {
    chore.isCompleted = true;
    updateChore(chore);
  
    try {
      await api.closeTask(chore.id);
    } catch (e) {
      chore.isCompleted = false;
      updateChore(chore);
      throw new Error("Could not close chore");
    } finally {
      reloadChores();
    }
  };

  const reopenChore = async (chore: Chore) => {
    chore.isCompleted = false;
    updateChore(chore);
  
    try {
      await api.reopenTask(chore.id);
    } catch (e) {
      chore.isCompleted = true;
      updateChore(chore);
      throw new Error("Could not reopen chore");
    } finally {
      reloadChores();
    }
  }

  const choresClosed = computed(() => chores.value.filter(chore => chore.isCompleted));
  const choresOpen = computed(() => chores.value.filter(chore => !chore.isCompleted));

  reloadChores();
  setInterval(reloadChores, 300000); // reload every 5 minutes

  return {
    chores,

    closeChore,
    reopenChore,

    choresClosed,
    choresOpen
  }
}
