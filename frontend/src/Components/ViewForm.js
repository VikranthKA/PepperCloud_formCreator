import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const ViewForm = () => {

  const {id} = useParams()
  console.log()
  const [form,setForm] = useState(null)
  const [formData,setFormData] = useState({

  })

  

  useEffect(()=>{
    if(id){

      axios.get(`http://localhost:3311/api/v1/forms/${id}`)
      .then(response=>setForm(response.data))
      .catch(error=>console.log(error))
    }
  },[id])


  const handleChange = (index,event)=>{
    const {name,value} = event.target;
    setFormData({
      ...formData,
      [index]:{
        ...formData[index],
        [name]:value
      }
    })
  }

  const handleSubmit = (event)=>{
    event.preventDefault()
    console.log("FormSubmitted",formData)
    alert("View in console for the form output")
  }

  if(!form) return <div>Loading....</div>
  return (
    <div>
      <h1>{form.tittle}</h1>
      <form onSubmit={handleSubmit}>
        {form.inputs.map((input,index)=>(
          <div key={index}>
            <label>{input.title}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              name={input.title}
              onChange={(event)=>handleChange(index,event)}
              required
            />
          </div>
        ))}
      <button type='submit'>Submit</button>
      </form>
      
    </div>
  )
}

export default ViewForm
