import React from 'react';
import './App.css';
import { Box } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <Box>
      <RecoilRoot>
        <AddTodo/>
        <TodoList />
      </RecoilRoot>
    </Box>
  );
}

export default App;
