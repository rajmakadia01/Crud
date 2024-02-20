// LoginForm.js
import React, { useEffect, useState } from 'react';

const Todo = () => {

  const [todo,setTodo] = useState([])
  const [newTodo,setNewTodo] = useState('')
  const [editTodo,setEditTodo] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [searchItem,setSearchItem] = useState('')
  const [currentPage,setCurrentPage] = useState(1)
  const [itemPerPage] = useState(5)
 
  useEffect(() => {
    const fetchData = async () => {
      try{

        const response = await fetch ('https://jsonplaceholder.typicode.com/todos')
        if(!response.ok){
          throw new Error ('Something Is Wrong')
        }
        const result = await response.json()
        setTodo(result)

      }catch(error){

        setError(error)

      }finally{
        setLoading(true)
      }
    }
    fetchData()
  },[])

  const addTodo = async () => {
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({title:newTodo , completed:false})
      })
      if(!response.ok){
        throw new Error ('Something Is Wrong')
      }
      const result = await response.json()
      setTodo([...todo,result])
      setNewTodo('')
    }catch(error){
      setError(error)
    }
  }

  const editTodos = async (index) => {
    try{

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo[index].id}`,{
        method:'PUT',
        headers:{
          'content-Type' : 'application/json'
        },
        body:JSON.stringify({title:newTodo , completed:false})
      })
      if(!response.ok){
        throw new Error ('Something Is Wrong')
      }
      const updateTodo = [...todo]
      updateTodo[index].title = newTodo
      setTodo(updateTodo)
      setNewTodo('')
      setEditTodo(null)

    }catch(error){
      setError(error)

    }
  } 


  const deleteTodo = async (index) => {
    try{

      const response = await fetch (`https://jsonplaceholder.typicode.com/todos/${todo[index].id}`,{
        method:'DELETE'
      })
      if(!response.ok){
        throw new Error ('Something Is Wrong')
      }
      const updateTodo = todo.filter((_,i) => i !== index)
      setTodo(updateTodo)

    }catch(error){
        setError(error)
    }
  }


  const searchTodo = todo.filter(todo => todo.title.toLowerCase().includes(searchItem.toLocaleLowerCase()))

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentTodos = searchTodo.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(searchTodo.length / itemPerPage);

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
  


  


  return (
    <>
    <input type='text' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder='search'/>
    
     <ul>
      {currentTodos.map((todo,index) => (
        <li key={index}>
          {index === editTodo ? (
            <>
              <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
              <button onClick={() => editTodos(index)}>Save</button>
            </>
          ) : (
            <>
              {todo.title}
              <button onClick={() => setEditTodo(index)}>Edit</button>
              <button onClick={() => deleteTodo(index)}>Delete</button>


            </>
          )}
        </li>
      ))}
     </ul>
     <div>
    {renderPaginationButtons()}
     </div>
     <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
     <button onClick={addTodo}>AddTodo</button>
    </>
  );
};

export default Todo;
