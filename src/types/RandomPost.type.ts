
export interface RandomPost {
    post: string,
    likes: string[],
    shares: string[],
    username: string | null;
    email: string;
    uid: string;
    postIndex: number;
}