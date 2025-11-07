import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './OrganiserDashboard/Dashboard';
import CreateEventForm from './OrganiserDashboard/CreateEventForm';
import UpdateEventPage from './OrganiserDashboard/UpdateEventPage';
import EventDetails from './OrganiserDashboard/EventDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEventForm />} />
        <Route path="/update-event" element={<UpdateEventPage />} />
        <Route path="/event-details" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


