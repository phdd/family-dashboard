import { useLocalStorage } from '@vueuse/core';
import { TodoistApi, Project, User } from '@doist/todoist-api-typescript'

export const useTodoist = () => {
  const token = useLocalStorage("todoist-token", "");
  const projectId = useLocalStorage("todoist-project-id", "");
  
  const api = ref<TodoistApi>(new TodoistApi(token.value));
  const collaborators = ref<User[]>([]);

  const projects = ref<Project[]>([]);

  watchEffect(async () => {
    api.value = new TodoistApi(token.value);

    try {
      projects.value = await api.value.getProjects()
    } catch (e) {
      console.warn("Could not fetch projects", e)
      projects.value = []
    }
  });

  watchEffect(async () => {
    if (projectId.value) {
      collaborators.value = await api.value.getProjectCollaborators(projectId.value)
    } else {
      collaborators.value = []
    }
  });

  return {
    token,
    projectId,
    projects: readonly(projects),
    collaborators: readonly(collaborators),
  }
}
