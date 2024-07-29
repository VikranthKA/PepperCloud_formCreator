import React from 'react'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom' 
import Home from "./Components/Home"
import CreateForm from "./Components/CreateForm"
import EditForm from "./Components/EditForm"
import ViewForm from "./Components/ViewForm"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/form/create' element={<CreateForm/>}/>
        <Route path='/form/:id/edit' element={<EditForm/>}/>
        <Route path='/form/:id' element={<ViewForm/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
