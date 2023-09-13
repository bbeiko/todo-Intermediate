import React, { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState } from '../states/TodoListState';
import { v4 as uuidv4 } from 'uuid';
import { Box, Input } from '@chakra-ui/react';


const AddTodo = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [taskList, setTaskList] = useRecoilState(todoListState);


    //todoTitleが変化したときのみ以前作ってメモ化した関数を実行
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setTodoTitle(e.target.value)
        },
        [todoTitle]
    );


    const clickAdd = () => {
        setTaskList([...taskList, {
            id: uuidv4(),
            title: todoTitle,
            status: "未着手",
        }]);
        setTodoTitle("");
    };
    
    return (
        <Box>
            <Input
                type="text"
                className='inputTitle'
                onChange={onChange}
                value={todoTitle}
            />
            <button
                className='addButton'
                onClick={clickAdd}
            >
                追加
            </button>
        </Box>
    )
}


export default AddTodo