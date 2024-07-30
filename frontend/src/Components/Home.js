import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "../CSS/home.css"

const Home = () => {
  const [forms, setForms] = useState([])

  const makeApiCall = async () => {
    try {
      const response = await axios.get("http://localhost:3311/api/v1/forms")
      setForms(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  const navigate = useNavigate()

  useEffect(() => {
    makeApiCall()
  }, []);

  return (
    <div className="home-container">
      <div>
        <h1>All Forms</h1>
        <Link to="/form/create" className="create-form">Create Form</Link>
        <table border="1" className="form-table">
          <thead>
            <tr>
              <th>Form Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key={form?._id} className="list-item">
                <td>
                  <Link to={`/form/${form._id}`} className="link-item-tag">{form.title}</Link>
                </td>
                <td className="action-links">
                  <Link to={`/form/${form._id}/edit`} className="link-item-tag">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
