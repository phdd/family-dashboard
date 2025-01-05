export {};

declare global {
    type User = {
        id: number;
        fullName: string;
        avatarUrl: string;
    }

    type Member = User;

    type Family = {
        name: string;
        members: Member[];
    }
}