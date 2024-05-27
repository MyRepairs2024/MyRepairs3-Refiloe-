import React, { useState } from 'react';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor: '#ff0068',
    color: '#fff',
    fontSize: '18px',
    fontFamily: 'Arial',
    padding: '20px',
    borderRadius: '10px',
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
    width: '300px',
    margin: '0 auto',
  },
  logoContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
  },
  logo: {
    width: '170px', // Adjusted logo width
    height: 'auto', // Adjusted logo height to maintain aspect ratio
    borderRadius: '50%',
    backgroundColor: 'none',
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
  fileInput: {
    marginBottom: '10px',
  },
  textInput: {
    width: '100%',
    padding: '20px',
    marginBottom: '10px',
    boxSizing: 'border-box',
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
    width: '100px',
    margin: '20px auto',
    borderRadius: '20px',
  },
  
};

function ProfilePage() {
  const [files, setFiles] = useState({
    id: null,
    certificates: null,
    licenses: null,
    taxCertificate: null,
  });

  const [profileInfo, setProfileInfo] = useState({
    experiences: '',
    profileDescription: '',
  });

  const [userType, setUserType] = useState('freelancer'); // Default to freelancer

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    // Reset files when user type changes
    setFiles({
      id: null,
      certificates: null,
      licenses: null,
      taxCertificate: null,
    });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileType]: file,
    }));
  };

  const handleTextInputChange = (e, field) => {
    const value = e.target.value;
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the required files are missing based on user type
    const requiredFiles =
      userType === 'freelancer'
        ? ['id', 'certificates', 'taxCertificate']
        : ['id', 'certificates', 'licenses', 'taxCertificate'];

    const missingFiles = requiredFiles.filter((fileType) => !files[fileType]);

    if (missingFiles.length > 0) {
      alert('Please upload all required documents before saving your profile.');
      return; // Exit the function if files are missing
    }

    // Handle form submission
    console.log('Form data submitted:', { files, profileInfo });

    // Show alert for successful registration
    alert('Registration successful. We are verifying your information. We shall send you the login key in your email in 24 hours!');

    // Optionally, you can redirect the user to another page
    window.location.href = '/MyLogin';
  };

  return (
    <div style={styles.container}>
      <h1>Service Provider Profile</h1>
      <div style={styles.header}></div>
      <div style={styles.logoContainer}>
        <div className="logo">
          <img src="/logo-w.png" alt="My Repairs" style={styles.logo} />
        </div>
      </div>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label>
            User Type:
            <select value={userType} onChange={handleUserTypeChange}>
              <option value="freelancer">Freelancer</option>
              <option value="business">Business</option>
            </select>
          </label>
          <label>
            Upload ID:
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, 'id')}
              style={styles.fileInput}
            />
          </label>
          <label>
            Upload Certificates:
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, 'certificates')}
              style={styles.fileInput}
            />
          </label>
          {userType === 'business' && (
            <label>
              Upload Licenses:
              <input
                type="file"
                accept=".pdf, .jpg, .png"
                onChange={(e) => handleFileChange(e, 'licenses')}
                style={styles.fileInput}
              />
            </label>
          )}
          <label>
            Police Clearanace/Criminal Record Check:
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={(e) => handleFileChange(e, 'taxCertificate')}
              style={styles.fileInput}
            />
          </label>
          <label>
            Experiences:
            <textarea
              rows="4"
              onChange={(e) => handleTextInputChange(e, 'experiences')}
              value={profileInfo.experiences}
              style={styles.textInput}
            />
          </label>
          <label>
            Profile Description:
            <textarea
              rows="4"
              onChange={(e) => handleTextInputChange(e, 'profileDescription')}
              value={profileInfo.profileDescription}
              style={styles.textInput}
            />
          </label>
          <button type="submit" style={styles.button}>
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;