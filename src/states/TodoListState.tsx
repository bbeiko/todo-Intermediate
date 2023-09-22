import { atom, selector } from "recoil";
import { Todo } from "../types/Todo";

export const todoListState = atom<Todo[]>({
    key: "todoState",
    default: [],
});

//リストの数を取ってくる
export const todoCountSelector = selector({
    key: "todoCountSelector",
    get: ({ get }) => {
        const todoList = get(todoListState);
        return todoList.length;
    }
});

export const todoListFilterState = atom({
    key: "todoListFilterState",
    default: "Show All",
})

//filterメソッドによって絞り込んだTodoを返す
export const filteredTodoListState = selector({
    key: "filteredTodoListState",
    get: ({ get }) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState)

        switch(filter) {
            case "Show Incomplete":
                return list.filter((todo) => todo.status === '未着手');
            case "Show InProgress":
                return list.filter((todo) => todo.status === '作業中');
            case "Show Completed":
                return list.filter((todo) => todo.status === '完了');
            default:
                return list;
        }
    }
});