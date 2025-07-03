// UserDashboardMenu.jsx
import React, { useEffect, useState } from "react";
import EditInfo from "./EditInfo";

const UserDashboardMenu = () => {
  const [selectField, setSelectField] = useState(null);

  return (
    <div className="relative w-full mt-4">
      {!selectField ? (
        <div className="absolute bg-white border border-blue-200 rounded-xl w-full max-w-xs shadow-lg z-20">
          <ul className="divide-y divide-blue-100 text-blue-700 text-sm font-medium">
            {['Name', 'Email', 'UserName', 'Contact'].map(field => (
              <li
                key={field}
                onClick={() => setSelectField(field)}
                className="px-4 py-3 hover:bg-blue-100 hover:text-blue-900 cursor-pointer transition-all"
              >
                ✏️ Edit {field}
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
