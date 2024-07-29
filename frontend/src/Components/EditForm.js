import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditForm = () => {
  const {id} = useParams()
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  console.log(id,"match")

  useEffect(() => {
    axios.get(`http://localhost:3311/api/v1/forms/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setInputs(response.data.inputs);
      })
      .catch(error => console.error('Error fetching form:', error));
  }, [id]);

  const handleAddInput = (type) => {
    const title = prompt('Enter input title:');
    const placeholder = prompt('Enter input placeholder:');
    setInputs([...inputs, { type, title, placeholder }]);
  };

  const handleDeleteInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    axios.put(`http://localhost:3311/api/v1/forms/${id}`, { title, inputs })
      .then(response => {
        console.log('Form updated:', response.data);
      })
      .catch(error => console.error('Error updating form:', error));
  };

  return (
    <div>
      <h1>Edit Form</h1>
      <input 
        type="text" 
        placeholder="Form Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <div>
        <button onClick={() => handleAddInput('email')}>Add Email Input</button>
        <button onClick={() => handleAddInput('text')}>Add Text Input</button>
        <button onClick={() => handleAddInput('password')}>Add Password Input</button>
        <button onClick={() => handleAddInput('number')}>Add Number Input</button>
        <button onClick={() => handleAddInput('date')}>Add Date Input</button>
      </div>
      <div>
        {inputs.map((input, index) => (
          <div key={index}>
            <input 
              type={input.type} 
              placeholder={input.placeholder} 
              readOnly 
              value={input.title} 
            />
            <button onClick={() => handleDeleteInput(index)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Update Form</button>
    </div>
  );
};

export default EditForm

