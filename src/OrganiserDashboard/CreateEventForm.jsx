// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './CreateEventForm.css';

// // const CreateEventForm = () => {
// //   const [formData, setFormData] = useState({
// //     eventName: '',
// //     description: '',
// //     location: '',
// //     categoryName: '',
// //     totalSeats: '',
// //     pricePerTicket: '',
// //     eventDate: '',
// //     eventTime: '',
// //     endTime: ''
// //   });

// //   const [image, setImage] = useState(null);
// //   const [categories, setCategories] = useState([]);

// //   useEffect(() => {
// //     axios.get('https://localhost:7283/api/Categories')
// //       .then(res => setCategories(res.data))
// //       .catch(() => alert("Failed to load categories"));
// //   }, []);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) setImage(file);
// //   };

// //   const uploadImageAndGetUrl = async (file) => {
// //     // Simulate image upload and return a URL
// //     return 'https://yourcdn.com/uploaded/' + file.name;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const selectedCategory = categories.find(cat => cat.categoryName === formData.categoryName);
// //     if (!selectedCategory) return alert("Invalid category");

// //     const imageUrl = image ? await uploadImageAndGetUrl(image) : '';

// //     const payload = {
// //       ...formData,
// //       categoryID: selectedCategory.categoryID,
// //       ImagePath: imageUrl
// //     };

// //     try {
// //       await axios.post('https://localhost:7283/api/Events/create', payload);
// //       alert("Event created successfully");
// //     } catch (err) {
// //       alert("Error creating event");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" />
// //       <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
// //       <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
// //       <select name="categoryName" value={formData.categoryName} onChange={handleChange}>
// //         <option value="">Select Category</option>
// //         {categories.map(cat => (
// //           <option key={cat.categoryID} value={cat.categoryName}>{cat.categoryName}</option>
// //         ))}
// //       </select>
// //       <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} placeholder="Total Seats" />
// //       <input type="number" name="pricePerTicket" value={formData.pricePerTicket} onChange={handleChange} placeholder="Price Per Ticket" />
// //       <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
// //       <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
// //       <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
// //       <input type="file" accept="image/*" onChange={handleImageChange} />
// //       <button type="submit">Create Event</button>
// //     </form>
// //   );
// // };

// // export default CreateEventForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CreateEventForm.css';

// const CreateEventForm = () => {
//   const [formData, setFormData] = useState({
//     eventName: '',
//     description: '',
//     location: '',
//     categoryID: '', // ✅ Use ID instead of name
//     totalSeats: '',
//     pricePerTicket: '',
//     eventDate: '',
//     eventTime: '',
//     endTime: ''
//   });

//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios.get('https://localhost:7283/api/Categories')
//       .then(res => setCategories(res.data))
//       .catch(() => alert("Failed to load categories"));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setImage(file);
//   };

//   const uploadImageAndGetUrl = async (file) => {
//     return 'https://yourcdn.com/uploaded/' + file.name;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.categoryID) return alert("Please select a category");

//     const imageUrl = image ? await uploadImageAndGetUrl(image) : '';

//     const payload = {
//       ...formData,
//       ImagePath: imageUrl
//     };

//     try {
//       await axios.post('https://localhost:7283/api/Events/create', payload);
//       alert("Event created successfully");
//     } catch (err) {
//       alert("Error creating event");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Create Your Event</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" />
//         <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        
//         <select name="categoryID" value={formData.categoryID} onChange={handleChange}>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryName}</option>
//           ))}
//         </select>

//         <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} placeholder="Total Seats" />
//         <input type="number" name="pricePerTicket" value={formData.pricePerTicket} onChange={handleChange} placeholder="Price Per Ticket" />
//         <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
//         <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
//         <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
        
//         <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
        
//         <input type="file" accept="image/*" onChange={handleImageChange} />
        
//         <div className="form-actions-separated">
//           <button type="submit" className="submit-btn">Create Event</button>
//           <button type="reset" className="reset-btn" onClick={() => setFormData({
//             eventName: '', description: '', location: '', categoryID: '', totalSeats: '', pricePerTicket: '', eventDate: '', eventTime: '', endTime: ''
//           })}>Reset</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateEventForm;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CreateEventForm.css';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CreateEventForm = () => {
//   const [formData, setFormData] = useState({
//     eventName: '',
//     description: '',
//     location: '',
//     categoryID: '',
//     totalSeats: '',
//     pricePerTicket: '',
//     eventDate: '',
//     eventTime: '',
//     endTime: ''
//   });
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('https://localhost:7283/api/Categories')
//       .then(res => setCategories(res.data))
//       .catch(() => toast.error("Failed to load categories"));
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
//   const handleImageChange = (e) => setImage(e.target.files[0]);

//   const uploadImageAndGetUrl = async (file) => {
//     return 'https://yourcdn.com/uploaded/' + file.name;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.eventName || !formData.categoryID || !formData.eventDate) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     if (parseInt(formData.totalSeats) <= 0 || parseFloat(formData.pricePerTicket) <= 0) {
//       toast.error("Seats and Price must be greater than 0");
//       return;
//     }

//     const imageUrl = image ? await uploadImageAndGetUrl(image) : '';
//     const eventTimeFormatted = formData.eventTime ? `${formData.eventTime}:00` : '';
//     const endTimeFormatted = formData.endTime ? `${formData.endTime}:00` : '';

//     const payload = {
//       eventName: formData.eventName,
//       description: formData.description,
//       location: formData.location,
//       categoryID: parseInt(formData.categoryID),
//       totalSeats: parseInt(formData.totalSeats),
//       pricePerTicket: parseFloat(formData.pricePerTicket),
//       eventDate: formData.eventDate,
//       eventTime: eventTimeFormatted,
//       endTime: endTimeFormatted,
//       imagePath: imageUrl
//     };

//     try {
//       await axios.post('https://localhost:7283/api/Events/create', payload, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       toast.success("✅ Event created successfully!");
//       setTimeout(() => navigate('/'), 2000);
//     } catch (err) {
//       console.error("Error Response:", err.response?.data);
//       toast.error("❌ Error creating event: " + (err.response?.data || "Bad Request"));
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       eventName: '',
//       description: '',
//       location: '',
//       categoryID: '',
//       totalSeats: '',
//       pricePerTicket: '',
//       eventDate: '',
//       eventTime: '',
//       endTime: ''
//     });
//     setImage(null);
//   };

//   return (
//     <div className="form-container">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
//       <h2 className="form-title">Create Your Event</h2>
//       <form className="event-form" onSubmit={handleSubmit}>
//         <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" />
//         <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
//         <select name="categoryID" value={formData.categoryID} onChange={handleChange}>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryName}</option>
//           ))}
//         </select>
//         <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} placeholder="Total Seats" />
//         <input type="number" name="pricePerTicket" value={formData.pricePerTicket} onChange={handleChange} placeholder="Price Per Ticket" />
//         <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
//         <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
//         <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
//         <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         {image && <img src={URL.createObjectURL(image)} alt="Preview" className="preview-img" />}
//         <div className="form-actions">
//           <button type="submit" className="submit-btn">Create Event</button>
//           <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateEventForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CreateEventForm.css';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CreateEventForm = () => {
//   const [formData, setFormData] = useState({
//     eventName: '',
//     description: '',
//     location: '',
//     categoryID: '',
//     totalSeats: '',
//     pricePerTicket: '',
//     eventDate: '',
//     eventTime: '',
//     endTime: '',
//     imagePath: ''
//   });
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('https://localhost:7283/api/Categories')
//       .then(res => setCategories(res.data))
//       .catch(() => toast.error("Failed to load categories"));
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.eventName || !formData.categoryID || !formData.eventDate) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     if (parseInt(formData.totalSeats) <= 0 || parseFloat(formData.pricePerTicket) <= 0) {
//       toast.error("Seats and Price must be greater than 0");
//       return;
//     }

//     const eventTimeFormatted = formData.eventTime ? `${formData.eventTime}:00` : '';
//     const endTimeFormatted = formData.endTime ? `${formData.endTime}:00` : '';

//     const payload = {
//       eventName: formData.eventName,
//       description: formData.description,
//       location: formData.location,
//       categoryID: parseInt(formData.categoryID),
//       totalSeats: parseInt(formData.totalSeats),
//       pricePerTicket: parseFloat(formData.pricePerTicket),
//       eventDate: formData.eventDate,
//       eventTime: eventTimeFormatted,
//       endTime: endTimeFormatted,
//       imagePath: formData.imagePath
//     };

//     try {
//       await axios.post('https://localhost:7283/api/Events/create', payload, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       toast.success("✅ Event created successfully!");
//       setTimeout(() => navigate('/'), 2000);
//     } catch (err) {
//       console.error("Error Response:", err.response?.data);
//       toast.error("❌ Error creating event: " + (err.response?.data || "Bad Request"));
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       eventName: '',
//       description: '',
//       location: '',
//       categoryID: '',
//       totalSeats: '',
//       pricePerTicket: '',
//       eventDate: '',
//       eventTime: '',
//       endTime: '',
//       imagePath: ''
//     });
//   };

//   return (
//     <div className="form-container">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
//       <h2 className="form-title">Create Your Event</h2>
//       <form className="event-form" onSubmit={handleSubmit}>
//         <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" />
//         <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
//         <select name="categoryID" value={formData.categoryID} onChange={handleChange}>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryName}</option>
//           ))}
//         </select>
//         <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} placeholder="Total Seats" />
//         <input type="number" name="pricePerTicket" value={formData.pricePerTicket} onChange={handleChange} placeholder="Price Per Ticket" />
//         <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
//         <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
//         <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
//         <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
//         <input type="text" name="imagePath" value={formData.imagePath} onChange={handleChange} placeholder="Enter image URL" />
//         <div className="form-actions">
//           <button type="submit" className="submit-btn">Create Event</button>
//           <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateEventForm;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateEventForm.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    location: '',
    categoryID: '',
    totalSeats: '',
    pricePerTicket: '',
    eventDate: '',
    eventTime: '',
    endTime: '',
    imagePath: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7283/api/Categories')
      .then(res => setCategories(res.data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.eventName.trim()) errors.eventName = "Event name is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.categoryID) errors.categoryID = "Category is required.";
    if (!formData.totalSeats || parseInt(formData.totalSeats) <= 0) errors.totalSeats = "Total seats must be greater than 0.";
    if (!formData.pricePerTicket || parseFloat(formData.pricePerTicket) <= 0) errors.pricePerTicket = "Price must be greater than 0.";
    if (!formData.eventDate) errors.eventDate = "Event date is required.";
    if (!formData.eventTime) errors.eventTime = "Start time is required.";
    if (!formData.endTime) errors.endTime = "End time is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientErrors = validateFields();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    const eventTimeFormatted = formData.eventTime ? `${formData.eventTime}:00` : '';
    const endTimeFormatted = formData.endTime ? `${formData.endTime}:00` : '';

    const payload = {
      EventID: 0,
      EventName: formData.eventName,
      Description: formData.description,
      Location: formData.location,
      CategoryID: parseInt(formData.categoryID),
      TotalSeats: parseInt(formData.totalSeats),
      PricePerTicket: parseFloat(formData.pricePerTicket),
      EventDate: formData.eventDate,
      EventTime: eventTimeFormatted,
      EndTime: endTimeFormatted,
      ImagePath: formData.imagePath || "https://via.placeholder.com/300"
    };

    console.log("Sending payload:", payload);

    try {
      const response = await axios.post('https://localhost:7283/api/Events/create', payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("🎉 Event created successfully!");
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error("❌ Failed to create event");
      }
    } catch (err) {
      console.error("Error response:", err.response);
      const errors = err.response?.data?.errors;
      const message = err.response?.data?.error;
      const mappedErrors = {};

      if (errors) {
        Object.entries(errors).forEach(([field, messages]) => {
          mappedErrors[field.charAt(0).toLowerCase() + field.slice(1)] = messages[0];
        });
      }

      if (message && message.includes("already exists")) {
        mappedErrors.eventName = `Event with '${formData.eventName}' already exists, try another name.`;
      }

      setFieldErrors(mappedErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      eventName: '',
      description: '',
      location: '',
      categoryID: '',
      totalSeats: '',
      pricePerTicket: '',
      eventDate: '',
      eventTime: '',
      endTime: '',
      imagePath: ''
    });
    setFieldErrors({});
  };

  return (
    <div className="form-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="form-title">Create Your Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" />
        {fieldErrors.eventName && <span className="error-text">{fieldErrors.eventName}</span>}

        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        {fieldErrors.location && <span className="error-text">{fieldErrors.location}</span>}

        <select name="categoryID" value={formData.categoryID} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryName}</option>
          ))}
        </select>
        {fieldErrors.categoryID && <span className="error-text">{fieldErrors.categoryID}</span>}

        <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} placeholder="Total Seats" />
        {fieldErrors.totalSeats && <span className="error-text">{fieldErrors.totalSeats}</span>}

        <input type="number" name="pricePerTicket" value={formData.pricePerTicket} onChange={handleChange} placeholder="Price Per Ticket" />
        {fieldErrors.pricePerTicket && <span className="error-text">{fieldErrors.pricePerTicket}</span>}

        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
        {fieldErrors.eventDate && <span className="error-text">{fieldErrors.eventDate}</span>}

        <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
        {fieldErrors.eventTime && <span className="error-text">{fieldErrors.eventTime}</span>}

        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
        {fieldErrors.endTime && <span className="error-text">{fieldErrors.endTime}</span>}

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
        {fieldErrors.description && <span className="error-text">{fieldErrors.description}</span>}

        <input type="text" name="imagePath" value={formData.imagePath} onChange={handleChange} placeholder="Enter image URL" />
        {fieldErrors.imagePath && <span className="error-text">{fieldErrors.imagePath}</span>}

        <div className="form-actions">
          <button type="submit" className="submit-btn">Create Event</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;