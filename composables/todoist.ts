import { useLocalStorage } from '@vueuse/core';
import { TodoistApi, Project, User, Task as TodoistTask } from '@doist/todoist-api-typescript'

export type Collaborator = User & {
  avatar: string;
};

export type Task = TodoistTask;

export const useTodoist = () => {
  const token = useLocalStorage("todoist-token", "");
  const projectId = useLocalStorage("todoist-project-id", "");
  
  const api = ref<TodoistApi>(new TodoistApi(token.value));
  const collaborators = ref<Collaborator[]>([]);
  const projects = ref<Project[]>([]);
  const tasks = ref<Task[]>([]);

  const reload = async () => {
    try {
      tasks.value = await api.value
        .getTasks({ projectId: projectId.value });

      collaborators.value = (await api.value
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
  }

  watchEffect(async () => {
    api.value = new TodoistApi(token.value);

    try {
      projects.value = await api.value.getProjects()
    } catch (e) {
      console.warn("Could not fetch projects", e)
      projects.value = []
    }
  });

  watchEffect(() => {
    if (projectId.value) {
      reload();
    }
  });

  return {
    token,
    projectId,

    projects,
    collaborators,
    tasks,

    reload
  }
}
