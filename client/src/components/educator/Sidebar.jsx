import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Sidebar = () => {
    const {isEducator} = useContext(AppContext);
    const menuItems = [
        { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
        { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
        { name: 'My course', path: '/educator/my-courses', icon: assets.my_course_icon },
        { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon }
    ];

    return isEducator&&(
        <div className="d-flex flex-column border-end min-vh-100 p-2 bg-light" style={{ width: '250px' }}>
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === '/educator'}
                    className={({ isActive }) =>
                        `d-flex align-items-center gap-2 p-3 text-decoration-none ${
                            isActive ? 'bg-primary text-white fw-semibold' : 'text-dark'
                        }`
                    }
                >
                    <img src={item.icon} alt={item.name} style={{ width: '20px', height: '20px' }} />
                    <span className="d-none d-md-inline">{item.name}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
