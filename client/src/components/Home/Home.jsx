import React, { useState } from 'react';
import { Formik } from 'formik';
import Container from '@material-ui/core/Container';
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';
import './App.css';

const Home = () => {
  const [todos, setTodos] = useState([]);

  const onFormSubmit = (values, {resetForm}) => {
    const { text } = values;
    if (text !== undefined && text !== '') {
      setTodos([
        ...todos, {
          id: todos.length,
          text
        }
      ]);
      resetForm();
    }
  };

  const onTodoRemove = (index) => {
    setTodos(todos.filter(t => t.id !== index));
  }

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
            onRemove={onTodoRemove.bind(null, todo.id)}
          />
        )}
      </Container>
  </Container>
  )

};

export default Home;