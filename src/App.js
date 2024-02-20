// App.js

import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling
import Todo from './todo';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo, completed: false }),
      });

      if (!response.ok) {
        throw new Error('Error adding todo');
      }

      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      setError(error.message);
    }
  };

  const editTodo = async (index) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todos[index].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo, completed: false }),
      });

      if (!response.ok) {
        throw new Error('Error editing todo');
      }

      const updatedTodos = [...todos];
      updatedTodos[index].title = newTodo;
      setTodos(updatedTodos);
      setNewTodo('');
      setEditIndex(null);
    } catch (error) {
      console.error('Error editing todo:', error.message);
      setError(error.message);
    }
  };

  const deleteTodo = async (index) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todos[index].id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting todo');
      }

      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];

    if (totalPages > 1) {
      if (currentPage > 1) {
        pageButtons.push(
          <button key="prev" onClick={() => paginate(currentPage - 1)}>
            Prev
          </button>
        );
      }

      for (let i = 1; i <= Math.min(totalPages, 3); i++) {
        pageButtons.push(
          <button key={i} onClick={() => paginate(i)} className={currentPage === i ? "active" : ""}>
            {i}
          </button>
        );
      }

      if (currentPage < totalPages) {
        pageButtons.push(
          <button key="next" onClick={() => paginate(currentPage + 1)}>
            Next
          </button>
        );
      }
    }

    return pageButtons;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="app-container">
      <h2>ToDo List</h2>
      <div className="search-bar-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Todos..."
        />
        {/* Add search button if needed */}
      </div>
      <ul>
        {currentTodos.map((todo, index) => (
          <li key={index} className="todo-item">
            {index === editIndex ? (
              <>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={() => editTodo(index)}>Save</button>
              </>
            ) : (
              <>
                {todo.title.length > 40 ? `${todo.title.slice(0, 40)}...` : todo.title}
                <div className="button-container">
                  <button onClick={() => setEditIndex(index)}>Edit</button>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="pagination-container">
        {renderPaginationButtons()}
      </div>
      <div className="add-todo-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
        />
        <button onClick={addTodo}>Add ToDo</button>
      </div>
    </div>
    // <Todo />
  );
};

export default App;
