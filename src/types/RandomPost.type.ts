
export interface RandomPost {
    post: string,
    likes: string[],
    shares: string[],
    username: string | null;
    date: string;
    email: string;
    uid: string;
    postIndex: number;
}