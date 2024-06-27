import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import TermsAndConditionsModal from './TermsAndConditionsModal'; 
import axios from 'axios';




const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co'; 
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw'; // Replace with your Supabase API key



 const supabase = createClient(supabaseUrl, supabaseApiKey);  

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#ff0068',
    color: '#fff',
    fontSize: '12px',
    fontFamily: 'Arial',
    padding: '20px', // Added padding for the container
    borderRadius: '10px', // Added border radius for a rounded appearance
  },
  header: {
    alignItems: 'left',
    justifyContent: 'space-between', // Adjusted spacing
    marginBottom: '20px',
    width: '20px',
  },
  formContainer: {
    backgroundColor: '#40E0D0',
    padding: '10px',
    borderRadius: '10px',
    width: '300px', // Adjusted width to make it smaller
    margin: '0 auto', // Centered the form container horizontally
    marginTop: '20px'
  },
  logoContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
  },
  
 
    logo: {
      height: '110px',
      width: 'auto',
      marginTop: '20px',
      backgroundColor: 'none',
      marginLeft: '-10px',
   
  },
  
  icon: {
    fontSize: '20px', // Increased font size for the icon
    marginBottom: '-3px', // Adjusted margin for icon
  },
  
  
  form: {
    display: 'grid',
    gap: '10px',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Arial',
    border: 'none',
    color: '#fff',
  },
  input: {
    width: '200px',
    padding: '12px',
    marginBottom: '10px', // Increased marginBottom for double lines
    display: 'grid',
    alignItems: 'left',
    margin: '10px auto',
    borderRadius: '20px',
  },
  
  button: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Arial',
    textAlign: 'center',
    width: '100px',
    margin: '20px auto',
    borderRadius: '20px',
  },
};



function App() {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleTermsClick = () => {
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Handle user registration and get user data
    console.log('Form data submitted:', formData);
    window.location.href = '/admin-login';
   
    const responseFacebook = (response) => {
      console.log('Facebook Login Response:', response);
      // Use the response to extract user information and update your state or perform any other actions
    };
    
  
    // Use a try-catch block to handle errors during Supabase interaction
    console.log('Submit button clicked');

    try {
      
      await axios.post('/api/formsubmit', formData); // Replace with your API endpoint URL
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  
    
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.header}></div>
     
      <div style={styles.logoContainer}>
  <div className="logo">
    <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
  </div>
</div>
     
      <div style={styles.header}></div>
      <h1><FaUser style={styles.icon} /> Sign Up Here!</h1>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>

          <label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>

          <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>

          <label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>

          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>

          <label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>

          <label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Contact Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
        
          <div style={styles.checkboxContainer}>
            
          
          </div>
          <div style={styles.checkboxContainer}>
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          style={styles.checkboxInput}
        />
        
        
        
        
        <label style={styles.checkboxLabel}>
          I agree to the{' '}
          <h2>
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleTermsClick}>
            
          </span>
        </h2>
        </label>
      </div>
      {showTermsModal && (
        <TermsAndConditionsModal handleClose={handleCloseTermsModal} />
      )}

          <button type="submit" style={styles.button}>
            Sign up
          </button>
          
          <div style={styles.links}>
            <p>Already have an account? <a href="/admin-login">Log in</a></p>
          </div>
          
        </form>
        
      </div>
      
    </div>
  );
}

export default App;