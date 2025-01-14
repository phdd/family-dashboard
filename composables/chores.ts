import { TodoistApi } from '@doist/todoist-api-typescript';

export const useChores = (member: Member) => {
  const api = new TodoistApi(member.todoistToken);
  const date = ref<Date>(new Date());
  const chores = ref<Chore[]>([]);

  const reloadChores = async () => {
    try {
      // FIXME: completed tasks are not time bound...
      const incompleteTasks = (await api.getTasks({
        filter: `(due before: +2 hours | (today & no time) | overdue)`
              + ` & @dashboard & assigned to: me` }));

      const completedTasks =  (await fetchCompletedTodoistTasks(
        member.todoistToken, date.value.toISOString().split('T')[0]))
        
        // filter tasks that are already in incompleteTasks
        .filter((task) => !incompleteTasks.some((t) => t.id === task.id))

        // filter by @dashboard label
        .filter((task) => task.labels.includes('dashboard'))
        
        // deduplicate tasks
        .filter((task, index, self) => self.findIndex(t => t.id === task.id) === index)

      completedTasks.sort((a, b) => a.order - b.order);

      incompleteTasks.sort((a, b) => {
        if (a.due?.datetime && !b.due?.datetime) return -1;
        if (!a.due?.datetime && b.due?.datetime) return 1;
        return a.order - b.order;
      });

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
  setInterval(reloadChores, 60000);

  return {
    chores,

    closeChore,
    reopenChore,

    choresClosed,
    choresOpen
  }
}
