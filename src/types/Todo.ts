export type Todo = {
    id: string;
    title: string;
    status: "notStarted" | "inProgress" | "done";
    content?: string;
}