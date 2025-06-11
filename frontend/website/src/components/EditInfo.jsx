// EditInfo.jsx
import React, { useContext } from 'react';
import { UpdatedInfoContext } from '../UpdatedInfoContext';

function EditInfo({ field }) {
  const { inputValue, setInputValue, setField } = useContext(UpdatedInfoContext);

  const handleChange = (e) => {
    setField(field);
    setInputValue(e.target.value);
  };

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
