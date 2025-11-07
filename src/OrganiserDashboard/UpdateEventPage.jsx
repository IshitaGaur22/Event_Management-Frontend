import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdateEventPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const [formData, setFormData] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (event) setFormData({ ...event });
  }, [event]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.eventName.trim()) errors.eventName = "Event name is required.";
    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.totalSeats || parseInt(formData.totalSeats) <= 0) errors.totalSeats = "Total seats must be greater than 0.";
    if (!formData.pricePerTicket || parseFloat(formData.pricePerTicket) <= 0) errors.pricePerTicket = "Price must be greater than 0.";
    if (!formData.eventDate) errors.eventDate = "Event date is required.";
    if (!formData.eventTime) errors.eventTime = "Start time is required.";
    if (!formData.endTime) errors.endTime = "End time is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;

    const clientErrors = validateFields();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    const formatTime = (time) => {
      if (!time) return '';
      return time.length === 5 ? `${time}:00` : time;
    };

    const eventTimeFormatted = formatTime(formData.eventTime);
    const endTimeFormatted = formatTime(formData.endTime);

    const queryParams = new URLSearchParams({
      id: formData.eventID,
      name: formData.eventName,
      description: formData.description,
      location: formData.location,
      TotalSeats: formData.totalSeats,
      PricePerTicket: formData.pricePerTicket,
      date: formData.eventDate,
      time: eventTimeFormatted,
      endTime: endTimeFormatted,
      imagePath: formData.imagePath
    }).toString();

    try {
      const response = await fetch(`https://localhost:7283/api/Events/update-event?${queryParams}`, {
        method: 'PUT',
        headers: { 'accept': '*/*' }
      });

      if (response.ok) {
        toast.success("✅ Event updated successfully!");
        setTimeout(() => navigate('/'), 2000);
      } else {
        const errorData = await response.json();
        const mappedErrors = {};

        if (errorData?.error) {
          if (errorData.error.includes("already exists")) {
            mappedErrors.eventName = `Event with name '${formData.eventName}' already exists. Please choose a different name.`;
          } else {
            toast.error(`❌ ${errorData.error}`);
          }
        }

        setFieldErrors(mappedErrors);
      }
    } catch (err) {
      toast.error("❌ Error updating event");
      console.error(err);
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="update-event-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>Update Event</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          className={fieldErrors.eventName ? 'error' : ''}
        />
        {fieldErrors.eventName && <span className="error-text">{fieldErrors.eventName}</span>}

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={fieldErrors.description ? 'error' : ''}
        />
        {fieldErrors.description && <span className="error-text">{fieldErrors.description}</span>}

        <label>Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={fieldErrors.location ? 'error' : ''}
        />
        {fieldErrors.location && <span className="error-text">{fieldErrors.location}</span>}

        <label>Total Seats</label>
        <input
          type="number"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
          className={fieldErrors.totalSeats ? 'error' : ''}
        />
        {fieldErrors.totalSeats && <span className="error-text">{fieldErrors.totalSeats}</span>}

        <label>Price Per Ticket</label>
        <input
          type="number"
          name="pricePerTicket"
          value={formData.pricePerTicket}
          onChange={handleChange}
          className={fieldErrors.pricePerTicket ? 'error' : ''}
        />
        {fieldErrors.pricePerTicket && <span className="error-text">{fieldErrors.pricePerTicket}</span>}

        <label>Date</label>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className={fieldErrors.eventDate ? 'error' : ''}
        />
        {fieldErrors.eventDate && <span className="error-text">{fieldErrors.eventDate}</span>}

        <label>Start Time</label>
        <input
          type="time"
          name="eventTime"
          value={formData.eventTime}
          onChange={handleChange}
          className={fieldErrors.eventTime ? 'error' : ''}
        />
        {fieldErrors.eventTime && <span className="error-text">{fieldErrors.eventTime}</span>}

        <label>End Time</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className={fieldErrors.endTime ? 'error' : ''}
        />
        {fieldErrors.endTime && <span className="error-text">{fieldErrors.endTime}</span>}

        <label>Image URL</label>
        <input
          type="text"
          name="imagePath"
          value={formData.imagePath}
          onChange={handleChange}
          placeholder="Enter image URL"
          className={fieldErrors.imagePath ? 'error' : ''}
        />
        {fieldErrors.imagePath && <span className="error-text">{fieldErrors.imagePath}</span>}

        {formData.imagePath && (
          <img src={formData.imagePath} alt="Preview" className="preview-img" />
        )}

        <div className="form-buttons">
          <button type="submit" className="btn update">Update</button>
          <button type="button" className="btn cancel" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEventPage;