// src/components/sidebar/Sidebar.jsx
import React from 'react';
import HomeIcon from '@mui/icons-material/Home'; // Importing HomeIcon

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside className={`rounded-2xl m-2 bg-slate-200 text-orange-400 h-screen fixed transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-7 mx-4">
        <nav>
          <ul>
            <li className='hover:font-serif text-black hover:bg-orange-400 hover:text-white rounded-full p-3 m-2'>
              <HomeIcon /> Classroom {/* Using HomeIcon */}
            </li>
            <li>About</li>  
            <li>Contact</li>
            {/* Add more sidebar items as needed */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
