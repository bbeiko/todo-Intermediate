import React from "react";
import { todoListFilterState } from "../states/TodoListState";
import { useRecoilState } from "recoil";
import { Box } from "@chakra-ui/react";

export const TodoListFilters: React.VFC = () => {
    const [filter, setFilter] = useRecoilState(todoListFilterState);

    const updateFilter = (value: string) => {
        setFilter(value);
        console.log(filter);
      }

    return (
        <Box>
            <span>絞り込み</span>
            <select onChange={(e) => updateFilter(e.target.value)}>
                <option value="Show All">すべて</option>
                <option value="Show Incomplete">未完了</option>
                <option value="Show InProgress">作業中</option>
                <option value="Show Completed">完了</option>
            </select>
        </Box>
    );
};