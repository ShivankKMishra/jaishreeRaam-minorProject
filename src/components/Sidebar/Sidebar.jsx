import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside className={`rounded-2xl m-2 bg-slate-200 text-orange-400 h-screen fixed transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="w-full p-6 m-4">
        <nav>
          <ul>
            <li className='hover:font-serif text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg p-1 m-1'>
              <Link to="/Home" className="w-full flex items-center justify-start"> {/* Use Link component with 'to' attribute */}
                <HomeIcon /> Classroom
              </Link>
            </li>
            {/* Add more sidebar items as needed */}
          </ul>
        </nav>
        <div className='w-full flex flex-col justify-between m-1 p-1 item-end py-10'>
          <Link to="/Home/Library" className="w-full flex items-center justify-start my-8 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <LocalLibraryRoundedIcon /> Library
          </Link>

          <Link to="/Home/Doubt&Poll" className="w-full flex items-center justify-start my-8 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <PollRoundedIcon /> Doubt and Poll
          </Link>

          <Link to="/attendance" className="w-full flex items-center justify-start my-8 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <ChecklistRtlRoundedIcon /> Attendance
          </Link>

           <Link to="/Home/Feed" className="w-full flex items-center justify-start my-8 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
           <NewspaperIcon/>   Feed
          </Link>

          <Link to="/Home/Opportunities" className="w-full flex items-center justify-start my-8 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
           <AutoStoriesTwoToneIcon/>Opportunities 
          </Link>


        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
