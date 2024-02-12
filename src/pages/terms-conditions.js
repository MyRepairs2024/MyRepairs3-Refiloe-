import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
    backgroundColor: '#ff0068',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Arial',
    padding: '20px',
    borderRadius: '10px',
  },
  formContainer: {
    backgroundColor: '#ffffff', // Change to white background for the form
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    margin: '20px auto', // Center the form horizontally
  },
  // ... rest of the styles ...
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
    agreeTerms: false,
  });

  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    window.location.href = '/Profile-Page';
  };

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <div style={styles.container}>
      <h1>Sign Up Here!</h1>
      {/* ... other components */}
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {/* ... other form fields */}
          <div>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label>
              I agree to the{' '}
              <span onClick={toggleTerms}>
                Terms and Conditions
              </span>
            </label>
          </div>
          <button type="submit">
            Sign up
          </button>
        </form>
      </div>
      {showTerms && (
        <div style={styles.formContainer}>
          <h2>Terms and Conditions</h2>
          <p>This is where you describe your terms and conditions.</p>
          <button onClick={toggleTerms}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;