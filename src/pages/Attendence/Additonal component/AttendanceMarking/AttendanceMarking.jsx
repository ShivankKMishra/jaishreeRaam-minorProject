import React from 'react';

const AttendanceMarking = ({ users, handleAttendanceChange }) => {
  return (
    <div>
      <h2>Mark Attendance</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <label>
              <input
                type="radio"
                name={user.id}
                value="present"
                onChange={() => handleAttendanceChange(user.id, 'present')}
              />
              Present
            </label>
            <label>
              <input
                type="radio"
                name={user.id}
                value="absent"
                onChange={() => handleAttendanceChange(user.id, 'absent')}
              />
              Absent
            </label>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceMarking;
