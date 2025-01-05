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
