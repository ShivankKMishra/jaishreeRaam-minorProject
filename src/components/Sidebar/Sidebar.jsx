import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Sidebar({ isOpen, toggleSidebar }) {
  const handleLinkClick = () => {
    if (window.innerWidth <= 640 && isOpen) {
      toggleSidebar();
    }
  };

  return (
    <aside className={`rounded-2xl mr-1 bg-slate-200 text-orange-400 fixed transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:w-2/12 md:w-1/5 lg:w-1/6 xl:w-2/12`}>
      <div className="w-full p-6 mr-4">
        <div className='w-full flex flex-col justify-between m-1 p-1 item-end py-10'>
          <Link to="/Home" onClick={handleLinkClick} className="w-full flex items-center justify-start my-5 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg"> 
            <span className="hidden sm:inline-block">Classroom</span>
            <HomeIcon className="sm:hidden" />
          </Link>
          <Link to="/Home/Library" onClick={handleLinkClick} className="w-full flex items-center justify-start my-5 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <span className="hidden sm:inline-block">Library</span>
            <LocalLibraryRoundedIcon className="sm:hidden" />
          </Link>
          <Link to="/Home/Doubt&Poll" onClick={handleLinkClick} className="w-full flex items-center justify-start my-5 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <span className="hidden sm:inline-block">Doubt and Poll</span>
            <PollRoundedIcon className="sm:hidden" />
          </Link>
          <Link to="/Home/Attendence" onClick={handleLinkClick} className="w-full flex items-center justify-start my-5 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <span className="hidden sm:inline-block">Attendance</span>
            <ChecklistRtlRoundedIcon className="sm:hidden" />
          </Link>
          <Link to="/Home/Feed" onClick={handleLinkClick} className="w-full flex items-center justify-start my-5 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <span className="hidden sm:inline-block">Feed</span>
            <NewspaperIcon className="sm:hidden" />
          </Link>
          <Link to="/Home/Opportunities" onClick={handleLinkClick} className="w-full flex items-center justify-start my-5 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <span className="hidden sm:inline-block">Opportunities</span>
            <AutoStoriesTwoToneIcon className="sm:hidden" />
          </Link>
          <Link to="/Home/RgpvCalender" onClick={handleLinkClick} className="w-full flex items-center justify-start my-5 hover:font-serif m-1 p-1 text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg">
            <span className="hidden sm:inline-block">RgpvCalender</span>
            <CalendarMonthIcon className="sm:hidden" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
