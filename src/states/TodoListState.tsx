import { atom, selector } from "recoil";
import { Todo } from "../types/Todo";

export const todoListState = atom<Todo[]>({
    key: "todoState",
    default: [
        {
            id: "",
            title: "",
            status: "notStarted",
            content: "",
        },
    ],
});

export const todoCountSelector = selector({
    key: "todoCountSelector",
    get: ({ get }) => {
        const todoList = get(todoListState);
        return todoList.length;
    }
});