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

const fetchCompletedTasks = async (token: string, projectId: string) => {
  const response = await fetch(`https://api.todoist.com/sync/v9/archive/items?project_id=${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch completed tasks');
  }

  const data = await response.json();

  return data.items.map((item: any) => ({
    id: item.id,
    content: item.content,
    assigneeId: item.assigned_by_uid,
    projectId: item.project_id,
    description: item.description,
    isCompleted: true
  }) as Task);
}

const reloadTasks = async () => {
  try {
    let t = (await api
      .getTasks({ filter: "today" }))
      .filter((task) => task.projectId === projectId.value);

    t.sort((a, b) => a.order - b.order);

    tasks.value = [
      ...t,
      ...await fetchCompletedTasks(token.value, projectId.value)
    ]

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
  await api.closeTask(task.id);
  await reloadTasks();
};

const reopenTask = async (task: Task) => {
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
