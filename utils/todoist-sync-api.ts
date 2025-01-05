export const fetchTodoistUser = async (token: string): Promise<User> => {
  const response = await fetch(`https://api.todoist.com/sync/v9/sync`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      sync_token: "*",
      resource_types: JSON.stringify(["user"]),
    }),
  });

  if (response.ok) {
    const data = await response.json();

    if (data.user) {
      return {
        id: data.user.id,
        fullName: data.user.full_name,
        avatarUrl: data.user.avatar_big,
      } as User;
    }
  }

  throw new Error(`Failed to fetch user`);
};

export const fetchCompletedTodoistTasks = async (token: string, date: string): Promise<Task[]> => {
  const baseUrl = "https://api.todoist.com/sync/v9/completed/get_all";
  const response = await fetch(`${baseUrl}?&since=${date}T00:00:00&until=${date}T23:59:59&annotate_items=true`, {
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
    projectId: item.item_object.project_id,
    description: item.item_object.description,
    isCompleted: true,
    createdAt: item.item_object.added_at,
    order: item.item_object.child_order,
    labels: item.item_object.labels,
  }) as Task);
}