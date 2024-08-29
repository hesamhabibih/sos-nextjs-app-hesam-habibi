"use client"



import React, { useEffect, useState } from 'react';
import {TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import SaveIcon from '@mui/icons-material/Save'; 
import axios from 'axios';


const useStyles = makeStyles(() => ({
  todoListContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  list: {
    width: '100%',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&.even': {
      backgroundColor: '#000',
    },
    '&.odd': {
      backgroundColor: '#fff',
    },
  },
  listItemText: {
    flex: 1,
  },
  deleteButton: {
    color: 'red',
  },
  editButton: {
    color: 'blue',
  },
}));

interface Todo {
  id: number;
  text: string;
  completed?: boolean;
  editing?: boolean;
}

const TodoList: React.FC = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState<Todo[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const jsonServerUrl = 'http://localhost:3000'; 

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

  

  return (
    <div className={classes.todoListContainer}>
      <h1>لیست داده ها</h1>
      <TextField
        className={classes.inputField}
        label="یک داده جدید وارد کنید"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        disabled={inputValue.trim() === ''}
      >
       اضافه کردن به لیست
      </Button>
      <List className={classes.list}>
        {todos.map((todo) => (
          <ListItem key={todo.id} className={classes.listItem}>
            <Checkbox checked={todo.completed} onChange={() => handleToggleComplete(todo.id)} />
            <ListItemText className={classes.listItemText} primary={todo.editing ? (
              <TextField
                value={todo.text}
                onChange={(e) => handleChange(todo.id, e.target.value)}
                fullWidth
              />
            ) : todo.text} />
            <IconButton className={classes.editButton} onClick={() => handleUpdateTodo(todo.id,todo.text)}>
              {todo.editing ? <SaveIcon /> : <EditIcon />}</IconButton>
            <IconButton className={classes.deleteButton} onClick={() => handleDeleteTodo(todo.id)}><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;