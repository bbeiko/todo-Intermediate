import React, { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState } from '../states/TodoListState';
import { v4 as uuidv4 } from 'uuid';
import { Box, Input } from '@chakra-ui/react';


const AddTodo = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [taskList, setTaskList] = useRecoilState(todoListState);
    const [todoContent, setTodoContent] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');

    const clickAdd = () => {
        if(!todoTitle || !deadline) {
            setError('タイトルと期限は必須です。');
            return;
        }

        setTaskList([
            ...taskList, 
            {
                id: uuidv4(),
                title: todoTitle,
                content: todoContent,
                status: "未着手",
                deadline: deadline,
            }
        ]);

        setTodoTitle('');
        setTodoContent('');
        setDeadline('');
        setError('');
    };
    
    return (
        <Box>
            <span>タイトル</span>
            <Input
                type="text"
                className='inputTitle'
                onChange={(e) => setTodoTitle(e.target.value)}
                value={todoTitle}
            />
            <span>詳細</span>
            <Input
                type="text"
                className='inputContent'
                onChange={(e) => setTodoContent(e.target.value)}
                value={todoContent}
            />

            <Box>
                <span>期限</span>
                <input 
                    type="date"
                    name='deadline'
                    onChange={(e) => setDeadline(e.target.value)}
                    value={deadline}
                />
            </Box>

            {error && <p style={{ color:'red' }}>{error}</p>}
            
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