export type Todo = {
    id: string;
    title: string;
    status: "未着手" | "作業中" | "完了";
    content?: string;
}