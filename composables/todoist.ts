import { useLocalStorage } from '@vueuse/core';
import { TodoistApi, Project, User, Task as TodoistTask } from '@doist/todoist-api-typescript'

export type Collaborator = User & {
  avatar: string;
};

export type Task = Pick<TodoistTask, "assigneeId" | "content" | "id" | "projectId" | "description" | "isCompleted">;

const token = useLocalStorage("todoist-token", "");
const projectId = useLocalStorage("todoist-project-id", "");

let api = new TodoistApi(token.value);

const collaborators = ref<Collaborator[]>([]);
const projects = ref<Project[]>([]);
const tasks = ref<Task[]>([]);
const selectedDate = ref(new Date().toISOString().split('T')[0]);

const fetchCompletedTasks = async (token: string, projectId: string) => {
  const baseUrl = "https://api.todoist.com/sync/v9/completed/get_all";
  const since = selectedDate.value + 'T00:00:00';

  const response = await fetch(`${baseUrl}?project_id=${projectId}&since=${since}&annotate_items=true`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch completed tasks');
  }

  const data = await response.json();

  return data.items.map((item: any) => ({
    id: item.item_object.id,
    content: item.item_object.content,
    assigneeId: item.item_object.assigned_by_uid,
    projectId: item.item_object.project_id,
    description: item.item_object.description,
    isCompleted: true
  }) as Task);
}

const reloadTasks = async () => {
  try {
    let t = (await api
      .getTasks({ filter: selectedDate.value }))
      .filter((task) => task.projectId === projectId.value);

    t.sort((a, b) => a.order - b.order);

    t = [
      ...t,
      ...await fetchCompletedTasks(token.value, projectId.value)
    ]

    t = t.filter((task, index, self) =>
      index === self.findIndex((t) => t.content === task.content)
    );

    tasks.value = t;

  } catch (e) {
    console.warn("Could not reload tasks", e)
    tasks.value = [];
  }
};

const reloadCollaborators = async () => {
  try {
    collaborators.value = (await api
      .getProjectCollaborators(projectId.value))
      .map(user => ({
        ...user,
        name: user.name.split(' ')[0],
        avatar: `/avatar/${user.id}.png`
      }));

  } catch (e) {
    console.warn("Could not reload", e)
    collaborators.value = [];
    tasks.value = [];
  }
};

const closeTask = async (task: Task) => {
  task.isCompleted = true;
  tasks.value = tasks.value.map(t => t.id === task.id ? task : t);

  const assigneeToken = localStorage.getItem(`todoist-token-${task.assigneeId}`);

  if (assigneeToken) {
    const assigneeApi = new TodoistApi(assigneeToken);
    await assigneeApi.closeTask(task.id);
  } else {
    await api.closeTask(task.id);
  }

  await reloadTasks();
};

const reopenTask = async (task: Task) => {
  task.isCompleted = false;
  tasks.value = tasks.value.map(t => t.id === task.id ? task : t);

  await api.reopenTask(task.id);
  await reloadTasks();
};

watchEffect(async () => {
  api = new TodoistApi(token.value);

  try {
    projects.value = await api.getProjects()
  } catch (e) {
    console.warn("Could not fetch projects", e)
    projects.value = []
  }
});

watchEffect(() => {
  if (projectId.value) {
    reloadCollaborators();
    reloadTasks();
  }
});

export const useTodoist = () => {
  return {
    token,
    projectId,

    projects: readonly(projects),
    collaborators: readonly(collaborators),
    tasks: readonly(tasks),

    closeTask,
    reopenTask,
  }
}
