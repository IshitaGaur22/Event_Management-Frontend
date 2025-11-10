// import React, { useState } from 'react';
// import './CreateCategory.css'; 
// import { FaPlusCircle } from 'react-icons/fa';

// const CreateCategory = () => {
//   const [categoryName, setCategoryName] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       categoryID: 0,
//       categoryName: categoryName
//     };

//     try {
//       const response = await fetch('https://localhost:7283/api/Categories', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': '*/*'
//         },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();

//       if (response.status === 201) {
//         setMessage(result.message);
//         setCategoryName('');
//       } else {
//         setMessage(result.error || 'Something went wrong.');
//       }
//     } catch (error) {
//       setMessage('Failed to connect to the server.');
//     }
//   };

//   return (
//     <div className="create-category-container">
//       <h2><FaPlusCircle /> Create New Category</h2>
//       <form className="create-category-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter category name"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           required
//         />
//         <button type="submit">Create Category</button>
//       </form>
//       {message && <div className="message">{message}</div>}
//     </div>
//   );
// };

// export default CreateCategory;





// // import React, { useState } from 'react';
// // // import './CreateCategory.css';
// // import { FaPlusCircle } from 'react-icons/fa';
// // import axios from 'axios';

// // const CreateCategory = ({ onCategoryCreated }) => {
// //   const [categoryName, setCategoryName] = useState('');
// //   const [message, setMessage] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!categoryName.trim()) {
// //       setMessage('Please enter a category name.');
// //       return;
// //     }

// //     const payload = {
// //       categoryID: 0,
// //       categoryName: categoryName.trim()
// //     };

// //     try {
// //       const response = await axios.post('https://localhost:7283/api/Categories', payload);

// //       if (response.status === 201) {
// //         setMessage('✅ Category created successfully!');
// //         setCategoryName('');
// //         if (onCategoryCreated) onCategoryCreated(); // Refresh categories
// //       } else {
// //         setMessage('❌ Something went wrong.');
// //       }
// //     } catch (error) {
// //       console.error('Error creating category:', error.response?.data || error.message);
// //       setMessage(error.response?.data?.title || '❌ Failed to create category.');
// //     }
// //   };

// //   return (
// //     <div className="create-category-container">
// //       <h2><FaPlusCircle /> Create New Category</h2>
// //       <form className="create-category-form" onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Enter category name"
// //           value={categoryName}
// //           onChange={(e) => setCategoryName(e.target.value)}
// //           required
// //         />
// //         <button type="submit">Create Category</button>
// //       </form>
// //       {message && <div className="message">{message}</div>}
// //     </div>
// //   );
// // };

// // export default CreateCategory;


import React, { useState } from 'react';
import './CreateCategory.css';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';

const CreateCategory = ({ onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');

  const validateCategoryName = (name) => {
    if (!name.trim()) return 'Please enter something.';
    if (!/[a-zA-Z]/.test(name)) return 'Must contain letters.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateCategoryName(categoryName);
    if (errorMsg) {
      setMessage(errorMsg);
      return;
    }

    const payload = {
      categoryID: 0,
      categoryName: categoryName.trim()
    };

    try {
      const response = await axios.post('https://localhost:7283/api/Categories', payload);

      if (response.status === 201) {
        setMessage('✅ Category created successfully!');
        setCategoryName('');
        if (onCategoryCreated) onCategoryCreated();
      } else {
        setMessage('❌ Something went wrong.');
      }
    } catch (error) {
      console.error('Error creating category:', error.response?.data || error.message);
      setMessage(error.response?.data?.title || '❌ Failed to create category.');
    }
  };

  return (
    <div className="create-category-container">
      {/* <h2><FaPlusCircle /> Create New Category</h2> */}
      <form className="create-category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit">Create Category</button>    
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default CreateCategory;