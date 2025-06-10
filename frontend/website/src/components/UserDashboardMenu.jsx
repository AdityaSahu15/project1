// UserDashboardMenu.jsx
import React, { useEffect, useState } from "react";
import EditInfo from "./EditInfo";

const UserDashboardMenu = () => {
  const [selectField, setSelectField] = useState(null);

//   useEffect(()=>{
//     console.log(selectField)
//   },[selectField])

  return (
    <div className="relative w-full mt-4">
      {!selectField ? (
        <div className="absolute bg-white border rounded w-full max-w-xs shadow z-20">
          <ul className="divide-y divide-blue-200 text-blue-600">
            {['Name', 'Email', 'UserName', 'Contact'].map(field => (
              <li
                key={field}
                onClick={() => setSelectField(field)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                Edit {field}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="absolute w-full max-w-xs">
          <EditInfo field={selectField} />
        </div>
      )}
    </div>
  );
};

export default UserDashboardMenu;
