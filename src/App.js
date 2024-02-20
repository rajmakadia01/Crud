import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Note the import of Routes
import Form from './Form';
import Todo from './Todos';


function App() {

  const [isLogin,setIsLogin] = useState(false)


  const handleSubmit = (userName,password) => {
  if(userName === 'Raj Makadia' && password === 'Raj'){

    setIsLogin(true)

  }else{

    alert ('Invalid Input field')

  }

  }

 

  return (
   <>

      <Router>
          <Routes>
              <Route path='' element={!isLogin ? <Form onLogin={handleSubmit}/> : <Todo />}/>
              <Route path='/todo' element={isLogin ?  <Todo /> : <Form onLogin={handleSubmit}/>}/>
          </Routes>
      </Router>
     
     
   
   
   </>
  );
}

export default App;
