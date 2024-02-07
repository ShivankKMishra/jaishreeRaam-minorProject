// src/components/sidebar/Sidebar.jsx
import React from 'react';
import HomeIcon from '@mui/icons-material/Home'; // Importing HomeIcon
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside className={`rounded-2xl m-2 bg-slate-200 text-orange-400 h-screen fixed transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="w-full p-6 m-4">
        <nav>
          <ul>
            <li className='hover:font-serif text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg p-1 m-1'>
              <button className="w-full flex items-center justify-start"> {/* Set button width to full and align content to start */}
                <HomeIcon /> Classroom
              </button>{/* Using HomeIcon */}
            </li>
            {/* Add more sidebar items as needed */}
          </ul>
        </nav>
        <div className='w-full flex flex-col justify-between m-1 p-1 item-end py-10'>
          <button className="w-full flex items-center justify-start my-8 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg"> {/* Set button width to full and align content to start, add margin */}
            <LocalLibraryRoundedIcon /> Library
          </button>

          <button className="w-full flex items-center justify-start my-8 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg"> {/* Set button width to full and align content to start, add margin */}
            <PollRoundedIcon />/? Doubt and Poll
          </button>

          <button className="w-full flex items-center justify-start my-8 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg"> {/* Set button width to full and align content to start, add margin */}
            <ChecklistRtlRoundedIcon /> Attendance
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
