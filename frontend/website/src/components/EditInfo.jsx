// EditInfo.jsx
import React, { useEffect, useState } from 'react';

function EditInfo({ field }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

//   useEffect(()=>{
//     console.log(inputValue)
//   },[inputValue])

  return (
    <div className="p-4 bg-white rounded border shadow border-blue-300">
      <label htmlFor="userInput" className="block text-sm text-blue-600 mb-2">
        Enter {field}:
      </label>
      <input
        id="userInput"
        type="text"
        value={inputValue}
        onChange={handleChange}
       
        className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

export default EditInfo;