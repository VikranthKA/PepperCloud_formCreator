// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios'
// // import { useParams } from 'react-router-dom'
// // import "../CSS/editform.css" 

// // const EditForm = () => { 
// //   const { id } = useParams()
// //   const [title, setTitle] = useState('')
// //   const [inputs, setInputs] = useState([])

// //   useEffect(() => {
// //     axios.get(`http://localhost:3311/api/v1/forms/${id}`)
// //       .then(response => {
// //         setTitle(response.data.title)
// //         setInputs(response.data.inputs)
// //       })
// //       .catch(error => console.error('Error fetching form:', error));
// //   }, [id])

// //   const handleAddInput = (type) => {
// //     const inputTitle = prompt('Enter input title:')
// //     const placeholder = prompt('Enter input placeholder:  ')
// //     setInputs([...inputs, { type, title : inputTitle,   placeholder }])
// //   };

// //   const handleDeleteInput = (index) => {
// //     const newInputs = inputs.filter((ele, i) => i !== index)
// //     setInputs(newInputs)
// //   };

// //   const handleSubmit = () => {
// //     axios.put(`http://localhost:3311/api/v1/forms/${id}`, { title, inputs })
// //       .then(response => {
// //         console.log('Form updated:', response.data)
// //       })
// //       .catch(error => console.error('Error updating form:', error))
// //   }

// //   return (
// //     <div className="edit-form-container">
// //       <h1>Edit Form</h1>
// //       <input 
// //         type="text" 
// //         placeholder="Form Title" 
// //         value={title} 
// //         onChange={(e) => setTitle(e.target.value)} 
// //         className="form-title-input"
// //       />
// //       <div className="button-group">
// //         <button onClick={() => handleAddInput('email')}>Add Email Input</button>
// //         <button onClick={() => handleAddInput('text')}>Add Text Input</button>
// //         <button onClick={() => handleAddInput('password')}>Add Password Input</button>
// //         <button onClick={() => handleAddInput('number')}>Add Number Input</button>
// //         <button onClick={() => handleAddInput('date')}>Add Date Input</button>
// //       </div>
// //       <div className="generated-container">
// //         {inputs.map((input, index) => (
// //           <div key={index} className="generated-inputs">
// //             <div className="input-row">
// //               <input 
// //                 type={input.type} 
// //                 placeholder={input.placeholder} 
// //                 readOnly 
// //                 value={input.title} 
// //                 className="generated-input"
// //               />
// //               <button onClick={() => handleDeleteInput(index)} className="delete-button">Delete</button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //       <button onClick={handleSubmit} className="submit-button" style={{marginTop:"20px",width:"20%"}}>Update Form</button>
// //     </div>
// //   )
// // }

// // export default EditForm;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import {useDrag,useDrop,DndProvider} from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import update from 'immutability-helper'
// import "../CSS/editform.css" 



// const EditForm = () => { 
//   const { id } = useParams()
//   const [title, setTitle] = useState('')
//   const [inputs, setInputs] = useState([])

//   useEffect(() => {
//     axios.get(`http://localhost:3311/api/v1/forms/${id}`)
//       .then(response => {
//         setTitle(response.data.title)
//         setInputs(response.data.inputs)
//       })
//       .catch(error => console.error('Error fetching form:', error));
//   }, [id])

//   const handleAddInput = (type) => {
//     const inputTitle = prompt('Enter input title:')
//     const placeholder = prompt('Enter input placeholder:  ')
//     setInputs([...inputs, { type, title : inputTitle,   placeholder }])
//   };

//   const handleDeleteInput = (index) => {
//     const newInputs = inputs.filter((ele, i) => i !== index)
//     setInputs(newInputs)
//   };

//   const handleSubmit = () => {
//     axios.put(`http://localhost:3311/api/v1/forms/${id}`, { title, inputs })
//       .then(response => {
//         console.log('Form updated:', response.data)
//       })
//       .catch(error => console.error('Error updating form:', error))
//   }

//   return (
//     <div className="edit-form-container">
//       <h1>Edit Form</h1>
//       <input 
//         type="text" 
//         placeholder="Form Title" 
//         value={title} 
//         onChange={(e) => setTitle(e.target.value)} 
//         className="form-title-input"
//       />
//       <div className="button-group">
//         <button onClick={() => handleAddInput('email')}>Add Email Input</button>
//         <button onClick={() => handleAddInput('text')}>Add Text Input</button>
//         <button onClick={() => handleAddInput('password')}>Add Password Input</button>
//         <button onClick={() => handleAddInput('number')}>Add Number Input</button>
//         <button onClick={() => handleAddInput('date')}>Add Date Input</button>
//       </div>
//       <div className="generated-container">
//         {inputs.map((input, index) => (
//           <div key={index} className="generated-inputs">
//             <div className="input-row">
//               <input 
//                 type={input.type} 
//                 placeholder={input.placeholder} 
//                 readOnly 
//                 value={input.title} 
//                 className="generated-input"
//               />
//               <button onClick={() => handleDeleteInput(index)} className="delete-button">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button onClick={handleSubmit} className="submit-button" style={{marginTop:"20px",width:"20%"}}>Update Form</button>
//     </div>
//   )
// }

// export default EditForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import "../CSS/createform.css"

const ItemTypes = {
  INPUT: 'input',
}

const DraggableInput = ({ input, index, moveInput, handleDeleteInput }) => {
  const [, ref] = useDrag({
    type: ItemTypes.INPUT,
    item: { index },
  })

  const [, drop] = useDrop({
    accept: ItemTypes.INPUT,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveInput(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  })

  return (
    <div ref={(node) => ref(drop(node))} className="generated-inputs">
      <div>
        <input
          type={input.type}
          placeholder={input.placeholder}
          readOnly
          value={input.title}
        />
        <button onClick={() => handleDeleteInput(index)}>Delete</button>
      </div>
    </div>
  )
}

const EditForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('')
  const [inputs, setInputs] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3311/api/v1/forms/${id}`)
      .then(response => {
        setTitle(response.data.title)
        setInputs(response.data.inputs)
      })
      .catch(error => console.error('Error fetching form:', error));
  }, [id])

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
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs)
  }

  const moveInput = (fromIndex, toIndex) => {
    const updatedInputs = update(inputs, {
      $splice: [
        [fromIndex, 1],
        [toIndex, 0, inputs[fromIndex]],
      ],
    })
    setInputs(updatedInputs);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3311/api/v1/forms/${id}`, { title, inputs });
      alert("Form updated successfully!")
    } catch (error) {
      console.error('Error updating form:', error)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Edit Form</h1>
        <input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='input-title'
          style={{margin:"0px 0px 10px 100px"}}
        />
        <div className='button-group'>
          <button onClick={() => handleAddInput('email')}>Add Email Input</button>
          <button onClick={() => handleAddInput('text')}>Add Text Input</button>
          <button onClick={() => handleAddInput('password')}>Add Password Input</button>
          <button onClick={() => handleAddInput('number')}>Add Number Input</button>
          <button onClick={() => handleAddInput('date')}>Add Date Input</button>
        </div>
        <div className='generated-container'>
          {inputs.map((input, index) => (
            <DraggableInput
              key={index}
              index={index}
              input={input}
              moveInput={moveInput}
              handleDeleteInput={handleDeleteInput}
            />
          ))}
          <button onClick={handleSubmit} id='submit-button'>Update Form</button>
        </div>
      </div>
    </DndProvider>
  )
}

export default EditForm
