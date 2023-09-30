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
        let filteredList: Todo[] = [];

        switch(filter) {
            case 'Show Incomplete':
                filteredList = list.filter((todo) => todo.status === '未着手');
                break;
            case 'Show InProgress':
                filteredList = list.filter((todo) => todo.status === '作業中');
                break;
            case 'Show Completed':
                filteredList = list.filter((todo) => todo.status === '完了');
                break;
            default:
                filteredList = list;    
        }

        // 期限で昇降順に並び替える？
        // const sortedList = fileteredList.sort((a, b) => {
            
        // });

        return filteredList;

    }
});