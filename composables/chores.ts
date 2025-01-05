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

        // filter by @dashboard label
        .filter((task) => task.labels.includes('dashboard'));

      incompleteTasks.sort((a, b) => a.order - b.order);

      chores.value = [
        ...incompleteTasks,
        ...completedTasks
      ]

      // deduplicate tasks (may have been closed/reopened multiple times)
      .filter((task, index, self) =>
        index === self.findIndex((t) => t.content === task.content)
      );
  
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

  reloadChores();

  return {
    chores,

    closeChore,
    reopenChore,
  }
}
