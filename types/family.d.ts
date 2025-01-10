export {};

declare global {
    type User = {
        id: number;
        fullName: string;
        avatarUrl: string;
        todoistToken: string;
    }

    type Member = User;

    type Family = {
        name: string;
        members: Member[];
    }

    type Task = {
        id: string;
        content: string;
        projectId: string;
        description: string;
        isCompleted: boolean;
        createdAt: string;
        order: number;
        labels: string[];
        due?: {
            datetime?: string | null;
            string: string;
        } | null;
    }

    type Chore = Task;
}