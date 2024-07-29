import React, { useState } from 'react'
import axios from 'axios'

const CreateForm = () => {
  const [title,setTitle] = useState("")
  const [inputs,setInputs]= useState([])

  const handleAddInput=(type)=>{
    const title = prompt('Enter input title')
    const placeholder = prompt('Enter input placeholder')
    setInputs([...inputs,{type,title,placeholder}])
  }

  const handleDeleteInput =(index)=>{
    const finalInputs = inputs.filter((ele,i)=> i!==index)
    setInputs(finalInputs)
  }

  const handleSubmit =()=>{
    try{
      const response = axios.post('http://localhost:3311/api/v1/forms',{
        title,inputs
      })
      alert("Response Saved!!!",response.data)
      
    }catch(error){
      console.log(error)

    }
  }


  return (
    <div>
      <h1>Create Form</h1>
      <input
        type='text'
        placeholder='Form Title'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <div>
        <button onClick={()=>handleAddInput('email')}>Add Email</button>
        <button onClick={()=>handleAddInput('text')}>Add Text</button>
        <button onClick={()=>handleAddInput('password')}>Add Password</button>
        <button onClick={()=>handleAddInput('number')}>Add Number</button>
        <button onClick={()=>handleAddInput('date')}>Add Date</button>

      </div> 
      <div>
        {inputs.map((input,index)=>(
          <div key={index}> 
          <input
            type={input.type}
            placeholder={input.placeholder}
            readOnly
            value={input.title}
          />
            <button onClick={()=>handleDeleteInput(index)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Save Form</button>
    </div>
  )
}

export default CreateForm
