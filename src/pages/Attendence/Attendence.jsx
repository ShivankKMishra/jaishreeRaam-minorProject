import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getUserToken } from "../../utils/sessionStorage/sessionStorage";
import { useClassContext } from "../../contexts/ClassesContext";
import { isAuthenticated } from "../../utils/sessionStorage/sessionStorage";

function AttendanceComponent() {
  const { classes } = useClassContext();
  const [selectedClass, setSelectedClass] = useState(null);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [usersData, setUsersData] = useState({});
  const [attendanceData, setAttendanceData] = useState({});
  const userToken = getUserToken();
  const db = getFirestore();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = {};
      for (const userId of enrolledUsers) {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          userData[userId] = userDocSnap.data().name;
        } else {
          console.error(`User document with ID ${userId} does not exist`);
        }
      }
      setUsersData(userData);
    };

    if (enrolledUsers.length > 0 && Object.keys(usersData).length === 0) {
      fetchUserData();
    }
  }, [enrolledUsers, usersData, db]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (selectedClass) {
        const classDocRef = doc(db, "classes", selectedClass.id);
        const classDocSnap = await getDoc(classDocRef);
        if (classDocSnap.exists()) {
          const classData = classDocSnap.data();
          setAttendanceData(classData.attendance || {});
        } else {
          console.error("Class document does not exist");
        }
      }
    };

    fetchAttendanceData();
  }, [selectedClass, db]);

  const handleClassSelect = async (classItem) => {
    setSelectedClass(classItem);
    try {
      const classDocRef = doc(db, "classes", classItem.id);
      const classDocSnap = await getDoc(classDocRef);
      if (classDocSnap.exists()) {
        const classData = classDocSnap.data();
        setEnrolledUsers(classData.enrolledUsers || []);
      } else {
        console.error("Class document does not exist");
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const handleAttendanceChange = async (userId, date, status) => {
    try {
      const classDocRef = doc(db, "classes", selectedClass.id);
      const classDocSnap = await getDoc(classDocRef);
      if (classDocSnap.exists()) {
        const classData = classDocSnap.data();
        const isCreator = classData.creatorUid === userToken; // Compare creatorUid with userToken
        if (!isCreator) {
          console.error("Only the creator of the class can make attendance changes");
          return;
        }
        const updatedAttendance = {
          ...(classData.attendance || {}),
          [userId]: {
            ...(classData.attendance?.[userId] || {}),
            [date]: status,
          },
        };
        await setDoc(classDocRef, { ...classData, attendance: updatedAttendance });
        console.log("Attendance updated successfully!");
      } else {
        console.error("Class document does not exist");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div className="AttendanceComponent p-4">
      <h2 className="text-2xl font-bold mb-4">Select Class</h2>
      <select
        className="block w-full border border-gray-300 rounded-md p-2 mb-4"
        onChange={(e) => handleClassSelect(JSON.parse(e.target.value))}
      >
        <option value="">Select a class</option>
        {classes.map((classItem) => (
          <option key={classItem.id} value={JSON.stringify(classItem)}>
            {classItem.name}
          </option>
        ))}
      </select>

      {selectedClass && (
        <div>
          <h3 className="text-xl font-bold mb-2">Mark Attendance for {selectedClass.name}</h3>
          <ul className="grid gap-2">
            {enrolledUsers.map((userId) => (
              <li key={userId} className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={userId}
                    value="present"
                    onChange={() => handleAttendanceChange(userId, new Date().toISOString(), "present")}
                    disabled={selectedClass.creatorUid !== userToken} // Disable input if not the creator
                  />
                  <span>Present</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={userId}
                    value="absent"
                    onChange={() => handleAttendanceChange(userId, new Date().toISOString(), "absent")}
                    disabled={selectedClass.creatorUid !== userToken} // Disable input if not the creator
                  />
                  <span>Absent</span>
                </label>
                <span className="ml-5">{usersData[userId]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedClass && (
        <div>
          <h3 className="text-xl font-bold mb-2">Attendance Table for {selectedClass.name}</h3>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Name</th>
                <th className="border border-gray-400 p-2">Date</th>
                <th className="border border-gray-400 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendanceData).map(([userId, userAttendance]) => (
                Object.entries(userAttendance).map(([date, status]) => (
                  <tr key={`${userId}-${date}`}>
                    <td className="border border-gray-400 p-2">{usersData[userId]}</td>
                    <td className="border border-gray-400 p-2">{date}</td>
                    <td className="border border-gray-400 p-2">{status}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttendanceComponent;
