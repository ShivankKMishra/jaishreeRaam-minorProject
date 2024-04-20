import React, { useEffect } from "react";
import { isAuthenticated } from "../../utils/sessionStorage/sessionStorage";
const ClassRoom = () => {
 useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div>ClassRoom</div>
  )
}

export default ClassRoom