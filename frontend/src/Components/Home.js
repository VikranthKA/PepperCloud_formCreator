import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Home = () => {
  const [forms, setForms] = useState([])

  const makeApiCall = async () => {
    try {
      const response = await axios.get("http://localhost:3311/api/v1/forms")
      setForms(response.data)

    } catch (error) {
      console.log(error)
    }

  }
  const navigate = useNavigate()
  useEffect(() => {
    makeApiCall()
  },[])
  return (
    <div>
      <h1>All Forms</h1>
      <Link to="/form/create">Create Form</Link>
      <ul>
        {
          forms.map(form => (
            <li key={form?._id} style={{wordSpacing:"10"}}>
              <Link to={`/form/${form._id}`}>{form.title}</Link><br/>
              <Link to={`/form/${form._id}/edit`}>Edit</Link>


            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home
