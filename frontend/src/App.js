import React from 'react'
import {BrowserRouter as Router,Routes} from 'react-router-dom'
import Home from "./Components/Home"
import CreateForm from "./Components/CreateForm"
import EditForm from "./Components/EditForm"
import ViewForm from "./Components/ViewForm"

const App = () => {
  return (
    <Router>
        <Routes path='/' exact component={<Home/>}/>
        <Routes path='/form/create'  component={<CreateForm/>}/>
        <Routes path='/form/:id/edit'  component={<EditForm/>}/>
        <Routes path='/form/:id'  component={<ViewForm/>}/>

    </Router>
  )
}

export default App
