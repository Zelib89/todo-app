import React, { useState, useEffect, useCallback } from 'react';
import { Formik } from 'formik';
import Container from '@material-ui/core/Container';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';
import { todoService } from "../../services/todo";
import './Home.css';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [lastTodo, setLastTodo] = useState('');

  const onFormSubmit = async (values, {resetForm}) => {
    const { text } = values;
    const saved = await todoService.saveTodo(text);
    setLastTodo(saved);
    resetForm();
  };

  useEffect(() => {
    fetchTodos();
  }, [lastTodo]);

  const onTodoRemove = (todo) => {
    todoService.deleteTodo(todo.id).then((d) => {
      setLastTodo(`${lastTodo}${Date.now()}`)
    });
  }

  const fetchTodos = useCallback(async () => {
    try {
      const todoData = await todoService.getTodos();
      setTodos(todoData);
    } catch (e) {
      console.error(e);
    }
  }, []); 

  return (
    <Container >
      <Formik
        initialValues={{ text: '' }}
        render={props => (<TodoForm {...props} />)}
        onSubmit={onFormSubmit}
      />
      <Container>
        {todos.map(todo =>
          <TodoItem
            key={todo.id}
            text={todo.text}
            onRemove={onTodoRemove.bind(null, todo)}
          />
        )}
      </Container>
  </Container>
  )

};

export default Home;