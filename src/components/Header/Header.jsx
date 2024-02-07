import React, { useState } from 'react';
import FiberSmartRecordRoundedIcon from '@mui/icons-material/FiberSmartRecordRounded';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

function Header({ toggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-white p-4 text-white">
      <div className="flex items-center justify-between">
        <h1 className='text-4xl font-serif text-orange-400 rounded-full p-3 mx-2'>
          <ClassRoundedIcon /> Classroom
        </h1>
        <div className='flex'>
      <div className=' text-orange-400'>   <Button
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleClick}
            className='mx-3'
            
            color="primary"
          >
            <ControlPointDuplicateIcon />
          </Button>
       </div><Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Create Class</MenuItem>
            <MenuItem onClick={handleClose}>Join Class</MenuItem>
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
  );
}

export default Header;
