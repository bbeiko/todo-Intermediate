export type Todo = {
    id: string;
    title: string;
    content?: string;
    deadline: string;
    status: "未着手" | "作業中" | "完了";
}