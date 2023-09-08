import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box } from '@chakra-ui/react';
import { Todo } from '../types/Todo';
import { todoCountSelector, todoListState } from '../states/TodoListState';
import { EditModal } from './EditModal';


const TodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const todoCount = useRecoilValue(todoCountSelector);


  //TODO 型定義
  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    console.log(selectedTodo);
  }


  const handleSaveTodo = (editedTodo: Todo) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === editedTodo.id? editedTodo : todo
    );
    setTodoList(updatedTodoList)
    setIsModalOpen(false)
  }


  return (
    <Box>
      <Box>{todoCount}個のTodoがあります</Box>
      <Box>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              {todo.title}: {todo.status}
              <button onClick={handleEdit()}>編集</button>
            </li>
          ))}
        </ul>
      </Box>

      <EditModal
        isEdit={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todo={selectedTodo}
        onSave={handleSaveTodo}
      />
    </Box>
  )
}


export default TodoList