import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateEventForm.css';

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
    endTime: ''
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7283/api/Categories')
      .then(res => setCategories(res.data))
      .catch(() => alert("Failed to load categories"));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const uploadImageAndGetUrl = async (file) => {
    // Simulate image upload and return a URL
    return 'https://yourcdn.com/uploaded/' + file.name;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!formData.eventName || !formData.categoryID || !formData.eventDate) {
      alert("Please fill all required fields");
      return;
    }

    const imageUrl = image ? await uploadImageAndGetUrl(image) : '';

    // ✅ Payload matches backend model
    const payload = {
      EventName: formData.eventName,
      Description: formData.description,
      Location: formData.location,
      CategoryId: parseInt(formData.categoryID),
      TotalSeats: parseInt(formData.totalSeats),
      PricePerTicket: parseFloat(formData.pricePerTicket),
      EventDate: formData.eventDate,
      EventTime: formData.eventTime,
      EndTime: formData.endTime,
      ImagePath: imageUrl
    };

    console.log("Payload:", payload); // Debugging

    try {
      await axios.post('https://localhost:7283/api/Events/create', payload);
      alert("Event created successfully");
      // ✅ Reset form after success
      setFormData({
        eventName: '',
        description: '',
        location: '',
        categoryID: '',
        totalSeats: '',
        pricePerTicket: '',
        eventDate: '',
        eventTime: '',
        endTime: ''
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error creating event");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Your Event</h2>
      <form onSubmit={handleSubmit}>
        <input name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />

        <select name="categoryID" value={formData.categoryID} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryName}</option>
          ))}
        </select>

        <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} placeholder="Total Seats" />
        <input type="number" name="pricePerTicket" value={formData.pricePerTicket} onChange={handleChange} placeholder="Price Per Ticket" />
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
        <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="form-actions-separated">
          <button type="submit" className="submit-btn">Create Event</button>
          <button type="reset" className="reset-btn" onClick={() => setFormData({
            eventName: '', description: '', location: '', categoryID: '', totalSeats: '', pricePerTicket: '', eventDate: '', eventTime: '', endTime: ''
          })}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
