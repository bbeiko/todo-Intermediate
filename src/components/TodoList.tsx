import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box } from '@chakra-ui/react';
import { Todo } from '../types/Todo';
import { filteredTodoListState, todoCountSelector, todoListFilterState, todoListState } from '../states/TodoListState';
import { EditModal } from './EditModal';


const TodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState({ key: 'deadline', ascending: true})
  const todoCount = useRecoilValue(todoCountSelector);
  const filteredTodoList = useRecoilValue(filteredTodoListState);


  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  }


  const handleSaveTodo = (editedTodo: Todo) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === editedTodo.id? editedTodo : todo
    );
    setTodoList(updatedTodoList)
    setIsModalOpen(false)
  }

  const handleDelete = (targetTodo: Todo) => {
    setTodoList(todoList.filter((todo) => todo !== targetTodo));
  };

  //TODO期限の昇順・降順で並び替えできるようにしたい
  const toggleSortOrder = () => {
    setSortBy({ key: sortBy.key, ascending: !sortBy.ascending });
  };

  return (
    <Box>
      <Box>{todoCount}個のTodoがあります</Box>

      <Box>
        <button onClick={toggleSortOrder}>
          期限 {sortBy.ascending ? '▲' : '▼' }
        </button>
      </Box>

      <Box>
        <ul>
          {filteredTodoList.map((todo) => (
            <li key={todo.id}>
              <span>タイトル：</span>{todo.title}
              {/* handleEditに引数を渡すためアロー関数で書く */}
              <button onClick={() => handleEdit(todo)}>編集</button>
              <button onClick={() => handleDelete(todo)}>削除</button>
              <br />
              <span>詳細：</span>{todo.content}
              <br />
              <span>期限：</span>{todo.deadline}
              <br />
              <span>進捗：</span>{todo.status} 
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