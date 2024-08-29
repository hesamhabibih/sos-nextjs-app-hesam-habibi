
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from './TodoList.type';

export const useTodolist = () => {


      const [todos, setTodos] = useState<Todo[]>([]);
      const [inputValue, setInputValue] = useState('');
      const jsonServerUrl = 'http://localhost:3000'; 

    
      const handleToggleComplete = (id: number) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };
    
      async function fetchData(): Promise<Todo[]> {
    
        try {
          const response = await axios.get(`${jsonServerUrl}/todos`); 
          const data = response.data as Todo[]; 
          return data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error; 
        }
      }
    
      async function handleDeleteTodo(todoId: number) {
      debugger
        try {
          await axios.delete(`${jsonServerUrl}/todos/${todoId}`);
          // Remove the deleted todo from the todos state
          setTodos(todos.filter((todo) => todo.id !== todoId));
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      }
    
      async function handleAddTodo() {
        if (inputValue.trim() !== '') {
          try {
            const response = await axios.post(`${jsonServerUrl}/todos`, { id: Date.now(), text: inputValue, completed: false, editing: false });
      
            if (response.status === 201) {
              setTodos([...todos, response.data]); 
              setInputValue('');
            } else {
              console.error('Error adding todo:', response.data);
            }
          } catch (error) {
            console.error('Error creating todo:', error);
          }
        }
      }
    
      async function handleUpdateTodo(todoId: number, newText: string) {
        try {
          setTodos(todos.map((todo) => (todo.id === todoId ? { ...todo, text: newText ,editing:!todo.editing} : todo)));
          const response = await axios.patch(`${jsonServerUrl}/todos/${todoId}`, { text: newText });
          if (response.status === 200) { 
            setTodos(todos.map((todo) => (todo.id === todoId ? { ...todo, text: newText} : todo)));
            
          } else {
            console.error('Unexpected update response status:', response.status);
          }
        } catch (error) {
          console.error('Error updating todo:', error);
        } 
      }
    
      async function handleChange(todoId: number, newText: string) {
          setTodos(todos.map((todo) => (todo.id === todoId ? { ...todo, text: newText} : todo)));
      }

      useEffect(() => {
        const fetchDataAsync = async () => {
          try {
            const fetchedData = await fetchData(); 
            setTodos(fetchedData);
          } catch (error) {
            console.error('Error fetching data:', error);
    
          }
        };
        fetchDataAsync();
      }, []); 


      return { todos, setTodos,inputValue, setInputValue,handleToggleComplete,handleDeleteTodo,handleAddTodo, handleUpdateTodo ,handleChange}
    
}