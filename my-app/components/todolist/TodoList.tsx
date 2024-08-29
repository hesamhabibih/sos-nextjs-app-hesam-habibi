"use client"



import React from 'react';
import {TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import SaveIcon from '@mui/icons-material/Save'; 
import { useTodolist } from './Todolost.biz';


 
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
  textitem:{
    textAlign: 'right',
    float:'right'
  }
}));

const TodoList: React.FC = () => {

  const classes = useStyles();
  const { todos,inputValue, setInputValue,handleToggleComplete,handleDeleteTodo,handleAddTodo, handleUpdateTodo ,handleChange} = useTodolist()

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
            ) : <span  className={classes.textitem}>{todo.text}</span>} />
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