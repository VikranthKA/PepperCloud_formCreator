import React, { useState } from 'react';
import axios from 'axios'
import "../CSS/createform.css"

const CreateForm = () => {
  const [title, setTitle] = useState("")
  const [inputs, setInputs] = useState([])

  const handleAddInput = (type) => {
    const inputTitle = prompt('Enter input title')
    if(inputTitle?.trim()){

      const placeholder = prompt('Enter input placeholder')
      if(placeholder?.trim()){
        setInputs([...inputs, { type, title: inputTitle, placeholder }])

      }
    }
    }

  const handleDeleteInput = (index) => {
    const finalInputs = inputs.filter((ele, i) => i !== index)
    setInputs(finalInputs);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3311/api/v1/forms', {
        title,
        inputs
      });
      alert("Form Saved!", response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="create-form-container">
      <h1>Create Form</h1>
      <div className="input-button-container">
        <input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-title-input"
        />
        <div className="button-group">
          <button onClick={() => handleAddInput('email')}>Add Email</button>
          <button onClick={() => handleAddInput('text')}>Add Text</button>
          <button onClick={() => handleAddInput('password')}>Add Password</button>
          <button onClick={() => handleAddInput('number')}>Add Number</button>
          <button onClick={() => handleAddInput('date')}>Add Date</button>
        </div>
      </div>
      <div className="generated-container">
        {inputs.map((input, index) => (
          <div key={index} className="generated-inputs">
            <div className="input-row">
              <input
                type={input.type}
                placeholder={input.placeholder}
                readOnly
                value={input.title}
                className="generated-input"
              />
              <button onClick={() => handleDeleteInput(index)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
        <button onClick={handleSubmit} className="submit-button">Save Form</button>
      </div>
    </div>
  )
}

export default CreateForm;
