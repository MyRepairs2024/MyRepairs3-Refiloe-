import React from 'react';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaStar, FaHome } from 'react-icons/fa';
import Dashheader from './components/dashheader';
import axios from 'axios';
import { Products } from './components/services';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import ServiceDetail from './components/serviceorder';
import { useHistory } from 'react-router-dom';
import { IoWarningSharp } from 'react-icons/io5';
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import jsPDF from 'jspdf';
import { FaHeart } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';




const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';

const supabase = createClient(supabaseUrl, supabaseApiKey);


const UserDashboard = () => {
 

  const router = useRouter();
  const { userEmail } = router.query;
  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : '';
  const [services, setServices] = useState([]);
  const firstTenServices = services.slice(0, 10);
  const [activeTab, setActiveTab] = useState('overview');
  const[activeTab2, setActiveTab2] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const [expandedServicesDone, setExpandedServicesDone] = useState(false);
  const [expandedPendingServices, setExpandedPendingServices] = useState(false);
  const [expandedRewards, setExpandedRewards] = useState(false);
  const [servicesDoneProgress, setServicesDoneProgress] = useState(0);
  const [pendingServicesProgress, setPendingServicesProgress] = useState(0);
  const [rewardsProgress, setRewardsProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [selectedService, setSelectedService] = useState(null);
  const [serviceTypeFilter, setServiceTypeFilter] = useState(''); // Filter by service type
  const [providerEmailFilter, setProviderEmailFilter] = useState(''); // Filter by provider email
  const [priceRangeFilter, setPriceRangeFilter] = useState(''); // Filter by price range
  const [locationFilter, setLocationFilter] = useState(''); // Filter by location
  const [filteredServices, setFilteredServices] = useState(services); // Store filtered services
const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [pendingRequests, setPendingRequests] = useState(null);
const [isServicesDoneVisible, setIsServicesDoneVisible] = useState(false);
const [isPendingServicesVisible, setIsPendingServicesVisible] = useState(false);
const [isRewardsVisible, setIsRewardsVisible] = useState(false);
const [rewardsData, setRewardsData] = useState(null);
const [servicesDoneData, setServicesDoneData] = useState(null);
const [alertVisible, setAlertVisible] = useState(false);
const [receiptdata, setreceiptData] = useState([]);
const [editMode, setEditMode] = useState(false);
const [containers, setContainers] = useState([]);
const [location, setLocation] = useState('');



  const toggleEdit = () => {
    setEditMode(!editMode);
  };

const handleShowAlert = () => {
  setAlertVisible(true);
};

const handleCloseAlert = () => {
  setAlertVisible(false);
};

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

    const closeServiceDetail = () => {
    setSelectedService(null);
  };

  
  const [formData, setFormData] = useState({
    businesstype: '',
    providertype: '',
    name: '',
    surname: '',
    contactnumber: '',
    address: '',
    licenses: '',
    communication: '',
    experience: '',
    insurance: '',
    workquality: '',
   
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

    const searchServicesDone = async () => {
      // Perform the database query for services done here
      const { data, error } = await supabase
        .from('services_done') // Replace with your table name
        .select()
        .eq('user_email', userData.email); // Replace with the appropriate column name for the user's email
    
      if (error) {
        console.error('Error searching for services done:', error.message);
        return;
      }
    
      // Update the servicesDoneData state with the query result
      setServicesDoneData(data);
    };
    const UserDashboardDashboard = () => {
      return (
        <ResponsiveLayout>
          {/* Your customer dashboard content goes here */}
          <h1>Customer Dashboard</h1>
        </ResponsiveLayout>
      );
    };
    
    
 

  
    
    const handleSuccessfulLogin = (email) => {
      setEmail(email); // Set the username in the state
    };
    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
      }
    };

    const uploadImage = async () => {
      if (!selectedFile) {
        console.error('No file selected.');
        return;
      }
  
      try {
        const file = selectedFile;
        const { data, error } = await supabase.storage.from('UserPictures').upload(file.name, file);
  
        if (data) {
          console.log('Image uploaded successfully:', data.Key);
  
          // Insert the image URL into your Supabase table
          const imageUrl = `${supabaseUrl}/storage/v1/uploads/${data.Key}`;
          await insertImageUrl(imageUrl);
  
          // Set the uploaded image URL in the state
          setImageUrl(imageUrl);
        } else {
          console.error('Error uploading image:', error);
        }
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    };
    const insertImageUrl = async (imageUrl) => {
      try {
        const { data, error } = await supabase
          .from('UserProfile') // Replace with your table name
          .insert([
            {
              bio: imageUrl, // Replace with your column name for the image URL
            },
          ]);
  
        if (data) {
          console.log('Image URL inserted successfully.');
        } else {
          console.error('Error inserting image URL:', error);
        }
      } catch (error) {
        console.error('Error inserting image URL:', error.message);
      }
    };
    

  const handleFileUpload = async () => {
    if (selectedFile.length === 0) return;

    try {
      for (const file of selectedFile) {
        const storageResponse = await supabase.storage
          .from('ProviderUserinfo') // Replace 'folder-name' with your desired folder name
          .upload(file.name, file);

        console.log('File uploaded successfully:', storageResponse.Key);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  const handleLogout = () => {
    // Clear any authentication tokens or user data as needed
    localStorage.removeItem('token'); // Clear token or other data
  
    // Redirect the user to the landing page
    window.location.href = '/'; // Replace with the path of your landing page (index.js)
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataUpperCase = {
      ...formData,
      businesstype: formData.businesstype.toUpperCase(),
      providertype: formData.providertype.toUpperCase(),
      // Convert other form fields to uppercase if needed
    };
  
    console.log('Submit button clicked');

    try {
      
      await axios.post('/api/formsubmit', formData); // Replace with your API endpoint URL
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleDownload = (rowId) => {
    // Find the selected receipt based on the rowId
    const selectedReceipt = receiptdata.find((row) => row.id === rowId);

    if (selectedReceipt) {
      const doc = new jsPDF();
      
      // Get the current date and format it
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();

      // Define the content for the PDF
      const content = `
        Receipt Details
        -----------------
             Description: ${selectedReceipt.service}
        Service Provider: ${selectedReceipt.pro_email}
              Total Paid: R${selectedReceipt.price}
              Invoice No: ${selectedReceipt.id}
                    Date: ${formattedDate}

        Thank you for your payment!

        -- MY REPAIRS --
        `;

      // Add the content to the PDF
      doc.text(content, 10, 10);

      // Save the PDF as a downloadable file
      doc.save(`Receipt_${selectedReceipt.id}.pdf`);
    }
  };
  

  useEffect(() => {
    const fetchPendingRequests = async (userEmail) => {
      try {
        const response = await axios.get(`/api/pendingrequests?userEmail=${userEmail}`);
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    const fetchReceipts = async (userEmail) => {
      try {
        const response = await axios.get(`/api/receipts?userEmail=${userEmail}`);
        setreceiptData(response.data);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      }
    };

    document.body.style.margin = '0';
    axios.get('/api/services') // Replace '/api/services' with your API endpoint URL
      .then(response => setServices(response.data))
      .catch(error => console.error('Error fetching services:', error));

      if (localStorage.getItem('token')) {
        axios.get('/api/login/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(response => {
          console.log('User Data:', response.data);
          setUserData(response.data.user);
          handleSuccessfulLogin(response.data.user.email);
           
           
        })
        .catch(error => console.error('Error fetching user data:', error));
      }
      if (userEmail) {
        fetchPendingRequests(userEmail);
        fetchReceipts(userEmail); 
      }

      if (typeof window !== 'undefined') {
        setIconSize(window.innerWidth <= 768 ? 32 : 64);
      }

   
    }, [userEmail]);

    const handleTabChange2 = (tab1) => {
      if (selectedTab !== tab1) {
        setActiveTab2(tab1);
  
        // Only update the selected tab if it's different from the currently selected tab
        if (selectedTab === tab1) {
          setSelectedTab('');
        } else {
          setSelectedTab(tab1);
        }
      }
    };

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [iconSize, setIconSize] = useState(64);

  const [selectedPicture, setSelectedPicture] = useState(null);

    function handleSelectPicture() {
        document.getElementById('pictureInput').click();
    }

    function handlePictureInputChange(event) {
        const file = event.target.files[0]; // Get the selected file
        setSelectedPicture(file); // Store the selected file in state
        const pfp = document.querySelector('.pfp'); // Get the pfp div
        pfp.innerHTML = ''; // Clear any existing content
        const img = document.createElement('img'); // Create an img element
        img.src = URL.createObjectURL(file); // Set src attribute to the selected image
        img.alt = 'Profile Picture'; // Set alt attribute
        img.style.maxWidth = '100%'; // Set maximum width to fit inside the pfp div
        img.style.height = '100%'; 
        img.style.width = '100%'; 
        img.style.maxHeight = '150px'; // Set maximum height (adjust as needed)
        img.style.borderRadius = '50%';
        pfp.appendChild(img); // Append the img element to the pfp div
    }
    function deleteMessage() {
      // Code to delete the message
      // For example, you might want to remove the entire div with class 'header_msg'
      var messageDiv = document.querySelector('.header_msg');
      messageDiv.remove();
  }
  const [email, setEmail] = useState('');
 

  const handleContactCustomer = () => {
    setShowPopup(true);
  };
  const [showPopup, setShowPopup] = useState(false);



  const handleClosePopup = () => {
    setShowPopup(false);
    setShowNextContainer(true); // Show the next container
  };
  function handleClick() {
    // Add your logic here
    console.log('Icon clicked! Add action goes here.');
}
const [expandLocationInput, setExpandLocationInput] = useState(false); // Define expandLocationInput state
const handleGetLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`);
          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const formattedAddress = data.results[0].formatted_address;
              setLocation(formattedAddress);
            } else {
              setLocation('Location not found');
            }
          } else {
            setLocation('Error fetching location');
          }
        } catch (error) {
          console.error('Error fetching location:', error);
          setLocation('Error fetching location');
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocation('Failed to retrieve location');
      }
    );
  } else {
    setLocation('Geolocation is not supported by your browser');
  }
};
const fetchLocation = async () => {
  try {
    // Fetch location logic
  } catch (error) {
    console.error('Error fetching location:', error);
    setLocation('Error fetching location');
  }
};


// Example of setLocation function (to be defined in your component)

const [showPaymentsContainer, setShowPaymentsContainer] = useState(false);
const [showNextContainer, setShowNextContainer] = useState(false); 
const handleNextButtonClick = () => {
  setShowNextContainer(true);
};
const [paymentMethod, setPaymentMethod] = useState('');
const handlePayNow = () => {
  setShowPaymentsContainer(true);
 
  
};


const handleUploadCardDetails = (event) => {
  event.preventDefault();
  // You can handle the uploaded card details here
  console.log('Card details uploaded!');
};
const handleClosePayments = () => {
  // Implement logic to close the payments container
  // For example, you can set a state variable to control visibility
  setShowPaymentsContainer(false);
};
const handlePayLater = () => {
  // Display a pop-up message
  window.alert('Order successful! You can pay later.');
};
const handlePayWithPayFast = () => {
  // Your logic to initiate payment with PayFast
  console.log('Initiating payment with PayFast...');
  // For example, you can redirect the user to the PayFast payment page
  window.location.href = 'https://www.payfast.co.za/payments';
};
const handlefavoritesClick = () => {
  // Create a new container object with desired classes
  const newContainer = {
    id: containers.length + 1, // Unique ID for each container
    classes: 'customers-container current-container pink-border', // Classes for the new container
    content: 'Your Favorite Container has been added' // Content of the new container
  };

  // Add the new container to the containers array
  setContainers([...containers, newContainer]);
};
const handleRequestService = () => {
  setShowPopup(!showPopup);
};
const handleFilter = () => {
  const filtered = services.filter((service) => {
    return (
      (serviceTypeFilter === '' || service.type === serviceTypeFilter) &&
      (providerEmailFilter === '' || service.providerEmail.includes(providerEmailFilter)) &&
      (priceRangeFilter === '' || isPriceInRange(service.price, priceRangeFilter)) &&
      (locationFilter === '' || service.location === locationFilter) &&
      (availabilityFilter === '' || isAvailabilityMatch(service.availability, availabilityFilter))
    );
  });

  setFilteredServices(filtered);
};

// Helper function to check if price is within the selected range
const isPriceInRange = (price, range) => {
  const [min, max] = range.split('-').map(Number);
  return price >= min && price <= max;
};

// Helper function to check if availability matches the selected option
const isAvailabilityMatch = (availability, selected) => {
  // You can implement your own logic here based on the structure of availability data
  // For example, if availability is an array of days, you can check if the selected days are included in it
  return availability.includes(selected);
};


 



  return (
<div className='UserDashboard'>
  
    <div className="dashboard-container">
        
      
    
      <div className="img-and-title">
      
        
        <div className='Profile'>
        

        {imageUrl ? (
      // Display the uploaded image when it exists
      <img src={imageUrl} alt="Profile" className="profile-pic" />
    ) : (
      // Display the initial letter when no image is uploaded
      <div className="profile-pic">{firstLetter}</div>
    )}
        
  </div>


</div>
<div className='username'><h4>{userEmail}</h4></div>

<div className='dashcontent'>
      <div className="dashboard-content">
        
<div className={`dashboard-section ${selectedTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabChange2('dashboard')}>
          <div className="dashboard-section-header" >
            <FaHome className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Dashboard</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
        </div>
       
        <div className={`dashboard-section ${selectedTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange2('profile')}>
          <div className="dashboard-section-header"  >
            <FaUser className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Profile</h3>
          </div>

          <div className='active_Tab'>
&gt;
</div>
        </div>
      

        <div className={`dashboard-section ${selectedTab === 'messaging' ? 'active' : ''}`} onClick={() => handleTabChange2('messaging')}>
          <div className="dashboard-section-header">
            <FaEnvelope className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Messages</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
        </div>
        <div className={`dashboard-section ${selectedTab === 'favourites' ? 'active' : ''}`} onClick={() => handleTabChange2('favourites')}>
          <div className="dashboard-section-header">
            <FaStar className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Favorites</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
        </div>
      </div>
      <div className='btn_logout'>
      <button className='logsout' onClick={handleLogout}>Log Out</button>
      </div>
      </div>
      </div>
      <div className='mainpage'>
  


      {expandedPendingServices && (
  <div className='overlay-container'>
    <div className="expanded-content">
      {pendingRequests === null ? (
        <div className="loading-spinner">
          <BarLoader color={"#36D7B7"} loading={true} size={150} />
          <p>Loading pending requests...</p>
        </div>
      ) : pendingRequests.length > 0 ? (
        
        <div className='requestcard'>
          <h2 className='totalpendingreq'>Awaiting Approval ({pendingRequests.length})</h2>
          <div className="alert-container">
            <div className="alert-box">
              <IoWarningSharp size={iconSize} color="red" />
              <p>Please wait for the provider to accept the service.<br/> If not accepted within 24 hours, you can request for<br/> a refund.</p>
            </div>
       
          </div>
          <div className='pending_containers'>
            <div className='p_container1'>
              <h3>Services Description</h3>
              <hr className='hr_pendingservices'/>
              <p className='service_info'>No Service Info...</p>
              <hr className='hr_pendingservices'/>
              </div>
              <div className='p_container2'>
              <h3>Services Provider</h3>
              <hr className='hr_pendingservices'/>
              <div className='fetched_name'><strong><p className='Name'>Name:</p></strong><p style={{color: '#21B6A8', fontFamily: 'poppins', fontWeight: 'bold'}}>{pendingRequests.map(pendingrequest => pendingrequest.service)}</p></div>
              <div className='fetched_email'><strong><p className='Email'>Email:</p></strong><p style={{color: '#21B6A8', fontFamily: 'poppins', fontWeight: 'bold'}}>{pendingRequests.map(pendingrequest => pendingrequest.pro_email)}</p></div>
              <div className='fetched_contact'><strong><p className='Contact'>Contact</p></strong><p style={{color: '#21B6A8', fontFamily: 'poppins', fontWeight: 'bold'}}>{pendingRequests.map(pendingrequest => pendingrequest.pro_contact)}</p></div>
              <div className='fetched_address'><strong><p className='Address'>Address:</p></strong><p style={{color: '#21B6A8', fontFamily: 'poppins', fontWeight: 'bold'}}>{pendingRequests.map(pendingrequest => pendingrequest.pro_address)}</p></div>

              </div>
              <div className='p_container3'>
                <h3>Service Status</h3>
              <hr className='hr_pendingservices'/>
                <p className='status_message'>--- Awaiting Approval ---</p>
              <hr className='hr_pendingservices'/>
                <h3>Service Price</h3>
              <hr className='hr_pendingservices'/>
                <div  className='fetched_price'><p>R{pendingRequests.map(pendingrequest => pendingrequest.price)}</p></div>
              </div>
       
          </div>
        </div>
      ) : (
        <div className="no-pending-requests">
          No Pending Requests
        </div>
      )}
        <button className="closemetric" onClick={() => setExpandedPendingServices(false)}>
    Close
      </button>
    </div>
  </div>
)}
{/*   <ul className='pendingrequests'>
            {pendingRequests.map((pendingrequest, index) => (
              <li key={pendingrequest.id} className="pending-request">
                <strong>Provider Email:</strong> {pendingrequest.pro_email}<br/>
                <strong>Service:</strong> {pendingrequest.service}<br/>
                <strong>Price:</strong> {pendingrequest.price}
                <span className="request-index">{index + 1}</span>
              </li>
            ))}
          </ul> */}






{expandedRewards && (
  <div className='overlay-container'>
    <div className="expanded-content">
    
      {rewardsData ? (
        // Render the data for rewards here
        <p>Rewards Data</p>
      ) : (
        // Render the "No Rewards" message
        <div className="no-data-message">
          No Rewards
        </div>
      )}
      <button className="closemetric" onClick={() => setExpandedRewards(false)}>
        Close
      </button>
    </div>
  </div>
)}

      {selectedService && (
        <ServiceDetail
          service={selectedService}
          onClose={closeServiceDetail}
        />
      )}
        {activeTab2 === 'dashboard' &&(
          <div>
      <Dashheader />
  

      <nav className='maindash'>

<a href="#" onClick={() => handleTabChange('overview')}>Overview</a>
<a href="#" onClick={() => handleTabChange('services')}>Services</a>
<a href="#" onClick={() => handleTabChange('accounts')}>Accounts</a>
<a href="#" onClick={() => handleTabChange('payments')}>Payments</a>
</nav>

{activeTab === 'overview' && (
  <div className='mainpage' style={{ height: '100vh', overflowY: 'auto' }}>
       
          <div className='Dash-Container'>
          <div className="metrics">
          <div
  className={`servicesdone ${expandedServicesDone ? 'expanded' : ''}`}
  onClick={() => {
        setExpandedServicesDone(!expandedServicesDone);
    // Perform the database search here
  }}
>
 {/*Under Service done button */}
    <h3>Service done</h3>
      <div className="">
      <progress className="" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div>
    

    {/*Electrician Container*/ }
    <div className="container">
        <div className="set">
        <div className='updates-Container'>
        <div className={{ display: 'flex' }}> {/* Container element */}

        <div style={{ position: 'relative', width: 10, height: 10 }}>
  <div style={{
    position: 'absolute',
    top: -35,
    left: 70,
    width: 70,
    height: 50,
    backgroundColor: '#E71E5B',
    borderRadius: '10%'
  }} />
  
  {/* Overlapping SVG image icon */}
  <div style={{
    position: 'absolute',
    top: -20, // Adjust the top position as needed
    left: 90, // Adjust the left position as needed
    zIndex: 1, // Ensure the SVG is above the square shape
  }}>
    {/* Your SVG image icon code goes here */}
    <svg
      width="30"
      height="30"
      xmlns=""
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
    </svg>
  </div>
</div>

           <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
          <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
          <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
        </div>
        <h2>  
        Electrician</h2>
        <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
        <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
        <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R500</b></p>
        <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
        <button className='small-button' onClick={handleRequestService} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',marginLeft: '65px'}}>
        Request
        </button>
        
        
       
         </div>
    </div>
</div>
</div>


      {/*Cleaning Container*/}
      <div className="set">
              <div className='updates-Container'>
              <div className={{ display: 'flex' }}> {/* Container element */}
              <div style={{ position: 'relative', width: 10, height: 10 }}>
  <div style={{
    position: 'absolute',
    top: -35,
    left: 70,
    width: 70,
    height: 70,
    backgroundColor: '#E71E5B',
    borderRadius: '10%'
  }} />
  
  {/* Overlapping SVG image icon */}
  <div style={{
    position: 'absolute',
    top: -20, // Adjust the top position as needed
    left: 90, // Adjust the left position as needed
    zIndex: 1, // Ensure the SVG is above the square shape
  }}>
    {/* Your SVG image icon code goes here */}
    <svg
      width="30"
      height="30"
      xmlns=""
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
    </svg>
  </div>
</div>
                <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
                <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
                <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
                </div>
           <h2> 
           Cleaning  </h2>
           <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
        <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
        <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R160</b></p>
       <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
       <button className='small-button' onClick={handleRequestService}  style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',marginLeft: '65px'}}>
        Request
        </button>
        </div>
      </div>
   </div>
   </div>



    {/*Painting container*/}
      <div className="set">  
            <div className='updates-Container'>    
            <div className={{ display: 'flex' }}> {/* Container element */}
            <div style={{ position: 'relative', width: 10, height: 10 }}>
  <div style={{
    position: 'absolute',
    top: -40,
    left: 70,
    width: 70,
    height: 70,
    backgroundColor: '#E71E5B',
    borderRadius: '10%'
  }} />
  
  {/* Overlapping SVG image icon */}
  <div style={{
    position: 'absolute',
    top: -20, // Adjust the top position as needed
    left: 90, // Adjust the left position as needed
    zIndex: 1, // Ensure the SVG is above the square shape
  }}>
    {/* Your SVG image icon code goes here */}
    <svg
      width="30"
      height="30"
      xmlns=""
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
    </svg>
  </div>
</div>
              <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
              <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
              <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
              </div> 
              <h2>  
              Painting</h2>
              <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
       <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
       <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
        <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R200</b></p>
        <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
        <button className='small-button' onClick={handleRequestService}  style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',marginLeft: '65px'}}>
        Request
        </button>
           </div>
         </div>
     </div>
   </div>
   </div>
   {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            {/* Content of your popup */}
            
            <p style={{ color: 'white',marginRight: '200px' }}>Requested Service Name</p> {/* Add inline style to change color */}
            <hr style={{ borderTop: '3px solid white' }} /> {/* Apply style to change color */}
            <p style={{ color: 'white',marginRight: '370px' }}>Service Price</p> {/* Add inline style to change color */}
      <p style={{ color: 'white',marginRight: '395px' }}>R350</p> {/* Add inline style to change color */}
      <input 
  type="email" 
  placeholder="Enter your email" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
  style={{ width: '4000px', maxWidth: '400px', boxSizing: 'border-box', marginBottom: '10px' }}
/>
     <button onClick={handleGetLocation} style={{ backgroundColor: '#40E0D0', color: 'white', width: '30%', boxSizing: 'border-box',marginBottom: '10px'}}>Get Location</button> {/* Added Get Location button */}
     <input 
        type="text" 
        placeholder="Enter your location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: expandLocationInput ? '100%' : 'auto', boxSizing: 'border-box', marginBottom: '10px',width: '400px' }}
      />  

<button className="close-button" onClick={handleNextButtonClick} style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', fontSize: '14px', borderRadius: '5px', border: 'none', height: '40px', width: '90px',marginTop: '395px' }}>Next</button>
{showNextContainer && (
        <div className="next-container" id="next-container">
         <p style={{color: 'white',marginRight: '200px',fontSize: '24px'}}>Request Summary</p>
         <hr style={{ borderTop: '3px solid white' }} />
         <p style={{color: 'white',marginRight: '250px' }}>Service: Painting</p>
         <p style={{color: 'white',marginRight: '265px'}}>Provider Email:</p>
         <p style={{color: 'white',marginRight: '325px'}}>Address:</p>
         <p style={{color: 'white',marginRight: '280px'}}>Total Amount:</p>
         <p style={{color: 'white',marginRight: '350px'}}>Email:</p>
        
        
         

         <button onClick={handlePayNow} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none', marginLeft: '35px' }}>Pay Now</button>
    <button onClick={handlePayLater} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none', marginLeft: '10px' }}>Pay Later</button>
    <button onClick={handleClosePopup} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none',marginLeft: '150px'}}>Close</button>
        </div>
      )}
     {showPaymentsContainer && (
  <div className="payments-container" id="payments-container">
    <button className="close-button" onClick={handleClosePayments} style={{ position: 'relative', top: '-10px', left: '10px' }}>
      <span style={{ fontSize: '24px', color: 'black' }}>×</span>
    </button>
    {/* Content of your payments container */}
    <p style={{color: 'white',marginRight: '190px'}}>Enter Your Card Details</p>
    <form onSubmit={handleUploadCardDetails} style={{ display: 'flex', flexDirection: 'column' ,color: 'white' }}>
      <label htmlFor="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" name="cardNumber" maxLength="20" required />
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YYYY" required />
        </div>
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv"  maxLength="4" required />
        </div>
      </div>
   
      
      <button type="submit" style={{width: '125px',marginLeft: '150px', backgroundColor: '#40E0D0',color: 'white'}} >Upload </button>
    </form>
    {/* Option to pay with PayFast */}
    <p style={{color: 'white',marginRight: '230px'}}>OR</p>
    <button onClick={handlePayWithPayFast} style={{ marginTop: '-30px',marginLeft: '150px', backgroundColor: '#40E0D0',color: 'white'}}>Pay with PayFast</button>
  
  </div>
  
)}
      
       
          </div>
        

        </div>
      )}
   </div>



{/*Expenses Container*/}
<div className={`pendingservices ${expandedPendingServices ? 'expanded' : ''}`}
 onClick={() =>setExpandedPendingServices(!expandedPendingServices)}>
    <h3>Pending Services </h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div>
  </div>



  {/*Point Container*/}
  <div className={`Rewards ${expandedRewards ? 'expanded' : ''}`}
   onClick={() => setExpandedRewards(!expandedRewards)}>
    <h3>Rewards</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={rewardsProgress} max="100"></progress>
      <span>{rewardsProgress}%</span>
    </div>
   
       
        
  </div>
</div>
</div>
        
</div>
        )}

       
        {activeTab === 'services' && (
         
<div className='services_tab'>
<div className='filters-search'>
  <div className='searchfilters'>
  <div className='emailfilters'>
  <div className='filter1'>
  <label htmlFor="serviceType">Service Types</label>
  <select
    className='filteremail'
    id="serviceType"
    value={serviceTypeFilter}
    onChange={(e) => setServiceTypeFilter(e.target.value)}
  >
    <option value="">Select a service type</option>
    <option value="Type1">Electrician Services</option>
    <option value="Type2">Applicances Repairing</option>
    <option value="Type3">Microwave Repairing</option>
    <option value="Type3">Painting</option>
    <option value="Type3">Welding</option>
    <option value="Type3">Electrician Repairing</option>
    <option value="Type3">Fridge Repairing</option>
    <option value="Type3">Keetle Repairing</option>
    
    {/* Add more options as needed */}
  </select>
</div>

  <div className='filter2'>
  <label>Provider Email</label>
    <input
      className='filteremail'
      type="text"
      value={providerEmailFilter}
      placeholder='Email'
      onChange={(e) => setProviderEmailFilter(e.target.value)}
    />
  </div>
  </div>
<div className='radiofilters'>
  <div className='filter3'>
    <label>Price Range</label>
    <select
      value={priceRangeFilter}
      onChange={(e) => setPriceRangeFilter(e.target.value)}
      className='custom-select'

    >
      <option value="">All</option>
      <option value="10-50">R10/hr to R50/hr</option>
      <option value="50-100">R50/hr to R100/hr</option>
      <option value="100-200">R100/hr to R200/hr</option>
    </select>
  </div>

  <div className='filter4'>
    <label>Location</label>
    <select
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      className='custom-select'
    >
      <option value="">All</option>
      <option value="Pretoria Central">Pretoria Central</option>
      <option value="Midrand">Midrand</option>
      <option value="Pretoria West">Pretoria West</option>
      <option value="Pretoria East">Pretoria East</option>
      <option value="Pretoria North">Pretoria North</option>
      <option value="Centurion">Centurion</option>
      <option value="Lynnwood">Lynnwood</option>
      <option value="Menlyn">Menlyn</option>
    </select>
  </div>


  </div>
  <div className='radiofilters2'>
  <div className='filter5'>
    <label>Availability</label>
<select
  value={availabilityFilter}
  onChange={(e) => setAvailabilityFilter(e.target.value)}
  className='custom-select'

>
  <option value="">All</option>
  <option value="Sunday - Saturday">Sunday - Saturday</option>
  <option value="Friday - Sunday">Friday - Sunday</option>
  <option value="Saturday - Sunday">Saturday - Sunday</option>
</select>

  </div>
  </div>
  </div>
  <button className='filterservices1' onClick={handleFilter}>Filter Services</button>

</div>
  <div className='my_services'>
  <div className='services_services'>
        {/* Filtered services based on the selected filters */}
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="productCard"
            onClick={() => handleServiceClick(service)}
          >
            <Products service={service} />
          </div>
    ))}
    
    </div>
      </div>
      

      
      </div>
      
        )}
        

{activeTab === 'services' && ( 
                  <div className='ScrollableContainer'>
                  <div className='Dash-Container'>
                  <div className="metrics">
                  <div
                   onClick={() => {
            
            //setExpandedPendingServices(!expandedPendingServices);
            // Perform the database search here
          }}
        >
         <br/>
          
            <div className="container2">
      {/* First Set of Containers */}
      <div className="set">
              <div className='updates-Container2'>
              <div className={{ display: 'flex' }}> {/* Container element */}
            <div style={{ position: 'relative', width: 10, height: 10 }}>
  <div style={{
    position: 'absolute',
    top: -40,
    left: 70,
    width: 70,
    height: 70,
    backgroundColor: '#E71E5B',
    borderRadius: '10%'
  }} />
  
  {/* Overlapping SVG image icon */}
  <div style={{
    position: 'absolute',
    top: -20, // Adjust the top position as needed
    left: 90, // Adjust the left position as needed
    zIndex: 1, // Ensure the SVG is above the square shape
  }}>
    {/* Your SVG image icon code goes here */}
    <svg
      width="30"
      height="30"
      xmlns=""
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
    </svg>
  </div>
</div>
              <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
              <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
              <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
              </div> 
           <h2>
           Cleaning
           </h2>
           <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
        <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
        <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R160</b></p>
        <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
        <button className='small-button' onClick={handleRequestService}  style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',marginLeft: '65px'}}>
        Request
        </button>
        </div>
      </div>
   </div>
   </div>


      {/* Second Set of Containers */}
      <div className="set">
        <div className='updates-Container2'>
        <div className={{ display: 'flex' }}> {/* Container element */}
            <div style={{ position: 'relative', width: 10, height: 10 }}>
  <div style={{
    position: 'absolute',
    top: -40,
    left: 70,
    width: 70,
    height: 70,
    backgroundColor: '#E71E5B',
    borderRadius: '10%'
  }} />
  
  {/* Overlapping SVG image icon */}
  <div style={{
    position: 'absolute',
    top: -20, // Adjust the top position as needed
    left: 90, // Adjust the left position as needed
    zIndex: 1, // Ensure the SVG is above the square shape
  }}>
    {/* Your SVG image icon code goes here */}
    <svg
      width="30"
      height="30"
      xmlns=""
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
    </svg>
  </div>
</div>
              <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
              <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
              <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
              </div> 
        <h2> Electrician</h2>
        <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
        <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
        <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R500</b></p>
        <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
        <button className='small-button' onClick={handleRequestService}  style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',marginLeft: '65px'}}>
        Request
        </button>
         </div>
    </div>
</div>
</div>


<div className="set">  
            <div className='updates-Container2'>    
            <div className={{ display: 'flex' }}> {/* Container element */}
            <div style={{ position: 'relative', width: 10, height: 10 }}>
  <div style={{
    position: 'absolute',
    top: -40,
    left: 70,
    width: 70,
    height: 70,
    backgroundColor: '#E71E5B',
    borderRadius: '10%'
  }} />
  
  {/* Overlapping SVG image icon */}
  <div style={{
    position: 'absolute',
    top: -20, // Adjust the top position as needed
    left: 90, // Adjust the left position as needed
    zIndex: 1, // Ensure the SVG is above the square shape
  }}>
    {/* Your SVG image icon code goes here */}
    <svg
      width="30"
      height="30"
      xmlns=""
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14h-6v-2h6v2zm0-4h-6V7h6v5z" />
    </svg>
  </div>
</div>
              <FaPaperPlane className={{ color: '#007bff', fontSize: '1.3rem' }} />
              <FaStar style={{ col0or: 'E71E5B', fontSize: '1rem',marginLeft: '80px',marginBottom:'-30px' }} />
              <FaHeart style={{ color: 'E71E5B', fontSize: '1rem',marginInlineStart:'175px',marginBottom:'-2px'}} />        
              </div> 
                          <h2>
              Painting
              </h2>
              <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
       <p style={{ fontSize: '14px',color: '#E71E5B' }}>provider@gmail.com</p>
       <div style={{borderTop: '1px solid #E71E5B', margin: '10px 0'}}>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#E71E5B'}}>Price</p>
        <p style={{fontSize: '20px', textAlign: 'center',fontFamily: ' Arial',color: '#E71E5B' }}><b>R200</b></p>
       <p style={{ fontSize: '14px', textAlign: 'center',color: '#E71E5B' }}>Monday-Friday</p>
       <button className='small-button' onClick={handleRequestService}  style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',marginLeft: '65px'}}>
        Request
        </button>
           </div>
         </div>
       </div>
     </div>
   </div>
   {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            {/* Content of your popup */}
            
            <p style={{ color: 'white',marginRight: '200px' }}>Requested Service Name</p> {/* Add inline style to change color */}
            <hr style={{ borderTop: '3px solid white' }} /> {/* Apply style to change color */}
            <p style={{ color: 'white',marginRight: '370px' }}>Service Price</p> {/* Add inline style to change color */}
      <p style={{ color: 'white',marginRight: '395px' }}>R350</p> {/* Add inline style to change color */}
      <input 
  type="email" 
  placeholder="Enter your email" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
  style={{ width: '4000px', maxWidth: '400px', boxSizing: 'border-box', marginBottom: '10px' }}
/>
     <button onClick={handleGetLocation} style={{ backgroundColor: '#40E0D0', color: 'white', width: '30%', boxSizing: 'border-box',marginBottom: '10px'}}>Get Location</button> {/* Added Get Location button */}
     <input 
        type="text" 
        placeholder="Enter your location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: expandLocationInput ? '100%' : 'auto', boxSizing: 'border-box', marginBottom: '10px',width: '400px' }}
      />  

<button className="close-button" onClick={handleNextButtonClick} style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', fontSize: '14px', borderRadius: '5px', border: 'none', height: '40px', width: '90px',marginTop: '395px' }}>Next</button>
{showNextContainer && (
        <div className="next-container" id="next-container">
         <p style={{color: 'white',marginRight: '200px',fontSize: '24px'}}>Request Summary</p>
         <hr style={{ borderTop: '3px solid white' }} />
         <p style={{color: 'white',marginRight: '250px' }}>Service: Painting</p>
         <p style={{color: 'white',marginRight: '265px'}}>Provider Email:</p>
         <p style={{color: 'white',marginRight: '325px'}}>Address:</p>
         <p style={{color: 'white',marginRight: '280px'}}>Total Amount:</p>
         <p style={{color: 'white',marginRight: '350px'}}>Email:</p>
        
        
         

         <button onClick={handlePayNow} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none', marginLeft: '35px' }}>Pay Now</button>
    <button onClick={handlePayLater} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none', marginLeft: '10px' }}>Pay Later</button>
    <button onClick={handleClosePopup} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none',marginLeft: '150px'}}>Close</button>
        </div>
      )}
     {showPaymentsContainer && (
  <div className="payments-container" id="payments-container">
    <button className="close-button" onClick={handleClosePayments} style={{ position: 'relative', top: '-10px', left: '10px' }}>
      <span style={{ fontSize: '24px', color: 'black' }}>×</span>
    </button>
    {/* Content of your payments container */}
    <p style={{color: 'white',marginRight: '190px'}}>Enter Your Card Details</p>
    <form onSubmit={handleUploadCardDetails} style={{ display: 'flex', flexDirection: 'column' ,color: 'white' }}>
      <label htmlFor="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" name="cardNumber" maxLength="20" required />
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YYYY" required />
        </div>
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv"  maxLength="4" required />
        </div>
      </div>
   
      
      <button type="submit" style={{width: '125px',marginLeft: '150px', backgroundColor: '#40E0D0',color: 'white'}} >Upload </button>
    </form>
    {/* Option to pay with PayFast */}
    <p style={{color: 'white',marginRight: '230px'}}>OR</p>
    <button onClick={handlePayWithPayFast} style={{ marginTop: '-30px',marginLeft: '150px', backgroundColor: '#40E0D0',color: 'white'}}>Pay with PayFast</button>
  
  </div>
  
)}
      
       
          </div>
        

        </div>
      )}
      </div>
      </div>
      </div>
      </div>  
           )}



       
        {activeTab === 'accounts' && (
        

          <div>
           <div className="container">
      {/* First Set of Containers */}
      <div className="set">
        <div className='accounts-Container' >Service Description
        <h2>Service Description</h2>
        <p style={{ fontWeight: 'normal' }}>Repairing a Samsung fridge</p>
        
        </div>
        <div className='accounts-Container'>Service Description
        <h2>Service Description</h2>
        <p style={{ fontWeight: 'normal' }}>Repairing a Microwave</p>
        
        </div>
        
        
      </div>

      {/* Second Set of Containers */}
      <div className="set">
        <div className='accounts-Container'>Service Provider
        <p style={{ fontWeight: 'normal', color: 'black' }}>Name: <span style={{ color: '#40E0D0' }}>Jane Smith</span></p>
    <p style={{ fontWeight: 'normal',color: 'black'  }}>Address: <span style={{ color: '#40E0D0' }}>456 Oak Avenue</span></p>
    <p style={{ fontWeight: 'normal' ,color: 'black' }}>Service Date: <span style={{ color: '#40E0D0' }}>20|05|2024</span></p>
        </div>
        <div className='accounts-Container'>Service Provider
        <p style={{ fontWeight: 'normal', color: 'black' }}>Name: <span style={{ color: '#40E0D0' }}>Jane Smith</span></p>
    <p style={{ fontWeight: 'normal',color: 'black'  }}>Address: <span style={{ color: '#40E0D0' }}>456 Oak Avenue</span></p>
    <p style={{ fontWeight: 'normal' ,color: 'black' }}>Service Date: <span style={{ color: '#40E0D0' }}>20|05|2024</span></p>
        </div>
        
      </div>


      <div className="set">
      <div className='accounts-Container'>Services Rating
      <div class="stars">
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <p style={{ fontWeight: 'bold' ,color: 'black' }}>Service Price:<br></br><span style={{ color: '#ff0068' }}>R350</span></p>
      </div>
      </div>
      <div className='accounts-Container'>Services Rating
      <div class="stars">
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <span class="star">&#9733;</span>
        <p style={{ fontWeight: 'bold' ,color: 'black' }}>Service Price:<br></br><span style={{ color: '#ff0068' }}>R350</span></p>
      </div>
      </div>

      </div>
      </div>

      




          </div>
        
        )}
        
        {activeTab === 'payments' && (
          <div className='payment_history'>
            <div className='payments_container'>
              <h5 className='payments_title'>Invoices</h5>
              <div className='receipts'>
              <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Service Provider</th>
                <th>Total Paid</th>
                <th>Invoice No</th>
                <th>Date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {receiptdata.map((row) => (
                <tr key={row.id}>
                  <td>{row.service}</td>
                  <td>{row.pro_email}</td>
                  <td>R{row.price}</td>
                  <td>{/* Add the date format you want here */}</td>
                  <td>{new Date(row.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDownload(row.id)}
                      className="download-button"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>


            </div>
          </div>
        )}

    </div>
        )}


{activeTab2 === 'profile' &&( 
<div>
 <Dashheader />
      <div></div>
      <div className='Profiletab'>
   <div className='edit_pfp'>
   <h4>Profile Picture</h4>
            <div className='pfp'></div>
            <p className='Name_Surname'></p>
            <div className='edit_container1'> 
                {/* Visible button or label to trigger file input click */}
                <button className='edit_image' onClick={handleSelectPicture}>Edit</button>
                
                {/* Hidden file input element */}
                <input 
                    type="file" 
                    id="pictureInput" 
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    onChange={handlePictureInputChange} 
                />
            </div>
   <div>
 
    
</div>
    </div>
   
    <div className='profile_information'>
      <div className='personalinfo_header'><h4 className='personalinfo_heading'>Personal Information</h4> 
      <button className='edit_personal' onClick={toggleEdit}>Edit</button>
      </div>
      <div className='User_info'>
    <div className='fetched_salut'>
        <strong>
            <label htmlFor="salutation" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Salutation:</label>
        </strong>
        <input type="text" id="salutation" name="salutation" />
    </div>
    <div className='fetched_name'>
        <strong>
            <label htmlFor="profile_name" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Name:</label>
        </strong>
        <input type="text" id="profile_name" name="profile_name" />
    </div>
    <div className='fetched_surname'>
        <strong>
            <label htmlFor="profile_surname" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Surname:</label>
        </strong>
        <input type="text" id="profile_surname" name="profile_surname" />
    </div>
    <div className='fetched_dob'>
        <strong>
            <label htmlFor="dob" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Date of Birth:</label>
        </strong>
        <input type="date" id="dob" name="dob" />
    </div>
    <div className='fetched_phone'>
        <strong>
            <label htmlFor="phone" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Phone:</label>
        </strong>
        <input type="text" id="phone" name="phone" />
    </div>
    <div className='fetched_email'>
        <strong>
            <label htmlFor="email" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Email:</label>
        </strong>
        <input type="email" id="email" name="email" />
    </div>
    <div className='fetched_country'>
        <strong>
            <label htmlFor="country" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Country:</label>
        </strong>
        <select id="country" name="country">
            <option value="South Africa">South Africa</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            {/* Add more countries as needed */}
        </select>
    </div>
    <div className='fetched_city'>
        <strong>
            <label htmlFor="city" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>City:</label>
        </strong>
        <input type="text" id="city" name="city" />
    </div>
    <div className='fetched_zip'>
        <strong>
            <label htmlFor="zip" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>ZIP:</label>
        </strong>
        <input type="text" id="zip" name="zip" />
    </div>
    <div className='fetched_street'>
        <strong>
            <label htmlFor="street" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Street:</label>
        </strong>
        <input type="text" id="street" name="street" />
    </div>
    <div className='fetched_building'>
        <strong>
            <label htmlFor="building" style={{color: '#454545', fontFamily: 'poppins', fontWeight: 'bold'}}>Building:</label>
        </strong>
        <input type="text" id="building" name="building" />
    </div>
</div>
{editMode && (
  <>
        <div className='edit-personal-info-container'>
        <div className='editinfo_header1'><h4 className='personalinfo_heading'></h4> 
        <div className='editbuttons'>
      <button className='edit_personal1' onClick={toggleEdit}>Save</button>
      <button className='edit_personal2' onClick={toggleEdit}>Cancel</button>
      </div>
      </div>
          
        </div>
          </>
      )}
      </div>
      
    </div>

   
  </div>
  )}

  {activeTab2 === 'messaging' &&(<div>
  <Dashheader />
  <br/>
<div className='cus_inbox'>
<div className='all_msg'>
    <div className='msg-container'>My Repairs<br></br>Dear Thabang<br></br>Here is your receipt for your order</div>
    <div className='msg-container'>My Repairs<br></br>Dear Thabang<br></br>Here is your receipt for your order</div>
    <div className='msg-container'>My Repairs<br></br>Dear Thabang<br></br>Here is your receipt for your order</div>
    <div className='msg-container'>My Repairs<br></br>Dear Thabang<br></br>Here is your receipt for your order</div>
    <div className='msg-container'>My Repairs<br></br>Dear Thabang<br></br>Here is your receipt for your order</div>
    <div className='msg-container'>My Repairs<br></br>Dear Thabang<br></br>Here is your receipt for your order</div>
</div>
<div className='opened_msg'>

<div className='header_msg'>
    <div className='default_msg'>
        <p>My Repairs<br/>18.03.2024<br/>Send Issued Invoice to a Customer</p>
    </div>
    <button className="delete_button" onClick={deleteMessage}>Delete</button>
</div>
<div className='current_msg'>
    <div className="logo-container">
        <img src="logo.png" alt="Logo" className="logo" />
    </div>
    <div className='default_msg1'>
    <p className="default_msg_text" style={{ marginTop: '20px' }}>Dear Thabang Lengane<br />Thank You for requesting a service at Myrepairs<br />Your service has been completed.</p>
{/* Review input field or textarea */}

<textarea placeholder="Leave your review and rate your service" style={{ marginTop: '-40px' }}></textarea>
    </div>
    
</div>
<div className='condition_msg'>
  <div className='default_msg'>
    <p>Invoice IN-171020238(Placed on the 17/08/2023)</p>
    <div className="line"></div>

  </div>
</div>
<div className='footer_msg'>
<div className='heading_footer_msg'><h4 className='heading_footer_msg1'>Contact Us</h4><p>support@myrepairs.co.za</p></div>


</div>


</div>



</div>

  </div>)}

  {activeTab2 === 'favourites' &&(<div>
  <Dashheader />
<div className='fav_services'>
<div className='heading_fav'><h4>Favourites</h4></div>

<div className='fav_services1'>
{containers.map(container => (
        <div key={container.id} className={container.classes}>
          {container.content}
        </div>
      ))}

      {/* Add icon */}
      <div className="Add_fav"style={{ width: '50px',height: '50px' }}>
        <img
          style={{ objectFit: 'cover' }}
          src="icons8-plus-48.png"
          alt="Add"
          className="add-icon"
          onClick={handlefavoritesClick}
        />
      </div>
    
<div className='customers-container current-container pink-border'>
       <div className='info'>
          {/* Container for customer name */}
          <div className='info-item pink'>
            <p>Service Provider Name</p>
            <img src="person_Icon1.png" alt="Picture Icon" className="icon1" />
            <p className="customer-name"> HiFi Corp</p>

        <button className='small-button' onClick={handleContactCustomer}>
        Request
        </button>
        {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            {/* Content of your popup */}
            
            <p style={{ color: 'white',marginRight: '200px' }}>Requested Service Name</p> {/* Add inline style to change color */}
            <hr style={{ borderTop: '3px solid white' }} /> {/* Apply style to change color */}
            <p style={{ color: 'white',marginRight: '370px' }}>Service Price</p> {/* Add inline style to change color */}
      <p style={{ color: 'white',marginRight: '395px' }}>R350</p> {/* Add inline style to change color */}
      <input 
  type="email" 
  placeholder="Enter your email" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
  style={{ width: '4000px', maxWidth: '400px', boxSizing: 'border-box', marginBottom: '10px' }}
/>
     <button onClick={handleGetLocation} style={{ backgroundColor: '#40E0D0', color: 'white', width: '30%', boxSizing: 'border-box',marginBottom: '10px'}}>Get Location</button> {/* Added Get Location button */}
     <input 
        type="text" 
        placeholder="Enter your location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: expandLocationInput ? '100%' : 'auto', boxSizing: 'border-box', marginBottom: '10px',width: '400px' }}
      />  

<button className="close-button" onClick={handleNextButtonClick} style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', fontSize: '14px', borderRadius: '5px', border: 'none', height: '40px', width: '90px',marginTop: '395px' }}>Next</button>
{showNextContainer && (
        <div className="next-container" id="next-container">
         <p style={{color: 'white',marginRight: '200px',fontSize: '24px'}}>Request Summary</p>
         <hr style={{ borderTop: '3px solid white' }} />
         <p style={{color: 'white',marginRight: '250px' }}>Service: Painting</p>
         <p style={{color: 'white',marginRight: '265px'}}>Provider Email:</p>
         <p style={{color: 'white',marginRight: '325px'}}>Address:</p>
         <p style={{color: 'white',marginRight: '280px'}}>Total Amount:</p>
         <p style={{color: 'white',marginRight: '350px'}}>Email:</p>
        
        
         

         <button onClick={handlePayNow} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none', marginLeft: '35px' }}>Pay Now</button>
    <button onClick={handlePayLater} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none', marginLeft: '10px' }}>Pay Later</button>
    <button onClick={handleClosePopup} style={{ backgroundColor: '#40E0D0', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none',marginLeft: '150px'}}>Close</button>
        </div>
      )}
     {showPaymentsContainer && (
  <div className="payments-container" id="payments-container">
    <button className="close-button" onClick={handleClosePayments} style={{ position: 'relative', top: '-10px', left: '10px' }}>
      <span style={{ fontSize: '24px', color: 'black' }}>×</span>
    </button>
    {/* Content of your payments container */}
    <p style={{color: 'white',marginRight: '190px'}}>Enter Your Card Details</p>
    <form onSubmit={handleUploadCardDetails} style={{ display: 'flex', flexDirection: 'column' ,color: 'white' }}>
      <label htmlFor="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" name="cardNumber" maxLength="20" required />
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YYYY" required />
        </div>
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv"  maxLength="4" required />
        </div>
      </div>
   
      
      <button type="submit" style={{width: '125px',marginLeft: '150px', backgroundColor: '#40E0D0',color: 'white'}} >Upload </button>
    </form>
    {/* Option to pay with PayFast */}
    <p style={{color: 'white',marginRight: '230px'}}>OR</p>
    <button onClick={handlePayWithPayFast} style={{ marginTop: '-30px',marginLeft: '150px', backgroundColor: '#40E0D0',color: 'white'}}>Pay with PayFast</button>
  
  </div>
  
)}
      
       
          </div>
        

        </div>
      )}
      
              </div>
           
          
          
          
          {/* Container for service description */}
          <div className='info-item pink'>
            <p>Service Provider Name</p>
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" />
           <p className="customer-name">Lumen</p>
           <button className='small-button' onClick={handleContactCustomer}>
          Request
        </button>
      

             </div>
         
          {/* Container for information description */}
          <div className='info-item pink'>
            <p>Service Provider Name</p>
            <img src="person_Icon1.png" alt="Picture Icon" className="icon1" />
            <p className="customer-name">Thabang</p>
             <button className='small-button' onClick={handleContactCustomer}>
          Request
          </button>
          
           
            
           
            
          </div>  
        </div>
      
       
      </div>
</div>



</div>

  </div>)}
      </div>

    
      <style jsx>{`
      body {
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4; /* Background color for the body on mobile devices */
        box-sizing: border-box;
      }
      .edit_personal1{
        margin: 0;
        padding: 0;
        padding: 8px;
        background: #ff0068;
        width: 80px;
        color: #fff;
        font-weight:bold;
        font-family: poppins;
      }
      .edit_personal2{
        margin: 0;
        padding: 0;
        padding: 8px;
        background: #21B6A8;
        width: 80px;
        color: #fff;
        font-weight:bold;
        font-family: poppins;
      }
      .editbuttons{
        display: flex;
        padding: 5px;
        width: 300px;
        justify-content: space-between;

      }
      .editinfo_header1{
        align-items: center;
        justify-content: space-between;
        width: 100%;
        display: flex;
        margin: 0;
      }
      .edit_form{
        width: 100%;
      }
      .edit-personal-info-container {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
        display: block;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      
      .edit-personal-info-container.open {
        display: flex;
      }
      
      .edit-personal-info-container input {
        width: 200px;
        padding: 5px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      /* Close Button */
      .close-edit {
        background-color: #ccc;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
      }
 
      .Add_fav{
width: 200px;
height: 200px;
border-radius: 5px;
box-shadow: 0 0 5px black;
justify-content: center;
align-items: center;
display: flex;

      }
      .add-icon {
        object-fit: cover;
        width: 50px; 
        height: 50px;
        display: block;
      }
      .fav_services1{
        width: 100%;
        border-bottom: 1px solid #ff0068;
        height: 450px;
        padding: 10px;

      }
      .heading_fav{
        width: 100%;
        border-bottom: 1px solid #ff0068;

      }
        .default_msg1{
          margin: 0 auto;
          margin-top: 140px;
        }
      .default_msg{
        margin: 0 auto;
        margin-top: 30px;
      }
      .heading_footer_msg1{
        margin: 0;
        margin-bottom: -8px;
        padding: 0;
      }
      .heading_footer_msg{
        padding: 5px;
        margin: 0;
        width: 400px;
        height: 20px;
      }
      .footer_msg{
        width: 500px;
        height: 70px;
        border-radius: 5px;
        border: 1px solid #ff0068;


      }
      .condition_msg{
        width: 500px;
        margin-bottom: 10px;
        border: 1px solid #ff0068;
        height: 80px;
        border-radius: 5px;
        text-align: center;
      }
      .current_msg{
        width: 500px;
        border: 1px solid #ff0068;
        height: 280px;
        border-radius: 5px;
        margin-bottom: 10px;
        text-align: center;


      }
      .opened_msg{
        width: 550px;
        border-radius: 5px;

      }
      .header_msg{
        text-align: center;

        width: 500px;
        margin-bottom: 10px;
        border: 1px solid #ff0068;
        height: 140px;
        border-radius: 5px;
      }
      .all_msg{
        border: 1px solid #ff0068;
        width: 350px;
        border-radius: 5px;
        margin-right: 30px;
      }

      .cus_inbox{
        display: flex;
        width: 920px;
        padding: 10px;
        height: 100%;
      }

      .edit_container1{
        width: 100%;
        justify-content: center;
        display: flex;
      }
      .edit_image{
        background: #21B6A8;
        color: #fff;
        width: 60px;
        font-weight:bold;
        font-family: poppins;



      }
      .delete_button {
        background-color: #40E0D0; /* Red background */
        color: #fff; /* White text */
        border: none; /* No border */
        padding: 10px 20px; /* Padding */
        cursor: pointer; /* Cursor style */
        border-radius: 5px; /* Rounded corners */
        margin-top: -100px;
        margin-left: 400px;
    }
    
    .delete_button:hover {
        background-color: #ff0068; /* pink background on hover */
    }
    .billinfo-container {
      padding: 10px; /* Padding inside the additional container */
      background-color: #fff; /* Background color for the additional content */
      border-radius: 5px solid ; /* Rounded corners */
      height: 50px;
      width: 150px;
      border: 1px ;
      
  }
  .default_msg_text {
    margin-bottom: 50px; /* Remove bottom margin of the <p> element */
}

.msg-container {
  
  margin: 10px; /* Add margin between containers */
  padding: 20px; /* Add padding inside each container */
  border: 1px solid #ff0068; /* Add border to each container */
  box-sizing: border-box; /* Include border in width calculation */
  border-radius: 5px ; /* Add rounded corners to each container */
  width: 320px;
  height: 90px;
}
.default_msg {
  /* Your existing styles */
  position: relative; /* Ensure relative positioning for the line */
}

.default_msg p {
  font-weight: bold;
 
}

.line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px; /* Adjust line thickness */
  background-color: #ff0068; /* Line color */
}
.container {
  display: flex; /* Use flexbox */
  justify-content: space-between; /* Distribute space between the containers */
}

.pink {
  display: flex;
  background-color: #fff;
  border: 3px solid #ff0068; /* Set the border color to dark pink */
  width: 300px;
  height: 330px;
  flex-direction: row;
  margin-top: 30px;
  display: flex; /* Use flexbox */
  border-radius: 10px;

}
.pink-border {
  display: column; /* Use flexbox */
  display: grid;
  

}
.info {
  display: flex;
  justify-content: space-between; /* Optional: Adjust this based on your layout preferences */
  
  
  
}
.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
}



.info-item p {
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-align: right;
  font-family: 'Arial', sans-serif;
}

.info-item img {
    width: 80px; /* Set the desired width for the image */
    height: 80px; /* Set the desired height for the image */
    object-fit: cover; /* Adjust the object-fit property as needed (e.g., 'contain', 'fill') */
    margin-right: 10px; /* Add some margin to separate the image from other content */
    display: block; /* Ensure the image is a block element for centering */
    margin-left: auto; /* Auto margin to center the image within its container */
    margin-right: auto; /* Auto margin to center the image within its container */
    margin-top: -30 px;
  }
  .popup-container{
    background-color: #ff0068;
    border: 3px solid #ff0068;
    height: 450px;
    width: 450px; /* Adjust width as needed */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateY(80px); 
  
  }
  .next-container{
    background-color: #ff0068;
    border: 3px solid #ff0068;
    height: 450px;
    width: 450px; /* Adjust width as needed */
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%) translateY(80px); 


  }
  .payments-container{
    background-color: #ff0068;
    border: 3px solid #ff0068;
    height: 450px;
    width: 450px; /* Adjust width as needed */
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%) translateY(80px); 



  }

     
      .edit_personal{
        margin: 0;
        padding: 0;
        padding: 8px;
        background: #ff0068;
        width: 80px;
        color: #fff;
        font-weight:bold;
        font-family: poppins;
      }
      .personalinfo_heading{
        margin: 0;
        padding: 0;
        width: 100%;
      
      }
      .personalinfo_header{
        display: flex;
        align-items: center;
        margin: 0;
        margin-bottom: 50px;


      }
      .profile_information{
        overflow: auto;
       
      }
      .profile_information{
        border: 2px solid #ff0068;
        height: 700px;
        width: 500px;
        border-radius: 5px;
        padding: 10px;
        position: relative;
      }
      
    
      .Profiletab{
        display: flex;
        padding: 10px;
      }

      .edit_pfp{
        padding: 10px;
        margin-right: 50px;
        width: 350px;
        height: 400px;
        border: 2px solid #ff0068;
        border-radius: 5px;
        margin-bottom: 10px;
        
      }
.pfp{
  border-radius: 75px;
  background: rgba(0, 0, 0, 0.3);
margin: 0 auto;
width: 150px;
height: 150px;
margin-bottom: 40px;

}
.User_info input[type="text"],
.User_info input[type="email"],
.User_info select,
.User_info input[type="date"] {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ff0068;
    border-radius: 4px;
    box-sizing: border-box;
}
.upload-section {
  margin-bottom: 15px;
}





      .service_info{
        color: #454545;

      }
      .status_message{
text-align: center;
font-weight: bold;

      }
     hr .hr_pendingservices{
        height: 1px; /* Adjust the height to make it thinner */
        background-color: #000; /* You can also set a color if needed */
        border: none;
      }
      .fetched_price{
        font-size: 40px;
        color: #21B6A8;
        font-weight: bold;
        font-family: poppins;
        display: flex;
        padding: 0;
        align-items: center;
        height:50px;
      width: 100%;
   
      }
      .fetched_name{
        display: flex;
        padding: 0;
        align-items: center;
        height:30px;
      width: 100%;
      justify-content: space-between;
      margin-top: 15px;
      }
      .fetched_email{
        display: flex;
        padding: 0;
        align-items: center;
        height:30px;
      width: 100%;
      justify-content: space-between;
      }
      .fetched_contact{
        display: flex;
        padding: 0;
        align-items: center;
        height:30px;
      width: 100%;
      justify-content: space-between;
      }
      .fetched_address{
        display: flex;
        padding: 0;
        align-items: center;
        height:30px;
      width: 100%;
      justify-content: space-between;
      }

      .p_container1{
        width: 200px;
        height: auto;
        padding: 10px;
        margin-right: 25px;
        border-radius: 5px;
        border: 2px solid #ff0068;
        box-shadow: 0 0  5px #ff0068;

      }
      .p_container2{
        width: 350px;
        height: auto;
        padding: 10px;
        margin-right: 25px;
        border-radius: 5px;
        border: 2px solid #ff0068;
        box-shadow: 0 0  5px #ff0068;
      }
      .p_container3{
        width: 200px;
        height: auto;
        padding: 10px;
        margin-right: 25px;
        border-radius: 5px;
        border: 2px solid #ff0068;
        box-shadow: 0 0  5px #ff0068;

      }
      .pending_containers{
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 10px;
      }
      th, td {
        padding: 8px;
        text-align: left;
align-items: center;
        border-bottom: 2px solid #ff0068; /* Pink border line at the bottom of each cell */
      }

.receipts table {
  width: 100%;
  border-collapse: collapse;
}

.receipts th.column,
.receipts td.column {
  width: 16.67%; 
  padding: 8px;
  text-align: left;
  border-bottom: 2px solid #ff0068;
}

.receipts th.column:last-child,
.receipts td.column:last-child {
  width: 16.67%; /* Adjust the width of the last column if needed */
}

/* Additional styling for the Download button, adjust as needed */
.download-button {
  background-color: #21B6A8; /* Pink background color */
  color: white;
  border: none;
  margin-top: 10px;
  padding: 6px 10px;
  cursor: pointer;
}
      .payments_container{
        height: 450px;
        width: 930px;
        border-bottom: 2px solid #ff0068;
        border-top: 2px solid #ff0068;
        padding: 10px;

      }
      .payments_title{
        font-family: poppins
        font-size: 18px;
        margin-bottom: 20px;
      }

      .receipts{
        border: 2px solid #ff0068;
        border-radius: 5px;
        padding: 10px;
        width: 900px;
        height: 300px;
      }


.custom-select {
  font-size: 16px; /* Increase font size to make the arrow appear larger */
  padding: 10px; /* Adjust padding as needed */
  border: 1px solid #ccc; /* Add a border style */
  color: black; /* Change the text color to pink */
  background-color: white; /* Set background color to white */
  background-image: url("expandarrow.png"); /* Replace with your custom arrow image */
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px 20px; /* Adjust the size as needed */
  appearance: none; /* Remove default dropdown arrow on some browsers */
}

  
  
      
      .services_tab1 {
        height: 450px;
        overflow: auto;
        width: 900px;
        padding: 30px;
        margin-left: 0px;
      }
      .services_services{
        display: grid;
        grid-template-columns: repeat(4, minmax(130px, 1fr));
        gap: 0px;
      }
      .overviewservices{
        display: grid;
        grid-template-columns: repeat(4, minmax(130px, 1fr));
        gap: 0px;
      

      }
      .profile_tab{
        display: flex;
      
       
      justify-content: space-between;
      }
      .active_Tab{
        font-size: 25px;
        color: #fff;
        font-family: poppins;
position: absolute;
right: -30px;      
        display: none;
      }
      .active_profile{
        font-size: 25px;
        color: #fff;
        font-family: poppins;
              
        display: none;

       
      }
   
      .submitform{
        background: #ff0068;
        font-family: poppins;
        font-weight: bold;
        color: #fff;
      }
      .filterservices1{
        background: #21B6A8;
        color: #fff;
        font-weight: bold;
        font-size: 12px;
        padding: 0px;
        margin: 0;
        position: absolute;
        width: 100px;
        height: 40px;
        right: 80px;
        margin-top: 100px;
       
        

      }
      filter-email{
        border: none;
        border-style: none;
        border-radius: none;
        
        
      }
      .radiofilters{
        width: 200px;
      }
      .radiofilters2{
        width: 200px;
      }
      .searchfilters{
        display: flex;
        width: 850px;
        justify-content: space-between;
      }
      .emailfilters{
        width: 200px;
        margin-bottom: 10px;
      }
      .filters-search{
        display: flex;
        position: relative;
       background: #ff0068;
       color: #fff;
       font-weight: bold;
       padding: 10px;
        width: 930px;
        justify-content: space-between;
        margin: 0;
        border-radius: 5px;
        
      }
      .filter1{
        width:150px;
        margin-bottom: 15px;
        
      }
      .filter2{
        width:150px;
      }
      .filter3{
        width:100px;
        margin-bottom: 15px;
      }
      .filter4{
        width:100px;
      }
      .filter5{
        width:100px;
      }
  
      select{
        width:200px;
        padding: 10px;
        font-weight: bold;
        border-style: solid;
        border-radius: 5px;
      }
      .closemetric{
        background: black;
        color: white;
        font-weight: bold;

      }
      .closemetric:hover{
        background: red;
        color: #fff;
        transition: background 0.5s;
      }
      .alert-container {
        
        width: 100%;
        height: 100%;
        font-family: poppins;
        font-size: px;
        background-color: #fff; /* Semi-transparent background: rgba(0, 0, 0, 0.3); */
       display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999; /* Ensure it's on top of other elements */
      }
      
      .alert-box {
        background-color: orange;
        width: 800px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        text-align: center;
        margin-bottom: 15px;
       
      }
      
      .close-alert {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
      }
      
      .close-alert:hover {
        background-color: #c0392b;
      }
      
      .request-index {
        .request-index {
          /* Optional styles for the index */
          font-weight: bold;
          margin-left: 10px; 
          float: right;
          position: absolute;
          right: 0;/* Adjust the margin as needed for spacing */
        }
      }
      .totalpendingreq{
        color: black;
        text-decoration: none;
        font-style: none;
        text-align: center;
      }
      .totalpendingreq:before{

      }
      .pending-requests-container {
        max-height: 300px; /* Adjust the maximum height as needed */
        overflow-y: auto; /* Add vertical scrollbar when content overflows */
        margin: 8px;
      }
      
      .pendingrequests {
        list-style-type: none;
        padding: 0;
       
        
       
        
      }
      .pending-request{
        background: #f5f5f5;
        margin: 5px;
        padding: 8px;
        border-radius: 10px;
       
        justify-content: space-between
        align-items: center;
      }
      
      .pendingrequests li {
        margin-bottom: 10px; /* Add spacing between list items */
      }
      
      .no-pending-requests {
        font-style: italic;
        color: #777; /* Adjust the color as needed */
      }
      
      .close-button {
        position: absolute;
        top: 0;
        right: 0px;
      
        background-color: transparent;
        border: none;
        cursor: pointer;
      }

      @keyframes fallingBounce {
        0% {
          transform: translateY(-10%);
        }
        20% {
          transform: translateY(5%);
        }
        40% {
          transform: translateY(-2%);
        }
        60% {
          transform: translateY(1%);
        }
        80% {
          transform: translateY(-1%);
        }
        100% {
          transform: translateY(0);
        }
      }
      
.overlay-container {
  position: absolute;
  place-items: center;
  width: 950px;
  height: 660px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2222; /* Set a high z-index to ensure it's on top */
  background-color: rgba(255, 255, 255, 0.3); /* Transparent white background */
  backdrop-filter: blur(10px);
  /* Semi-transparent overlay background */
  transition: backdropFilter 3s;
  
}

.expanded-content.show {
  opacity: 1;
  /* Keep the final position as you like */
  transform: translateY(0);
}
/* CSS styles for the expanded-content (the actual content inside the container) */
.expanded-content {
  background-color: #fff; /* Background color for the content */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  /* Add other styling as needed */
  animation: fallingBounce 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;

}

/* CSS styles for the "No Pending Requests" message */
.no-pending-requests {
  text-align: center;
  font-size: 18px;
  color: #555;
  /* Add other styling as needed */
}



      .dashcontent{
        
        width: 150px;
        padding: 0px;
        margin-left: -5px;
       
      

      }
      .btn_logout{
        width: auto;
        align-items: center;
        display: flex;
        width: 160px;
        padding: 0;
        position: absolute;
        bottom: 40px;
        
      }
.logsout{

  
  
    background-color: #fff;
    color: #FF0066;
    border: none;
    padding: 8px 18px;
    margin: 0 auto;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    

}

.username{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
  margin-bottom: 30px;
  color: white;
  font-family: poppins;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
width: 150px;
}
h4{


}
.Profile{
width: 100%;


}
.profile-pic {
  display: flex;
  
  justify-content: center;
  align-items: center; /* Center vertically */
text-align: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  color: #ff0068;
  font-size: 36px;
  font-family: poppins;
  font-weight: bold;
  margin: 0 auto 20px;
  margin-top: 10px;
 
}
.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Adjust the object-fit property to control how the image fits within the container */
}

.dashboard-section.active {
  font-weight: bold;
color: #ff0068;
  background-color: #ff0068;
 z-index: 99999;
  text-decoration: none;
  font-style: none;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  box-shadow: none;
  padding-top: 20px;
  padding-bottom: 20px;
width: 170px;
  .dashboard-section:hover{
background: #ff0068;
  }

  .dashboard-section-header{
    color:#fff;
    padding: 10px;
  width: 123px;
    border-radius: 5px;
    border: 2px solid #fff;
    margin: 0;
    
    
  }
  .active_Tab{
    display: block;
right: 0px;

 


  }
  .dashboard-section-body{
    color:#fff;
  }
  .dashboard-section-title{
    color: #fff;
    font-size: 14px;
  }

  transition: color 0.5s ease,  width 0.7s ease, border-radius 0.5s ease, border 0.5s ease, margin 0.5s ease;

}

.dashboard-container {
         
  padding: 15px;
 
  background-color: #ff0068;
  border: solid light-red 5px;
  width: 180px;
  height: 100%;
  left: 0;


}


div::-webkit-scrollbar {
  width: 0.5em;
}

div::-webkit-scrollbar-track {
  background-color: transparent;
}

div::-webkit-scrollbar-thumb {
  background-color: transparent;
}

/* For Firefox */
@-moz-document url-prefix() {
  div {
    scrollbar-width: none;
  }
}

      contactdetails{
        font-family: sans-serif;
margin: 30px auto;
text-align: center;
font-size: 20px;
max-width: 600px;
color: #fff;
position:relative;
      }

      contactdetails:before{
        content: "";
display:block;
width: 140px;
height:2px;
background: #fff;
position: absolute;
left: 0;
top: 50%;
z-index: 1111;
      }

      contactdetails:after{
        content: "";
display:block;
width: 140px;
height:2px;
background: white;
position: absolute;
right: 0;
top: 50%;
z-index: 1111;
      }

      

      .contact_details{
        background-color: #f5f5f5;
        padding: 10px;
        border-radius: 10px;
        margin-top: 0px;
        width: 830px;
        color: #454545;
       

      }
      .screening_questions{
        background-color: #ff0066;
        padding: 10px;
        border-radius: 10px;
        margin-top: 15px;
        width: 830px;
        color: #fffdd0;
      }

      .uploads{
        background-color: #ff0066;
        padding: 10px;
        border-radius: 10px;
        margin-top: 15px;
        width: 830px;
        color: #fffdd0;
      }
      .profile{
background-color: red;
      }
    
      input{
     color: #ff0068;
     font-weight: bold;
     padding: 10px;
     font-family: poppins;
        border-radius: 5px;
       
      }
      textarea{
width: 400px;
padding: 10px;
border-radius: 10px;
      }
     .registration-form {
      
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      max-width: 850px;
      height: 460px;
      margin: 10px;
      margin-left: 0px;
      padding: 20px;
      color: #fff;
      font-weight: bold;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow-y: auto; /* Add vertical scroll if content overflows */
     
    }
    
    .form-label {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      
      
    }
    
    .form-label select,
    .form-label textarea,
    .form-label input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .submit-button {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    
    .submit-button:hover {
      background-color: #0056b3;
    }
    .UserDashboard{
      display: flex;
     justify-content: center;
      width: 100%;
      align-items: center;
    background: azure;
    padding: 10px;
    height: 100vh;
   position: fixed;
   left: 0;
   top: 0;

      
     
    }

      
    
        .profile{
          position: fixed;
          left: 4%;
          top: 3%;
          display: block;
          font-size: 12px;
          width: 120px;
          
         
        }

        .name{
          font-weight: bold;
          margin-left: 19px;
          font-family: cursive;
          color: #fffdd0;
       
         
          text-align: center;
        
        }

        .profile-picture {
         
          background-color: #ff0066;
          align-items: center;
          width: 80px; 
          height: 80px; /* Adjust the size as needed */
          border-radius: 50%; /* Makes it a circle */
          overflow: hidden; /* Clip the image to the circular boundary */
          margin: 0 auto; /* Center horizontally */
          margin-bottom: -10px;
          margin-top: 15px;
          margin-left: 25px;
          border: 2px solid #ff0066; /* Add a border for styling */
          box-shadow: 0 0 5px #ff0066;
        }
        
        .profile-picture img {
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover; /* Maintain aspect ratio and cover the circle */
        }

        nav{
          height: 50px;
          width: 400px;
          display: flex;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 10px;
      }
      a{
          position: relative;
          text-decoration: none;
          font-family: 'Poppins',sans-serif;
          color: #454545;
          font-weight: bold;
          font-size: 14px;
          letter-spacing: 0.5px;
          padding: 0 10px;
          margin-right: 10px;

      }
      a:after{
          content: "";
          position: absolute;
          background-color: #ff3c78;
          height: 2px;
          width: 0;
          left: 0;
          bottom: -10px;
          transition: 0.3s;
      }
      a:hover{
         
        
      }
      a:hover:after{
          width: 100%;
      }
       

     
        .img-and-title{
          display: flex;
          width: 150px;
          justify-content: space-around;
          height: 100px;
 
          margin-bottom: 10px;
               
          position: inherit;
          top: 0;

        }
        .logo{
          height: 50px;
          position: fixed;
          top: 7%;
          left: 3%;
          border-radius: 50px;
          width: auto;
          background-color: none;
       
          

        }
        .img-and-title hr{
          border-top: 2px solid #fffdd0;
          border-bottom: 2px solid #fffdd0;
          margin-bottom: 20px;
          position: fixed;
          top: 21%;
          left: 0;
          width: 100%;
        }


    

        .dashboard-header {
          text-align: center;
          position: inherit;
          width: 250px;
          background-color: cream;

          
        }

        .dashboard-title {
          font-size: 14px;
          color: white;
          background-color: cream;
          height: 100px;
          margin-bottom: 20px;
          
        }
        .dashcontent{
          width: 100%;
        }

        .dashboard-content {
          display: block;
          width: 170px;
          position: relative;
          font-weight: bold;
        margin: 0 auto;  
        }

       

        .dashboard-section {
          background-color: #454545;
         cursor: pointer;
          border-radius: 3px;
          display: flex;
          justify-content: space-between;
          height: 15px;
       width: 125px;
          text-align: center;
          padding: 10px;
          padding-bottom: 17px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 35px;
          color:  #fff;
        }

       


        .dashboard-section-header {
          display: flex;
          align-items: center;
          height: 20px;
     width: 170px;
         text-align: center;
          position: inherit;
   
          
        }

      

        .dashboard-section-title {
          font-size: 15px;
         margin-left: 18px;
          color:  #fff;
         
        
        }

        .dashboard-section-body {
         font-size: 12px;
         margin: 0;


position: relative;
          color:  #fff;
        }
        .dashboard-section-body:hover{
          color: white;
        }

        .mainpage{
          width: 950px;
   height: 100%;
         padding: 15px;
       
          background-color: #fff;
margin-left: -19px;
          z-index: 5555;
          
         
       overflow: hidden;
          display: block;

        }
        .mainpage hr{
          border-top: 2px solid #FF0068;
          border-bottom: 2px solid #FF0068;
          margin-bottom: 0px;
         
         
          width:100%;
          border-radius: 10px;
          background: linear-gradient(to right, #21B6A8 , #FF0068);
        }

        .card{
          width: 20%;
          display: block;
          box-shadow: 2px 2px 20px black;
          border-radius: 5px; 
          margin: 2%;
          background-color: red;
         
         }
     
     .image img{
       width: 100%;
       border-top-right-radius: 5px;
       border-top-left-radius: 5px;
       
     
      
      }
     
     .title{
      
       text-align: center;
       padding: 10px;
       
      }
     
     h1{
       font-size: 20px;
      }
     
     .des{
       padding: 3px;
       text-align: center;
       padding-top: 10px;
       border-bottom-right-radius: 5px;
       border-bottom-left-radius: 5px;
     }
     button{
       margin-top: 40px;
       margin-bottom: 10px;
       background-color: #454545;
       color: pink;
       border: 1px solid black;
       border-radius: 5px;
       padding:10px;
     }
     button:hover{
       background-color: azure;
       color: #454545;
       transition: .5s;
       cursor: pointer;
     }

     .contentcard{
     
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Three columns */
        grid-gap: 20px; /* Gap between cards */
        margin-top: 20px; /* Adjust as needed */
        padding: 30px; /* Adjust as needed */
      background-color: #fffdd0;
      width: 900px;
      height: 300px;
    margin-top: 300px;
    margin-left: 60px;
    border-radius: 30px;
      transition: 0.1s linear;
      flex: 1;
      overflow: auto;
     }

     .metrics{
      
      background-color: white;
      border-radius: 10px;
      display: flex;
     justify-content: space-between;
      width: 950px;
      margin-bottom: 0px;
      
     }
   
     .servicesdone{
    
      padding-left: 8px;
    height: 100px;
    width: 200px;
   
    color: azure;
    border-radius: 10px;
    background-color:#ff0068;
    cursor: pointer;

     }
.pendingservices{
 
  padding-left: 8px;
  color: azure;
  height: 100px;
  width: 200px;
  border-radius: 10px;
  background-color:#ff0068;
  cursor: pointer;
}
.Rewards{

  padding-left: 8px;
  color: azure;
  height: 100px;
  width: 200px;
  border-radius: 10px;
  background-color:#ff0068;
  cursor: pointer;

}
.popular_heading{
  margin-left: 35px;
}
.popularservice_heading {
  position: relative;
  color: #ff0068;
  font-size: 25px;
  font-weight: bold;
  font-family: poppins;
  margin: 0;
  padding: 10px;
}

.popularservice_heading:before{
  content: '';
  border-top: 2px solid #ff0068; /* Adjust the style and color as needed */
  display: block;
  width: 100%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
}
.popularservice_heading:after {
  content: '';
  border-top: 2px solid #ff0068; /* Adjust the style and color as needed */
  display: block;
  width: 80%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
}

.popularservice_heading:before {
  left: 0;
  margin-left: 0%;
}

.popularservice_heading:after {
  right: 0%;
  margin-right: 0%;
}


.availableservices{
  height: 270px;
   overflow: auto;
    width: 100%;
     padding-top: 30px;
      padding-bottom: 30px;
       margin-left: 0px;
        border-left: 2px solid #ff0068;
        border-right: 2px solid #ff0068;

}
.my_services{
  height: 260px;
  overflow: auto;
  width: 950px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: 30px;
  border-left: 2px solid #ff0068;
  border-right: 2px solid #ff0068;
}
.container {
  display: flex;
  justify-content: flex-start;
  align-items: left;
  
}
.set {
  display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #fff;
  margin-right: auto; /* Push updates container to the left */
}

.updates-Container {
  border: 1px solid #ff0068;
  padding: 10px;
  margin: 1px;
  box-shadow: 0 0 15px rgba(255, 0, 104, 0.5);
  width: 300px; /* Adjust width */
  height: 150px; /* Adjust height */
  margin-top: 100px;
  margin-left: 15px;
  border-radius: 10px; /* Adjust the value to change the roundness */ 
  font-family: Arial, sans-serif; /* Set font family to Arial */
  font-weight: bold; /* Set font weight to bold */
  color:#ff0068; /* Set text color to black */
  font-size: 20px; /* Set font size to 20 pixels */
  position: relative;
}

.updates-Container::before
 {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px solid #ff0068;
}


.updates-Container::before {
  bottom: 78%;
}

.set:nth-child(2) .updates-Container {
  width: 200px; /* Width of the containers in the middle */
  height:400px;
}

.set:nth-child(1) .updates-Container,
.set:nth-child(3) .updates-Container {
  width: 200px; /* Width of the containers on the left and right */
  height:400px;
}



/*all container code*/
.container {
  display: flex; /* Use flexbox */
  gap:100px;
  justify-content: space-between; /* Distribute space between the containers */
}


.container {
  display: flex;
  justify-content: flex-start;
  align-items: left;
  
}

.updates-Container2 {
  border: 2px solid #ff0068;
  padding: 10px;
  margin: 1px;
  box-shadow: 0 0 15px rgba(255, 0, 104, 0.5);
  width: 200px; /* Adjust width */
  height: 400px; /* Adjust height */
  margin-top: -300px;
  margin-left: 20px;
  border-radius: 10px; /* Adjust the value to change the roundness */ 
  font-family: Arial, sans-serif; /* Set font family to Arial */
  font-weight: bold; /* Set font weight to bold */
  color:#ff0068; /* Set text color to black */
  font-size: 20px; /* Set font size to 20 pixels */
  position: relative;
}

.updates-Container2::before
 {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px solid #ff0068;
}


.updates-Container2::before {
  bottom: 78%;
}



.container2 {
  display: flex; /* Use flexbox */
  gap:100px;
  justify-content: space-between; /* Distribute space between the containers */
}





/* .set {
display: flex;
flex-direction: column;
align-items: left;
background-color: transparent;
margin-right: auto; /* Push updates container to the left */
}*/

@media (max-width: 768px){
  .dashboard-container{
    width: 80px;
height: 100vh;
  }
  .mainpage{
height: 100vh;
  }
  .logsout{
    position: fixed;
    bottom: 20px;
    left: 10px;
    margin: 0;
    width: 75px;
    
    font-size: 12px;
    font-weight: bold;

  }
  .dashboard-section{
    width: 50px;
    height: 30px;
  }
  .username{
    background: red;
  margin: 0;
  padding: 0;
  margin-bottom: 50px;
  width: 130px;
  font-size: 12px;
  display: none;
 
  }
  .img-and-title{
    width: 60px;
    margin-bottom: 30px;
    
  }
  .profile-pic{
    background: #fff;
    color: #ff0068;
    width: 50px;
    height: 50px;
    margin-top: 25px;
    font-size: 25px;

  }
  .dashboard-section-title{
    display: none;
  }
  .dashboard-section-body{
    display: none;
  }
  .dashboard-section-header{
    height: 40px;
    justify-content: center;
    font-size: 18px;
  
  }
  .UserDashboard{
    margin: 0;
    padding: 0;
  }

  .dashboard-section.active {
    font-weight: bold;
  color: #ff0068;
    background-color:white;
   width: 170px;
   z-index: 99999;
    text-decoration: none;
    font-style: none;
    
  
    .dashboard-section-header{
      color:#ff0068;
      width: 60px;
      font-size: 30px;
    }
    .dashboard-section-body{
      color:#ff0068;
    }
    .dashboard-section-title{
      color: #ff0068;
    }
   
  
}
.maindash{

  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 280px;
  justify-content: space-between;
  margin-right: 0;
  padding: 0;
  
}
a{
  padding: 3px;
  font-size: 12px;
  margin: 0;
}

.metrics{
  margin: 0;
  width: 100%;
}
.servicesdone{
  width: 80px;
  height: 70px;
  font-size: 12px;
  font-family: poppins;
}
.pendingservices{
  width: 80px;
  height: 70px;
  font-size: 12px;
  font-family: poppins;
}
.Rewards{
  width: 80px;
  height: 70px;
  font-size: 12px;
  font-family: poppins;
}
progress{
  display: none;
}
.overlay-container{
  width: 300px;
  margin: 0;
  padding: 0;
  margin-left: -10px;
  height: 100vh;
}
.expanded-content{
  width: 200px;

}
.totalpendingreq{
  font-size: 12px;
}
.alert-box{

  font-size: 10px;
  height: 80px;
}
p{

  margin-top: -3px;
}
IoWarningSharp{
display: none;
color: blue;
}
.pendingrequests{
  font-size: 10px;
  
  height: auto;
  overflow-y: auto;
}
.closemetric{
  padding: 5px;
  font-size: 12px;
  margin: 0;
  margin-top: 15px;
}
.availableservices{
  width: 100%;
  padding: 20;
  margin: 0;
  margin-top: 20px;
  margin-left:-10px;
}
.my_services{
  width: 100%;
  padding: 20;
  margin: 0;
  margin-top: 20px;
  margin-left:-10px;
}
.registration-form{
  width: 280px;
  margin: 0;
  margin-top: 10px;
  padding: 0;
  background-color: #f5f5f5;
  border-style: none;
  height: 100vh;
}
.contact_details{
  width: 270px;
  padding: 8px;
  height: 560px;
  margin: 0;
  font-size: 12px;
}
.submitform{
  position: absolute;
  border-radius: 20px;
  
 
}



  .overviewservices {
    grid-template-columns: repeat(3, minmax(100px, 1fr)); /* Display one card per row on smaller screens */
    gap: 0px; /* Adjust the gap for smaller screens */
  padding: 0;
  }
  .services_services{
    grid-template-columns: repeat(3, minmax(100px, 1fr)); /* Display one card per row on smaller screens */
    gap: 0px; /* Adjust the gap for smaller screens */
  padding: 0;
  }
  .services_tab {
    height: 450px;
    overflow: auto;
    width: 100%;
    padding: 10px;
    margin-left: 0px;
  }
  .filters-search{
    width: 100%;
    margin: 0;
    
  }
  


}
@media only screen and (max-width: 600px) {
  /* Adjust styles for mobile devices */
  body {
    font-size: 1px; /* Adjust the base font size for smaller screens */
  }

  .maindash a {
    font-size: 9px;
  }

  .metrics {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .servicesdone,
  .pendingservices,
  .Rewards {
    width: 100%;
    margin-bottom: 10px;
    width: 80px;
    height: 70px;
    font-size: 12px;
    font-family: poppins;
  }

  .overviewservices {
    flex-direction: column;
  }

  .productCard {
    width: 100%;
    margin-bottom: 10px;
  }
  .updates-Container{
    border: 3px solid #ff0068;
    padding: 10px;
    margin: 5px;
    width: 280px; /* Adjust width */
    height: 150px; /* Adjust height */
    margin-top: 30px;
    border-radius: 10px; /* Adjust the value to change the roundness */ 
    font-family: Arial, sans-serif; /* Set font family to Arial */
    font-weight: bold; /* Set font weight to bold */
    color: black; /* Set text color to black */
    font-size: 20px; /* Set font size to 20 pixels */
    position: relative;
  }
  .accounts-Container{

  }
  
  
  
}
      






      `}</style>
    </div>
    
  );
};


export default UserDashboard;


//good colours: #fffd #FF0040,#FF0066, #FF0078, #FA3980, #ffeba7, #ff3c78, #21B6A8 
/**/