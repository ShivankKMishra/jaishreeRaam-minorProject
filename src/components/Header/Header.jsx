import React, { useState } from 'react';
import FiberSmartRecordRoundedIcon from '@mui/icons-material/FiberSmartRecordRounded';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CreateClass from '../Forms/CreateClass/CreateClass'; // Import the CreateClass component
import JoinClass from '../Forms/JoinClass/JoinClass'; // Import the JoinClass component

function Header({ toggleSidebar, toggleCreateClass, toggleJoinClass }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false); // State for CreateClass popup

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleCreateClassPopup = () => {
    setIsCreateClassOpen(!isCreateClassOpen);
    setAnchorEl(null); // Close the menu when Create Class is clicked
  };

  return (
    <>
      <header className="bg-white p-4 text-white">
        <div className="flex items-center justify-between">
          <h1 className='text-4xl font-serif text-orange-400 rounded-full p-3 mx-2'>
            <ClassRoundedIcon /> Classroom
          </h1>
          <div className='flex'>
            <div className=' text-orange-400'>
              <Button
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
                className='mx-3'
                color="primary"
              >
                <ControlPointDuplicateIcon />
              </Button>
            </div>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={toggleCreateClassPopup}>Create Class</MenuItem> {/* Toggle the CreateClass popup */}
              <MenuItem onClick={toggleJoinClass}>Join Class</MenuItem> {/* Toggle the JoinClass popup */}
            </Menu>
            <button
              onClick={toggleSidebar}
              className="text-xl border border-orange-400 rounded-3x text-black hover:bg-orange-400 hover:text-white rounded-3xl p-1  pr-4 focus:outline-none mx-3"
            >
              <FiberSmartRecordRoundedIcon />
            </button>
          </div>
        </div>
      </header>
      {/* Render CreateClass popup */}
      <CreateClass isOpen={isCreateClassOpen} onClose={toggleCreateClassPopup} />
    </>
  );
}

export default Header;
