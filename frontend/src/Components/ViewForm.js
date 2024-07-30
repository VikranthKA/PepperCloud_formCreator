import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../CSS/viewform.css"

const ViewForm = () => {
  const { id } = useParams()
  const [form, setForm] = useState(null)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3311/api/v1/forms/${id}`)
        .then(response => setForm(response.data))
        .catch(error => console.log(error))
    }
  }, [id])

  const handleChange = (index, event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [index]: {
        ...formData[index],
        [name]: value
      }
    })
  }

  const validateInput = (input, value) => {
    let error = ''
    if (input.type === 'email' && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
      error = 'Please enter a valid email address.'
    } else if ((input.type === 'text' || input.type === 'password') && (value.length < 6 || value.length > 20)) {
      error = 'Please enter between 6 and 20 characters.'
    } else if (input.type === 'number' && (value < 1 || value > 100)) {
      error = 'Please enter a number between 1 and 100.'
    } else if (input.type === 'date' && (new Date(value) < new Date('2020-01-01') || new Date(value) > new Date('2030-12-31'))) {
      error = 'Please enter a date between 2020-01-01 and 2030-12-31.'
    }
    return error
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let isValid = true
    const newErrors = {}
    form.inputs.forEach((input, index) => {
      const value = formData[index]?.[input.title] || ''
      const error = validateInput(input, value)
      if (error) {
        isValid = false
        newErrors[index] = error
      }
    })
    setErrors(newErrors)
    if (isValid) {
      console.log("Form Submitted", formData)
      alert("View in console for the form output")
    }
  }

  if (!form) return <div>Loading....</div>
  return (
    <div className='form-container'>
      <h1>{form.title}</h1>
      <form onSubmit={handleSubmit} className='form-grid'>
        {form.inputs.slice(0, 20).map((input, index) => (
          <div key={index} className='form-item'>
            <label>{input.title}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              name={input.title}
              onChange={(event) => handleChange(index, event)}
              required
            />
            {errors[index] && <span className="error-message">{errors[index]}</span>}
          </div>
        ))}
        <button type='submit' className='submit-button'>Submit</button>
      </form>
    </div>
  )
}

export default ViewForm
