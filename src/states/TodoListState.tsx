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

//フィルターの初期値は「すべて」
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

        // フィルターによって絞り込んだTodoを取得
        let fileteredList: Todo[] = [];

        switch(filter) {
            case 'Show Incomplete':
                fileteredList = list.filter((todo) => todo.status === '未着手');
                break;
            case 'Show InProgress':
                fileteredList = list.filter((todo) => todo.status === '作業中');
                break;
            case 'Show Completed':
                fileteredList = list.filter((todo) => todo.status === '完了');
                break;
            default:
                fileteredList = list;    
        }

        const sortedList = fileteredList.sort((a, b) => {
            if (a.deadline < b.deadline) return -1;
            if (a.deadline > b.deadline) return 1;
            return 0;
        });

        return sortedList;

        // switch(filter) {
        //     case "Show Incomplete":
        //         return list.filter((todo) => todo.status === '未着手');
        //     case "Show InProgress":
        //         return list.filter((todo) => todo.status === '作業中');
        //     case "Show Completed":
        //         return list.filter((todo) => todo.status === '完了');
        //     default:
        //         return list;
        // }
    }
});