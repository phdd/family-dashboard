async function sync(token: string, resourceTypes: string[] = ["user"]): Promise<Response> {
  return await fetch(`https://api.todoist.com/sync/v9/sync`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      sync_token: "*",
      resource_types: JSON.stringify(resourceTypes)
    }),
  });
}



export const fetchTodoistUser = async (token: string): Promise<User> => {
  const response = await sync(token);

  if (response.ok) {
    const data = await response.json();

    if (data.user) {
      return {
        id: data.user.id,
        fullName: data.user.full_name,
        avatarUrl: data.user.avatar_big
      } as User;
    }
  }

  throw new Error(`Failed to fetch user`);
};

export const fetchTodoistWebsocketUrl = async (token: string): Promise<string> => {
  const response = await sync(token);

  if (response.ok) {
    const data = await response.json();

    if (data.user) {
      return data.user.websocket_url;
    }
  }

  throw new Error(`Failed to fetch websocket url`);
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
    due: item.item_object.due,
  }) as Task);
};

export type TodoistProductivityStats = {
  karma_last_update: number;
  karma_trend: 'up' | 'down' | 'same';
  days_items: {
    date: string; // Datum im Format "YYYY-MM-DD"
    items: {
      completed: number; // Anzahl abgeschlossener Tasks
      id: string; // Projekt-ID
    }[];
    total_completed: number;
  }[];
  completed_count: number;
  karma_update_reasons: {
    positive_karma_reasons: number[];
    new_karma: number;
    negative_karma: number;
    positive_karma: number;
    negative_karma_reasons: number[];
    time: string; // Zeitpunkt im Format "EEE DD MMM YYYY HH:mm:ss"
  }[];
  karma: number;
  week_items: {
    date: string; // Datum im Format "YYYY-MM-DD/YYYY-MM-DD"
    items: {
      completed: number; // Anzahl abgeschlossener Tasks
      id: string; // Projekt-ID
    }[];
    total_completed: number;
  }[];
  project_colors: Record<string, string>; // Projekt-ID und Farbe
  goals: {
    karma_disabled: number; // 0 oder 1
    user_id: string; // Benutzer-ID
    max_weekly_streak: {
      count: number; // Anzahl der Streaks
      start: string; // Startdatum im Format "YYYY-MM-DD" (falls verfügbar)
      end: string; // Enddatum im Format "YYYY-MM-DD" (falls verfügbar)
    };
    ignore_days: number[]; // Array der ignorierten Wochentage (1 = Montag, ..., 7 = Sonntag)
    vacation_mode: number; // 0 oder 1
    current_weekly_streak: {
      count: number; // Anzahl der Streaks
      start: string; // Startdatum im Format "YYYY-MM-DD" (falls verfügbar)
      end: string; // Enddatum im Format "YYYY-MM-DD" (falls verfügbar)
    };
    current_daily_streak: {
      count: number; // Anzahl der Streaks
      start: string; // Startdatum im Format "YYYY-MM-DD" (falls verfügbar)
      end: string; // Enddatum im Format "YYYY-MM-DD" (falls verfügbar)
    };
    weekly_goal: number; // Wochenziel (Anzahl Tasks)
    max_daily_streak: {
      count: number; // Anzahl der Streaks
      start: string; // Startdatum im Format "YYYY-MM-DD" (falls verfügbar)
      end: string; // Enddatum im Format "YYYY-MM-DD" (falls verfügbar)
    };
    daily_goal: number; // Tagesziel (Anzahl Tasks)
  };
};

export const fetchTodoistProductivityStats = async (
  token: string
): Promise<TodoistProductivityStats> => {
  const response = await fetch(`https://api.todoist.com/sync/v9/completed/get_stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch productivity stats');
  }

  return await response.json();
};
