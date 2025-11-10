// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import CountUp from 'react-countup';
// import axios from 'axios';
// import EventTable from './EventTable';
// // import CreateCategory from './CreateCategory';
// import { FaCalendarAlt, FaUsers, FaMoneyBillWave, FaClipboardList, FaMusic, FaLaughBeam, FaTheaterMasks, FaGlassCheers, FaUtensils, FaFutbol } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';



// const iconMap = {
//   Music: <FaMusic className="category-icon" />,
//   Comedy: <FaLaughBeam className="category-icon" />,
//   Performances: <FaTheaterMasks className="category-icon" />,
//   NightLife: <FaGlassCheers className="category-icon" />,
//   'Food & Drinks': <FaUtensils className="category-icon" />,
//   Sports: <FaFutbol className="category-icon" />
// };

// const Dashboard = () => {
//   const{role}=useAuth();
//   const [stats, setStats] = useState({ events: 0, bookings: 0, revenue: 0, users: 0 });
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [showInput, setShowInput] = useState(false);
//   const [categoryName, setCategoryName] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const fetchStats = async () => {
//     try {
//       const [eventsRes, usersRes, bookingsRes, revenueRes] = await Promise.all([
//         axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Events'),
//         axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Users'),
//         axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Bookings'),
//         axios.get('https://localhost:7283/api/Events/Total%20Revenue%20Generated'),
//       ]);

//       setStats({
//         events: Number(eventsRes.data),
//         users: Number(usersRes.data),
//         bookings: Number(bookingsRes.data),
//         revenue: Number(revenueRes.data),
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('https://localhost:7283/api/Categories');
//       setCategories(response.data);
//     } catch {
//       console.error('Failed to load categories');
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchCategories();
//   }, []);

//   const handleCreateCategory = async () => {
//     if (!categoryName.trim()) {
//       setMessage('Please enter a category name.');
//       return;
//     }
//     try {
//       const response = await axios.post('https://localhost:7283/api/Categories', { categoryName });
//       if (response.status === 201) {
//         setMessage('✅ Category created successfully!');
//         setCategoryName('');
//         setShowInput(false);
//         fetchCategories();
//       }
//     } catch (error) {
//       setMessage('❌ Failed to create category.');
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {loading ? (
//         <div className="spinner"></div>
//       ) : (
//         <>
//           {/* Stats */}
//           <div className="dashboard-card">
//             <div className="stats-row">
//               <div className="stat-block"><FaCalendarAlt /><h2>Total Events</h2><CountUp end={stats.events} duration={2} /></div>
//               <div className="stat-block"><FaUsers /><h2>Total Users</h2><CountUp end={stats.users} duration={2} /></div>
//               <div className="stat-block"><FaClipboardList /><h2>Total Bookings</h2><CountUp end={stats.bookings} duration={2} /></div>
//               <div className="stat-block"><FaMoneyBillWave /><h2>Total Revenue</h2>₹<CountUp end={stats.revenue} duration={2} separator="," decimals={2} /></div>
//             </div>
//           </div>

//           {/* Categories with Add Category Card */}
//           <div className="dashboard-card">
//             <div className="category-grid">
//               {categories.map(cat => (
//                 <div key={cat.categoryID} className="category-card">
//                   {iconMap[cat.categoryName] || <span className="category-icon">📦</span>}
//                   <h2>{cat.categoryName}</h2>
//                 </div>
//               ))}

//               {/* Add Category Card */}
//               <div className="category-card add-category-card">
//                 {!showInput ? (
//                   <div className="add-icon" onClick={() => setShowInput(true)}>+</div>
//                 ) : (
//                   <div className="add-category-form">
//                     <input
//                       type="text"
//                       placeholder="Enter category name"
//                       value={categoryName}
//                       onChange={(e) => setCategoryName(e.target.value)}
//                     />
//                     <div className="form-buttons">
//                       <button className="btn add" onClick={handleCreateCategory}>Add</button>
//                       <button className="btn cancel" onClick={() => { setShowInput(false); setCategoryName(''); }}>Cancel</button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {message && <p className="message">{message}</p>}
//           </div>

//           {/* Events Table */}
//           <div className="dashboard-card">
//             <EventTable />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import CountUp from 'react-countup';
// import axios from 'axios';
// import CreateCategory from './CreateCategory';
// import EventTable from './EventTable';

// import {
//   FaCalendarAlt, FaUsers, FaMoneyBillWave, FaClipboardList,
//   FaMusic, FaLaughBeam, FaTheaterMasks, FaGlassCheers,
//   FaUtensils, FaFutbol
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// const iconMap = {
//   Music: <FaMusic className="category-icon" />,
//   Comedy: <FaLaughBeam className="category-icon" />,
//   Performance: <FaTheaterMasks className="category-icon" />,
//   NightLife: <FaGlassCheers className="category-icon" />,
//   'Food & Drinks': <FaUtensils className="category-icon" />,
//   Sports: <FaFutbol className="category-icon" />
// };

// const Dashboard = () => {
//   const { role } = useAuth();
//   const [stats, setStats] = useState({ events: 0, bookings: 0, revenue: 0, users: 0 });
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [categoryName, setCategoryName] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const fetchStats = async () => {
//     try {
//       const [eventsRes, usersRes, bookingsRes, revenueRes] = await Promise.all([
//         axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Events'),
//         axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Users'),
//         axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Bookings'),
//         axios.get('https://localhost:7283/api/Events/Total%20Revenue%20Generated'),
//       ]);

//       setStats({
//         events: Number(eventsRes.data),
//         users: Number(usersRes.data),
//         bookings: Number(bookingsRes.data),
//         revenue: Number(revenueRes.data),
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('https://localhost:7283/api/Categories');
//       setCategories(response.data);
//     } catch {
//       console.error('Failed to load categories');
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchCategories();
//   }, []);

//   const validateCategoryName = (name) => {
//     if (!name.trim()) return 'Please enter something.';
//     if (!/[a-zA-Z]/.test(name)) return 'Must contain letters.';
//     return '';
//   };

//   const handleCreateCategory = async () => {
//     const errorMsg = validateCategoryName(categoryName);
//     if (errorMsg) {
//       setMessage(errorMsg);
//       return;
//     }

//     try {
//       const response = await axios.post('https://localhost:7283/api/Categories', {
//         categoryID: 0,
//         categoryName: categoryName.trim()
//       });

//       if (response.status === 201) {
//         setMessage('✅ Category created successfully!');
//         setCategoryName('');
//         setShowPopup(false);
//         fetchCategories();
//       } else {
//         setMessage('❌ Something went wrong.');
//       }
//     } catch (error) {
//       console.error('Error creating category:', error.response?.data || error.message);
//       setMessage(error.response?.data?.title || '❌ Failed to create category.');
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {loading ? (
//         <div className="spinner"></div>
//       ) : (
//         <>
//           {/* Stats */}
//           <div className="dashboard-card">
//             <div className="stats-row">
//               <div className="stat-block"><FaCalendarAlt /><h2>Total Events</h2><CountUp end={stats.events} duration={2} /></div>
//               <div className="stat-block"><FaUsers /><h2>Total Users</h2><CountUp end={stats.users} duration={2} /></div>
//               <div className="stat-block"><FaClipboardList /><h2>Total Bookings</h2><CountUp end={stats.bookings} duration={2} /></div>
//               <div className="stat-block"><FaMoneyBillWave /><h2>Total Revenue</h2>₹<CountUp end={stats.revenue} duration={2} separator="," decimals={2} /></div>
//             </div>
//           </div>

//           {/* Categories Grid */}
//           <div className="dashboard-card">
//             <div className="category-grid">
//               {categories.map(cat => (
//                 <div key={cat.categoryID} className="category-card">
//                   {iconMap[cat.categoryName] || <span className="category-icon">📦</span>}
//                   <h2>{cat.categoryName}</h2>
//                 </div>
//               ))}

//               {/* Animated Plus Card */}
//               <div
//                 className={`category-card add-category-card ${!showPopup ? 'animate' : ''}`}
//                 onClick={() => setShowPopup(true)}
//               >
//                 <span className="plus-icon">+</span>
//               </div>
//             </div>
//           </div>

//           {/* Popup for Adding Category */}
          
// {showPopup && (
//   <div className="popup-overlay">
//     <div className="popup-box">
//       <CreateCategory onCategoryCreated={() => {
//         fetchCategories(); // Refresh category list
//         setShowPopup(false); // Close popup
//       }} />
//       <button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
//     </div>
//   </div>
// )}
//           {/* {showPopup && (
//             <div className="popup-overlay">
//               <div className="popup-box">
//                 <h3>Add New Category</h3>
//                 <input
//                   type="text"
//                   placeholder="Enter category name"
//                   value={categoryName}
//                   onChange={(e) => setCategoryName(e.target.value)}
//                 />
//                 {message && <p className="message">{message}</p>}
//                 <div className="popup-buttons">
//                   <button className="btn create" onClick={handleCreateCategory}>Create</button>
//                   <button className="btn cancel" onClick={() => { setShowPopup(false); setCategoryName(''); setMessage(''); }}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           )} */}

//           {/* Events Table */}
//           <div className="dashboard-card">
//             <EventTable />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import CountUp from 'react-countup';
import axios from 'axios';
import EventTable from './EventTable';
import CreateCategory from './CreateCategory';
import {
  FaCalendarAlt, FaUsers, FaMoneyBillWave, FaClipboardList,
  FaMusic, FaLaughBeam, FaTheaterMasks, FaGlassCheers,
  FaUtensils, FaFutbol
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const iconMap = {
  Music: <FaMusic className="category-icon" />,
  Comedy: <FaLaughBeam className="category-icon" />,
  Performance: <FaTheaterMasks className="category-icon" />,
  NightLife: <FaGlassCheers className="category-icon" />,
  'Food & Drinks': <FaUtensils className="category-icon" />,
  Sports: <FaFutbol className="category-icon" />
};

const Dashboard = () => {
  const { role } = useAuth();
  const [stats, setStats] = useState({ events: 0, bookings: 0, revenue: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const [eventsRes, usersRes, bookingsRes, revenueRes] = await Promise.all([
        axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Events'),
        axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Users'),
        axios.get('https://localhost:7283/api/Events/Total%20Number%20Of%20Bookings'),
        axios.get('https://localhost:7283/api/Events/Total%20Revenue%20Generated'),
      ]);

      setStats({
        events: Number(eventsRes.data),
        users: Number(usersRes.data),
        bookings: Number(bookingsRes.data),
        revenue: Number(revenueRes.data),
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://localhost:7283/api/Categories');
      setCategories(response.data);
    } catch {
      console.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchStats();
    fetchCategories();
  }, []);

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {/* Stats */}
          <div className="dashboard-card">
            <div className="stats-row">
              <div className="stat-block"><FaCalendarAlt /><h2>Total Events</h2><CountUp end={stats.events} duration={2} /></div>
              <div className="stat-block"><FaUsers /><h2>Total Users</h2><CountUp end={stats.users} duration={2} /></div>
              <div className="stat-block"><FaClipboardList /><h2>Total Bookings</h2><CountUp end={stats.bookings} duration={2} /></div>
              <div className="stat-block"><FaMoneyBillWave /><h2>Total Revenue</h2>₹<CountUp end={stats.revenue} duration={2} separator="," decimals={2} /></div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="dashboard-card">
            <div className="category-grid">
              {categories.map(cat => (
                <div key={cat.categoryID} className="category-card">
                  {iconMap[cat.categoryName] || <span className="category-icon">📦</span>}
                  <h2>{cat.categoryName}</h2>
                </div>
              ))}

              {/* Animated Plus Card */}
              <div
                className={`category-card add-category-card ${!showPopup ? 'animate' : ''}`}
                onClick={() => setShowPopup(true)}
              >
                <span className="plus-icon">+</span>
              </div>
            </div>
          </div>

          {/* Popup for Adding Category */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-box">
                <CreateCategory onCategoryCreated={() => {
                  fetchCategories();
                  setShowPopup(false);
                }} />
                <button className="close-btn" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          )}

          {/* Events Table */}
          <div className="dashboard-card">
            <EventTable />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;