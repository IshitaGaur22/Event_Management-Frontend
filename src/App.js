import React, { useState } from 'react';
import './App.css';
import FeedbackAdmin from './Feedback/FeedbackAdmin';
import SubmitFeedback from './Feedback/SubmitFeedback';

function App() {
  // State to control which view is active
  const [showList, setShowList] = useState(false);

  // This function will be passed to the components to toggle the view
  const toggleView = () => {
    setShowList(prevShowList => !prevShowList);
  };

  return (
    <div className="App">
        
        {showList ? (<FeedbackAdmin onShowForm={toggleView} />) 
        : (<SubmitFeedback onViewPrevious={toggleView} />)
        }
    </div>
  );
}

export default App;