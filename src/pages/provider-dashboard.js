import React from 'react';
import { useState, useEffect, useRef} from 'react'; 
import { FaUsers, FaUserCircle, FaEnvelope, FaStar, BiDashboard, FaHome,  FaChartBar, FaTools,FaShoppingCart, FaRegPaperPlane, FaCalendarAlt } from 'react-icons/fa';
import Dashheader from './components/dashheader';
import axios from 'axios';
import { Products } from './components/services';
import { createClient } from '@supabase/supabase-js';
import { BarLoader } from "react-spinners";
import { useRouter } from 'next/router';
import { IoWarningSharp } from 'react-icons/io5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';







const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';

const supabase = createClient(supabaseUrl, supabaseApiKey);
//FaTools

const UserDashboard = (order) => {
  const router = useRouter();
  const { userEmail } = router.query;
  const firstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : '';
const [currentorders, setcurrentorders] = useState([]);
const [pendingorders, setpendingorders] = useState([]);
const [Customers, setCustomers] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const customersPerPage = 3;
const indexOfLastCustomer = currentPage * customersPerPage;
const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
const currentCustomers = Customers.slice(indexOfFirstCustomer, indexOfLastCustomer);


  const [providerEmail, setProviderEmail] = useState('');

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
  const [pendingRequests, setPendingRequests] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const numberOfDisplayedcurrentOrders = currentorders.length;
  const numberOfDisplayedpendingOrders = pendingorders.length;

  const [selectedDate, setSelectedDate] = useState(null);
  const [textDate, setTextDate] = useState('');
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

  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [selectedIDFile, setSelectedIDFile] = useState(null);
  const [selectedTradingLicenseFile, setSelectedTradingLicensesFile] = useState(null);
  const [selectedQualificationsFile, setSelectedQualificationsFile] = useState(null);
  const [selectedBusinessRegistrationFile, setSelectedBusinessRegistrationFile] = useState(null);
  const [fetchedUserInfo, setFetchedUserInfo] = useState(null);
  const [prouploadedFiles, setprouploadedFiles] = useState([]);
  const [showWarning, setShowWarning] = useState(true); // Initially show the warning

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const fileInputRefs = {
    avatar: useRef(null),
    ID: useRef(null),
    tradingLicense: useRef(null),
    qualifications: useRef(null),
    businessRegistration: useRef(null),
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store uploaded file names
  const [uploading, setUploading] = useState(false);

  const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';
   const supabase = createClient(supabaseUrl, supabaseKey);
   const [activeTabOrders, setActiveTabOrders] = useState('current');
   const [activeTabCustomers, setActiveTabCustomers] = useState('current1');
   const [profileImage, setProfileImage] = useState(null);
   const [imageSrc, setImageSrc] = useState('');
const [displayedimage, setDisplayedImage] = useState('');
   const handleDownloadInvoice = (customerEmail) => {
    // Logic to download invoice for the given customer
    console.log(`Downloading invoice for ${customerEmail}`);
  };

  const [newService, setNewService] = useState({
    serviceName: '',
    description: '',
    availability: 'available',
    hourlyRate: '',
    servicePhoto: null,
  });

  const handlePhotoChange = (e) => {
    const photoFile = e.target.files[0];
    setNewService({ ...newService, servicePhoto: photoFile });
  };




  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toLocaleDateString('en-US') : '';
    setTextDate(formattedDate);
    // You can handle further actions or update state as needed
  };
  


   const handleTabChangeOrders = (tabName) => {
    setActiveTabOrders(tabName);
    // Fetch the respective orders based on the selected tab if needed
  };
  const handleSave = () => {
    console.log('Services to be saved:', services);
    // You can perform additional actions if needed
  };
  const handleAddNewService = () => {
    setServices((prevServices) => [
      ...prevServices,
      { serviceName: '', description: '', availability: 'available', hourlyRate: '' },
    ]);
  };
  

   const acceptServiceRequest = async (requestId) => {
    try {
      const response = await fetch('/api/acceptservice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Service accepted:', result);
        // Perform any necessary actions after accepting the service, e.g., updating UI, fetching updated data, etc.
      } else {
        const error = await response.json();
        console.error('Error accepting service:', error);
        // Handle error scenarios in UI or other logic
      }
    } catch (error) {
      console.error('Error accepting service:', error);
      // Handle other errors, if any
    }
  };
  
  
  const handleAcceptOrder = (requestId) => {
    // Call the function to accept the service request
    acceptServiceRequest(requestId);
    // You can also perform other actions here, if needed
  };
  
  

   const handleRedoFileSelection = (fileType) => {
    switch (fileType) {
      case 'ID':
        setSelectedIDFile(null);
        break;
      case 'avatar':
        setSelectedAvatarFile(null);
        break;
      case 'tradingLicense':
        setSelectedTradingLicensesFile(null);
        break;
      case 'qualifications':
        setSelectedQualificationsFile(null);
        break;
      case 'businessRegistration':
        setSelectedBusinessRegistrationFile(null);
        break;
      default:
        break;
    }
  };

  const handleFileUpload = (fileType, e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
  
      switch (fileType) {
        case 'ID':
          setSelectedIDFile(file);
          break;
        case 'avatar':
          setSelectedAvatarFile(file);
          break;
        case 'tradingLicense':
          setSelectedTradingLicensesFile(file);
          break;
        case 'qualifications':
          setSelectedQualificationsFile(file);
          break;
        case 'businessRegistration':
          setSelectedBusinessRegistrationFile(file);
          break;
        default:
          break;
      }
    }
  };
  

  const generateUniqueFileName = (originalFileName) => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const extension = originalFileName.split('.').pop();
    return `${timestamp}_${randomId}.${extension}`;
  };

  const uploadFiles = async () => {
    try {
      const selectedFiles = [
        { type: 'ID', file: selectedIDFile },
        { type: 'avatar', file: selectedAvatarFile },
        { type: 'tradingLicense', file: selectedTradingLicenseFile },
        { type: 'qualifications', file: selectedQualificationsFile },
        { type: 'businessRegistration', file: selectedBusinessRegistrationFile },
      ];
  
      const filesToUpload = selectedFiles.filter((fileObj) => fileObj.file !== null);
  
      if (filesToUpload.length === 0) {
        console.error('No files selected.');
        return;
      }
  
      setUploading(true);
  
      const uploadedFileNames = [];
  
      const storageFolder = {
        avatar: 'avatars/',
        ID: 'IDs/',
        tradingLicense: 'trading_licenses/',
        qualifications: 'qualifications/',
        businessRegistration: 'business_registrations/',
      };
  
      for (const fileObj of filesToUpload) {
        const uniqueFileName = generateUniqueFileName(fileObj.file.name);
  
        const { error: uploadError } = await supabase.storage
          .from('files')
          .upload(storageFolder[fileObj.type] + uniqueFileName, fileObj.file);
  
        if (uploadError) {
          console.error('Error during file upload to storage:', uploadError);
          continue;
        }
  
        uploadedFileNames.push({ [fileObj.type]: uniqueFileName });
      }
  
      setUploading(false);
  
      const providerEmail = localStorage.getItem('userEmail');
      await updateFilesIfEmailMatches(providerEmail, uploadedFileNames);
    } catch (error) {
      console.error('An error occurred during file upload:', error);
      setUploading(false);
    }
  };
  
  const updateFilesIfEmailMatches = async (email, uploadedFileNames) => {
    try {
      const response = await fetch('/api/update-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, uploadedFileNames }),
      });
  
      if (response.ok) {
        console.log('Files updated successfully');
      } else {
        console.error('Error updating files:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  
  
  
  
   /* const handleFileInputChange = (event) => {
      setSelectedFiles(Array.from(event.target.files));
    };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      for (const file of selectedFiles) {
        const storageResponse = await supabase.storage
          .from('ProviderUserinfo') // Replace 'folder-name' with your desired folder name
          .upload(file.name, file);

        console.log('File uploaded successfully:', storageResponse.Key);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };*/

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


  const fetchProviderData = async () => {
    try {
      const response = await axios.get('/api/login/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const { serviceProvider } = response.data;
        setProviderEmail(serviceProvider.email);
      }
    } catch (error) {
      console.error('Error fetching provider email:', error);
    }
  };

  useEffect(() => {
    if (Customers.profilePictureName) {
      fetchAndDisplayImage();
    }
  }, [Customers.profilePictureName]);
  const fetchAndDisplayImage = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .download(`avatars/${Customers.profilePictureName}`);
  
      if (error) {
        console.error('Error fetching image:', error);
        // Handle error scenarios if needed
      } else {
        const url = URL.createObjectURL(data);
        setDisplayedImage(url);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      // Handle error scenarios if needed
    }
  };
  useEffect(() => {
  
    const userEmail = localStorage.getItem('userEmail'); // Fetch userEmail from localStorage or wherever it's stored
  
    const fetchCustomers = async (userEmail) => {
      try {
        const response = await axios.get(`/api/fetchcurrentcus?userEmail=${userEmail}`);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const fetchcurrentOrders = async (userEmail) => {
      try {
        const response = await axios.get(`/api/currentorderslist?userEmail=${userEmail}`);
        setcurrentorders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const fetchpendingOrders = async (userEmail) => {
      try {
        const response = await axios.get(`/api/pendingorderslist?userEmail=${userEmail}`);
        setpendingorders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const fetchUserInformation = async (email) => {
      try {
        const response = await axios.get(`/api/user-info?userEmail=${email}`);
        setFetchedUserInfo(response.data || {});
        setEditedUserInfo(response.data || {});
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user information:', error);
        setLoading(false);
      }
    };
    const fetchUploadedFiles = async () => {
      try {
        const response = await axios.get(`/api/uploadedfiles?userEmail=${email}`);
        prosetuploadedFiles(response.data); // Assuming response.data is an array of file names
      } catch (error) {
        console.error('Error fetching uploaded files:', error);
      }
    };

    fetchUploadedFiles();
    document.body.style.margin = '0';
    

    if (localStorage.getItem('token')) {
      axios.get('/api/login/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        setUserData(response.data.user);
        
        if (response.data.user.role === 'service_provider') {
          fetchProviderData(); // Fetch provider data if the user is a provider
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
    }
    if (userEmail) {
      fetchUserInformation(userEmail);
      fetchcurrentOrders(userEmail); // Fetch orders for the logged-in user
      fetchpendingOrders(userEmail); // Fetch orders for the logged-in user
      fetchCustomers(userEmail);
    }





  }, [userEmail]);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const dataToSend = {
        ...editedUserInfo,
        dateOfBirth: selectedDate ? selectedDate.toLocaleDateString('en-US') : '', // Convert date to string
      };
  
      await axios.put(`/api/updateinfo?userEmail=${fetchedUserInfo.email}`, dataToSend);
      setFetchedUserInfo(dataToSend);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // For dateOfBirth, update the state differently
    if (name === 'dateOfBirth') {
      setSelectedDate(new Date(value)); // Update selectedDate state
      setTextDate(value); // Update textDate state (if needed)
    } else {
      setEditedUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    }
  };
  
  


  const handleAcceptRequest = async (userEmail) => {
    try {
      const response = await fetch('/api/acceptrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: pendingRequests.pro_email }), // Use pendingRequests instead of pendingRequest
      });

      if (response.ok) {
        // Request accepted successfully, update the UI or fetch pending requests again
        await deletePendingRequest(pendingRequests.pro_email);
      await populatePaidRequests(pendingRequests);
 
      } else {
        console.error('Error accepting request:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };
  const handleTabChange2 = (tab1) => {
    setActiveTab2(tab1);
    if (selectedTab === tab1) {
      setSelectedTab('');
      
    } else {
      setSelectedTab(tab1);
    }
  };

  const deletePendingRequest = async (pro_email) => {
    try {
      await fetch('/api/deletependingrequest', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pro_email }), // Send the provider email to identify the entry to delete
      });
    } catch (error) {
      console.error('Error deleting pending request:', error);
    }
  };
  
  // Define a function to populate the paidrequests table with the same data
  const populatePaidRequests = async (pendingRequest) => {
    try {
      const { pro_email, service, price } = pendingRequest;
  
      await fetch('/api/populatepaidrequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pro_email, service, price }), // Send the data to populate paidrequests
      });
    } catch (error) {
      console.error('Error populating paid requests:', error);
    }
  };

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
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

<div className="dashcontent">
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
            <FaUserCircle className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Profile</h3>
          </div>

          <div className='active_Tab'>
          &gt;
</div>

        </div>
        <div className={`dashboard-section ${selectedTab === 'orders' ? 'active' : ''}`}
          onClick={() => handleTabChange2('orders')}>
          <div className="dashboard-section-header"  >
            <FaRegPaperPlane className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Orders</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
        </div>
        
        <div className={`dashboard-section ${selectedTab === 'Customers' ? 'active' : ''}`}
          onClick={() => handleTabChange2('Customers')}>          <div className="dashboard-section-header">
            <FaUsers className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Customers</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
         
        </div>
        <div className={`dashboard-section ${selectedTab === 'My Services' ? 'active' : ''}`}
          onClick={() => handleTabChange2('My Services')}>          <div className="dashboard-section-header">
            <FaTools className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">My Services</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
          </div>

          <div className={`dashboard-section ${selectedTab === 'Analytics' ? 'active' : ''}`}
          onClick={() => handleTabChange2('Analytics')}>          <div className="dashboard-section-header">
            <FaChartBar className="dashboard-section-icon" />
            <h3 className="dashboard-section-title">Analytics</h3>
          </div>
          <div className='active_Tab'>
&gt;
</div>
          </div>
</div>
<div className='btn_logout'>
      <button className='logsout'>Log Out</button>
      </div>
     
      


      </div>
      </div>
      <div className='mainpage'>
      {expandedPendingServices && (
  <div className='overlay-container'>
    <div className="expanded-content">
      {pendingRequests === null ? ( // Check if pendingRequests is null (while loading)
        <div className="loading-spinner">
          <BarLoader color={"#36D7B7"} loading={true} size={150} />
          <p>Loading pending requests...</p>
        </div>
      ) : pendingRequests.length > 0 ? (
        <div className='requestcard'>
          <h2 className='totalpendingreq'>Awaiting Approval ({pendingRequests.length})</h2>
          {pendingRequests && pendingRequests.length > 0 && (
        <div className="alert-container">
         
            
         
          
        </div>
      )}
          <ul className='pendingrequests'>
            {pendingRequests.map((pendingrequest, index) => (
              <li key={pendingrequest.id} className="pending-request">
                <strong>Provider Email:</strong> {pendingrequest.pro_email}<br/>
                <strong>Service:</strong> {pendingrequest.service}<br/>
                <strong>Price:</strong> {pendingrequest.price}
                <span className="request-index">{index + 1}</span>
              </li>
            ))}
          </ul>
          <button className='acceptrequest' onClick={() => handleAcceptRequest(pendingRequests.pro_email)}>Accept</button>
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
        {activeTab2 === 'dashboard' &&(
          <div>
      <Dashheader />
      <hr/>




      <nav className='maindash'>
          <a href="#" onClick={() => handleTabChange('overview')}>Updates</a>
          <a href="#" onClick={() => handleTabChange('services')}>Reviews</a>
          <a href="#" onClick={() => handleTabChange('accounts')}>Account</a>
          <div className="search-container"></div>
          <div className="account-link">
          <a href="#" onClick={() => handleTabChange('accounts')}>
    
    <span className="search-link" onClick={(e) => handleSearchClick(e)}>
    <span className="search-symbol" role="img" aria-label="Search">&#128269;</span>
    </span>
  </a>
</div>
 
         
          

        </nav>
        {activeTab === 'overview' && (
          <div className='Dash-Container'>
         <div className="metrics">
         <div
  className={`servicesdone ${expandedPendingServices ? 'expanded' : ''}`}
  onClick={() => {
    setExpandedPendingServices(!expandedPendingServices);
    // Perform the database search here
 
  }}
>
 <br/>
 

    <h3>Pending Requests</h3>
  
    <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div>
    
</div>


<div className={`pendingservices ${expandedPendingServices ? 'expanded' : ''}`} onClick={() => setExpandedPendingServices(!expandedPendingServices)}>
    <h3>Expenses</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={pendingServicesProgress} max="100"></progress>
      <span>{pendingServicesProgress}%</span>
    </div>
  </div>

  <div className={`Rewards ${expandedRewards ? 'expanded' : ''}`} onClick={() => setExpandedRewards(!expandedRewards)}>
    <h3>Points</h3>
    <div className="progress-circle">
      <progress className="circle-progress" value={rewardsProgress} max="100"></progress>
      <span>{rewardsProgress}%</span>
    </div>
    <div className='popularservice_heading'>
    <p className='popular_heading'>Current Services</p>
       </div>
       
     
  </div>
  


 
  
  
</div>

   
          </div>

          
        )}
       
        {activeTab === 'services' && (
         
<div style={{ height: '400px', overflow: 'auto', width: '900px', padding: '30px', marginLeft: '40px'}}>
   
      
      </div>
        )}
       
        {activeTab === 'accounts' && (
          <div>
            {/* Add content for the Accounts tab here */}
          </div>
        )}
        
        {activeTab === 'payments' && (
          <div>
            {/* Add content for the Payments tab here */}
          </div>
        )}

    </div>
        )}

{activeTab2 === 'profile' &&(
<div className='mainpage'>


<Dashheader />
      <div></div>
      <div className='info_container'>
    <div className='pfp_and_files'> 
    <div className='edit_pfp'>
    <h4>Profile Picture</h4>
    <div className='pfp'></div>
   <div className='edit_container1'> <button className='edit_image'>Edit</button></div>
    </div>

      <div className="upload-form">
     <div className='uploadfiles'><p className='fileheading'>Upload Documents</p><button className="upload-button" onClick={uploadFiles} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button></div> 
     
      <label htmlFor="avatar-upload" className="custom-file-upload">
    {selectedAvatarFile ? (
      <>
        <span>
          <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('avatar')} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {selectedAvatarFile.name}
        </span>
      </>
    ) : (
      <span>ID/Passport</span>
    )}
  </label>
  <input
    id="avatar-upload"
    type="file"
    className="visually-hidden"
    onChange={(e) => handleFileUpload('avatar', e)}
    ref={fileInputRefs.avatar}
  />

  <label htmlFor="id-upload" className="custom-file-upload">
    {selectedIDFile ? (
      <>
        <span>
          <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('ID')} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          {selectedIDFile.name}
        </span>
      </>
    ) : (
      <span>Business License</span>
    )}
  </label>
  <input
    id="id-upload"
    type="file"
    className="visually-hidden"
    onChange={(e) => handleFileUpload('ID', e)}
    ref={fileInputRefs.ID}
  />

<label htmlFor="trading-license-upload" className="custom-file-upload">
  {selectedTradingLicenseFile ? (
    <>
      <span>
        <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('tradingLicense')} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        {selectedTradingLicenseFile.name}
      </span>
    </>
  ) : (
    <span>Trading License</span>
  )}
</label>
<input
  id="trading-license-upload"
  type="file"
  className="visually-hidden"
  onChange={(e) => handleFileUpload('tradingLicense', e)}
  ref={fileInputRefs.tradingLicense}
/>

<label htmlFor="qualifications-upload" className="custom-file-upload">
  {selectedQualificationsFile ? (
    <>
      <span>
        <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('qualifications')} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        {selectedQualificationsFile.name}
      </span>
    </>
  ) : (
    <span>Qualifications</span>
  )}
</label>
<input
  id="qualifications-upload"
  type="file"
  className="visually-hidden"
  onChange={(e) => handleFileUpload('qualifications', e)}
  ref={fileInputRefs.qualifications}
/>

<label htmlFor="business-registration-upload" className="custom-file-upload">
  {selectedBusinessRegistrationFile ? (
    <>
      <span>
        <FontAwesomeIcon icon={faRedo} onClick={() => handleRedoFileSelection('businessRegistration')} />
        &nbsp;&nbsp;&nbsp;&nbsp;
        {selectedBusinessRegistrationFile.name}
      </span>
    </>
  ) : (
    <span>Business Registration</span>
  )}
</label>
<input
  id="business-registration-upload"
  type="file"
  className="visually-hidden"
  onChange={(e) => handleFileUpload('businessRegistration', e)}
  ref={fileInputRefs.businessRegistration}
/>

     
    
    </div>
    </div>

    <div className='profile_information'>

 
    <div className="user-info-container">
  {loading ? (
    <p>Loading...</p>
  ) : (
    <div className="user-info">
      <div className="personalinfo_header">
        <h4 className='personalinfo_heading'>Personal Information</h4>
        {editing && (
          <button className='back_arrow' onClick={() => setEditing(false)}>Back</button>
        )}
        {editing ? (
          <button className='edit_personal' onClick={handleSaveClick}>Save</button>
        ) : (
          <button className='edit_personal' onClick={handleEditClick}>Edit</button>
        )}
      </div>
      
      {/* Display editable fields */}
      {!editing ? (
        <>
       
          <div className="info-item">
                <div className="label">Name:</div>
                <div className="data">{fetchedUserInfo.name || 'N/A'}</div>
              </div>
              <div className="info-item">
                <div className="label">Surname:</div>
                <div className="data">{fetchedUserInfo.surname || 'N/A'}</div>
              </div>
              <div className="info-item">
                <div className="label">Email:</div>
                <div className="data">{fetchedUserInfo.email || 'N/A'}</div>
              </div>
              <div className="info-item">
                <div className="label">Date of Birth:</div>
                <div className="data">{fetchedUserInfo.dateOfBirth || 'N/A'}</div>
              </div>
              <div className="info-item">
                <div className="label">Identification Type:</div>
                <div className="data">{fetchedUserInfo.identificationType || 'N/A'}</div>
              </div>

              <div className="info-item">
                <div className="label">Phone:</div>
                <div className="data">{fetchedUserInfo.phone || 'N/A'}</div>
              </div>
              <div className="info-item">
            <div className="label">Country:</div>
            <div className="data">{fetchedUserInfo.country || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">City:</div>
            <div className="data">{fetchedUserInfo.city || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">ZIP:</div>
            <div className="data">{fetchedUserInfo.zip || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">Street:</div>
            <div className="data">{fetchedUserInfo.street || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">Building No:</div>
            <div className="data">{fetchedUserInfo.buildingNo || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">Company Name:</div>
            <div className="data">{fetchedUserInfo.companyName || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="label">Company Registration:</div>
            <div className="data">{fetchedUserInfo.companyRegistration || 'N/A'}</div>
          </div>
        </>
      ) : (
        <div className='editablecont'>
        {/* Display editable fields */}
     
        <div className="info-item">
                <div className="label">Name:</div>
                <input
                  type="text"
                  name="name"
                  value={editedUserInfo.name || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-item">
                <div className="label">Surname:</div>
                <input
                  type="text"
                  name="surname"
                  value={editedUserInfo.surname || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="info-item">
                <div className="label">Email:</div>
                <div className="label-text" style={{ color: 'red', fontSize: '13px', marginTop: '2px' }}>Not allowed.</div>

                <input
                  type="text"
                  name="email"
                  value={editedUserInfo.email || ''}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="info-item">
      <div className="label">Date of Birth:</div>
      <div className="date-picker-container">
        <input
          type="text"
          name="dateOfBirth"
          value={textDate}
          onChange={handleInputChange}
          placeholder="Select date"
        />
        <div className="icon" onClick={() => document.getElementById('datePicker').click()}>
          <FaCalendarAlt />
        </div>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy" // Customize the date format if needed
          showYearDropdown
          minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 70))}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
          scrollableYearDropdown
          className="d-none"
        />
      </div>
    </div>
    <div className="info-item">
        <div className="label">Nationality:</div>
        <select
        type="text"
          name="nationality"
          value={editedUserInfo.nationality || ''}
          onChange={handleInputChange}
        >
                    <option value="Select">Select</option>

          <option value="South-Africa">South Africa</option>
        </select>
      </div>
      <div className="info-item">
        <div className="label">Identification Type:</div>
        <select
        type="text"
          name="identificationType"
          value={editedUserInfo.identificationType || ''}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="ID">ID</option>
          <option value="Passport">Passport</option>
        </select>
      </div>
      <div className="info-item">
            <div className="label">ID/Passport No:</div>
            <input
              type="text"
              name="IDPassport_No"
              value={editedUserInfo.IDPassport_No || ''}
              onChange={handleInputChange}
            />
          </div>
      <div className="info-item">
        <div className="label">Gender:</div>
        <select
          type="text"
          name="gender"
          value={editedUserInfo.gender || ''}
          onChange={handleInputChange}
        >
                    <option value="Select">Select</option>

          <option value="Male">Male</option>
          <option value="Female">Female</option>

        </select>
      </div>

      <div className="info-item">
        <div className="label">Country:</div>
        <select
          type="text"
          name="country"
          value={editedUserInfo.country|| ''}
          onChange={handleInputChange}
        >
        <option value="Select">Select</option>
         <option value="South Africa">South Africa</option>

        </select>
      </div>

      <div className="info-item">
        <div className="label">Province:</div>
        <select
        type="text"
          name="province"
          value={editedUserInfo.province || ''}
          onChange={handleInputChange}
        >
         <option value="Select">Select</option>
          <option value="Gauteng">Gauteng</option>
        </select>
      </div>

          <div className="info-item">
            <div className="label">City:</div>
            <input
              type="text"
              name="city"
              value={editedUserInfo.city || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">ZIP:</div>
            <input
              type="text"
              name="zip"
              value={editedUserInfo.zip || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">Street:</div>
            <input
              type="text"
              name="street"
              value={editedUserInfo.street || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">Building No:</div>
            <input
              type="text"
              name="buildingNo"
              value={editedUserInfo.buildingNo || ''}
              onChange={handleInputChange}
              
            />
          </div>
          <div className="info-item">
            <div className="label">Phone:</div>
            <input
              type="text"
              name="phone"
              value={editedUserInfo.phone || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">Company Name:</div>
            <input
              type="text"
              name="companyName"
              value={editedUserInfo.companyName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="info-item">
            <div className="label">Company Reg:</div>
            <input
              type="text"
              name="companyRegistration"
              value={editedUserInfo.companyRegistration || ''}
              onChange={handleInputChange}
            />
          </div>
      </div>
    )}
  </div>
)}
</div>
        <div className='Submittedfiles'>

        {showWarning && (
        <div className='warning-container'>
          <p>Please refrain from uploading new files as this may replace your already approved files.</p>
        </div>
      )}
      <div className='Submittedfiles'>
        <h3>Uploaded File Names</h3>
        {prouploadedFiles.length > 0 ? (
          <ul>
            {prouploadedFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
        
        </div>
    
  </div>
  </div>
  </div>
  )}
 
 {activeTab2 === 'orders' && (
  <div className='mainpage'>
    <Dashheader/>
    <div></div>
    <div className='orders_container'>
      <a href="#" onClick={() => handleTabChangeOrders('current')}>Current Orders</a>
      <a href="#" onClick={() => handleTabChangeOrders('pending')}>Pending Orders</a>
      <a href="#" onClick={() => handleTabChangeOrders('total')}>Total Orders</a>

      {activeTabOrders === 'current' && (
        <>
          <div className='countedorders'>
            <div className='ordersummary_title'><h1>Current Orders</h1></div>
            <div className='ordersummary_number'>{numberOfDisplayedcurrentOrders}</div>
          </div>

          <div className='orderslist'>
            <div className="grid-container">
              <div className="item1">Customer Name</div>
              
              <div className="item2">Service Description</div>
              <div className="item3">Service Information</div>
            </div>

            {currentorders.map((order, index) => (
              <div className='orders_container1' key={index}>
                <div className='customerName'>{order.cus_email}</div>
                <div className='serviceDescription'>{order.sevice_description}</div>
                <div className='serviceInfo'>
                  <div>R{order.price}</div>
                  <div>{order.date}</div>
                  <div>
                    <button onClick={() => handleAcceptOrder(order.id)}>Accept Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTabOrders === 'pending' && (
        <>
          <div className='countedorders'>
            <div className='ordersummary_title'><h1>Pending Orders</h1></div>
            <div className='ordersummary_number'>{numberOfDisplayedpendingOrders}</div>
          </div>

          <div className='orderslist'>
            <div className="grid-container">
              <div className="item1">Customer Name</div>
              <div className="item2">Service Description</div>
              <div className="item3">Service Information</div>
            </div>

            {pendingorders.map((order, index) => (
              <div className='orders_container1' key={index}>
                <div className='customerName'>{order.cus_email}</div>
                <div className='serviceDescription'>{order.sevice_description}</div>
                <div className='serviceInfo'>
                  <div>R{order.price}</div>
                  <div>{order.date}</div>
                  <div>
                    <button onClick={() => handleAcceptOrder(order.id)}>Accept Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTabOrders === 'total' && (
        <>
          {/* Your content for the "Total Orders" tab goes here */}
        </>
      )}
    </div>
  </div>
)}
 {activeTab2 === 'Customers' && (
  <div className='mainpage'>
    <Dashheader />
    <a href="#" onClick={() => handleTabChangeCustomers('current1')}>
      Current Customers
    </a>
    <a href="#" onClick={() => handleTabChangeCustomers('pending1')}>
      Pending Customers
    </a>

    {activeTabCustomers === 'current1' && (
      <div className='customers-container current-container'>
        <h2>Customer Name</h2>
        <div className='customers1'>
          {Customers.map((customer, index) => (
            <div className='customer-card' key={index}>
              <div className='customer-column'>
                <div className='customer-name'>{customer.name}</div>
              </div>
              <div className='customer-column'>
                <div className='customer-description'>{customer.description}</div>
              </div>
              <div className='customer-column'>
                <div className='service-information'>
                  <p>Service Name: {customer.serviceName}</p>
                  <p>Availability: {customer.availability}</p>
                  <p>Hourly Rate: {customer.hourlyRate}</p>
                </div>
              </div>
              <div className='customer-columns-container'>
                {/* Six smaller containers inside each customer card */}
                <div className='small-container'>1</div>
                <div className='small-container'>2</div>
                <div className='small-container'>3</div>
                <div className='small-container'>4</div>
                <div className='small-container'>5</div>
                <div className='small-container'>6</div>
              </div>
            </div>
          ))}
        </div>
        {Customers.length > customersPerPage && (
          <div className='pagination'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastCustomer >= Customers.length}>
              Next
            </button>
          </div>
        )}
      </div>
    )}

    {activeTabCustomers === 'pending1' && (
      <div className='customers-container pending-container'>
        <h2>Pending Customers</h2>
        <div className='pending-customers'>
          {/* Your pending customers rendering logic */}
          {/* ... */}
        </div>
        {PendingCustomers.length > customersPerPage && (
          <div className='pagination'>
            <button onClick={() => setPendingCurrentPage(pendingCurrentPage - 1)} disabled={pendingCurrentPage === 1}>
              Previous
            </button>
            <button
              onClick={() => setPendingCurrentPage(pendingCurrentPage + 1)}
              disabled={indexOfLastPendingCustomer >= PendingCustomers.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    )}
  </div>
)}
  {activeTab2 === 'My Services' &&(
  <div className='mainpage'>
    <Dashheader/>
    
    <div className='myserviceheader'><h3>My Services</h3><button onClick={handleAddNewService}>Add New Service</button></div>
    
<div className='AddingConatiner'>
<div className='service1'><div className='imgsev1'>
{newService.servicePhoto && (
      <img src={URL.createObjectURL(newService.servicePhoto)} alt="Service" />
    )}
    <div className='input_servicephoto'>
  <button type="button" id="servicePhotoButton" onClick={() => document.getElementById('servicePhoto').click()}>
  <i className="fas fa-camera"></i> {/* FontAwesome camera icon */}
    Upload Service Photo
  </button>
  <input type="file" id="servicePhoto" name="servicePhoto" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
</div>

</div>
<div className='descrip1'>
<div className='input_servicename'>
  <label htmlFor="serviceName">Service Name:</label>
  <select id="serviceName" name="serviceName">
    <option value="Electrician">Electrician</option>
    <option value="Plumbing">Plumbing</option>
    <option value="Fridge Repairs">Fridge Repairs </option>
    {/* Add more options as needed */}
    
  </select>
  <button onClick={handleSave}>Save</button>
</div>

<div className='input_servicedescrip'> <label htmlFor="description">Description:</label>
  <textarea id="description" name="description"></textarea></div>

  <div className='input_serviceavail'> <label htmlFor="availability">Availability:</label>
  <select id="availability" name="availability">
    <option value="available">Available</option>
    <option value="notAvailable">Not Available</option>
    {/* Add other availability options as needed */}
  </select>
  <label htmlFor="hourlyRate">Hourly Rate:</label>
  <input type="text" id="hourlyRate" name="hourlyRate" />
  </div>
</div></div>
<div className='service2'><div className='imgsev1'>
{newService.servicePhoto && (
      <img src={URL.createObjectURL(newService.servicePhoto)} alt="Service" />
    )}
    <div className='input_servicephoto'>
  <button type="button" id="servicePhotoButton" onClick={() => document.getElementById('servicePhoto').click()}>
    Upload Service Photo
  </button>
  <input type="file" id="servicePhoto" name="servicePhoto" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
</div>
  </div><div className='descrip2'>
<div className='input_servicename'>
  <label htmlFor="serviceName">Service Name:</label>
  <select id="serviceName" name="serviceName">
    <option value="Electicity Installation">Electicity Installation</option>
    <option value="Electrical Repair">Electrical Repair</option>
    <option value="Apliance Services">Apliance Services</option>
    {/* Add more options as needed */}
    
  </select>
  <button onClick={handleSave}>Save</button>
</div>
<div className='input_servicedescrip'> <label htmlFor="description">Description:</label>
  <textarea id="description" name="description"></textarea></div>

  <div className='input_serviceavail'> <label htmlFor="availability">Availability:</label>
  <select id="availability" name="availability">
    <option value="available">Available</option>
    <option value="notAvailable">Not Available</option>
    {/* Add other availability options as needed */}
  </select>
  <label htmlFor="hourlyRate">Hourly Rate:</label>
  <input type="text" id="hourlyRate" name="hourlyRate" />
  </div>
  
 


 
  
  </div>
   </div>

   

</div>


  </div>
  
  
  

 )}
 
 
  
  {activeTab2 === 'Analytics' &&(
  <div className='mainpage'>
    <Dashheader/>

  </div>
 )}
      </div>
  
    
      <style jsx>{`


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
.UserDashboard{
  margin: 0;
  padding: 0;
}
.dashcontent{
        
  width: 150px;
  padding: 0px;
  margin-left: 0px;
 


}


.profile_information{
  overflow: auto;
 
}
  .date-picker-container input{
    visibility: hidden;
    display: none;
  }
.info-item select{
width: 173px;
padding: 5px;

}
.info-item{
margin-bottom: 5px;
}
 
  .AddingConatiner{
    width: 940px;
  }
  .service1{
    display: flex;
    width: 100%
    padding: 10px;
    justify-content: space-between;
margin-bottom: 30px;
  }
  .imgsev1{
padding: 5px;
border: 2px solid #ff0068;
width: 200px;
height: 200px;
border-radius: 5px;

  }
  .descrip1{
    border-radius: 5px;

    width: 650px;
    height: 200px;
    padding: 5p;
    border: 2px solid #ff0068;

  }
  .service2{
    display: flex;
    width: 100%
    padding: 10px;
    justify-content: space-between;

  }
  .imgsev2{
padding: 5px;
border: 2px solid #ff0068;
width: 200px;
height: 110px;
border-radius: 5px;

  }
  .descrip2{
    border-radius: 5px;
    width: 650px;
    height: 200px;
    padding: 5p;
    border: 2px solid #ff0068;
   
    
  }
  .myserviceheader{
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
width: 940px;
  }
  .myserviceheader button{
    color: #fff;
    font-weight: bold;

    
    background:  #21B6A8;
  }
  .profileimage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .profileimagename{
    width: 100%;
    padding: 3px;
    
  }
  .cusnameheading{
    width: 100%;
    justify-content: center;
    display: flex;
    margin: 0 auto;


  }
  .contactcubutton button{
    margin: 0;
    padding: 10px;
    background:  #21B6A8;
    color: #fff;
    font-weight: bold;
    border-style: none;


  }
  .contactcubutton{
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
  
  }
  .firstsection{
    border: 2px solid #ff0068;
    border-radius: 10px;
    margin-bottom: 10px;
    width: 250px;
    height: 350px;
    padding: 5px;
    padding-top: 0;
    box-shadow: 0 1px 4px #ff0068;
    transition: box-shadow 0.3s ease;


  }
  .firstsection:hover{
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  }
  .customers1 {
    display: grid;
    grid-template-columns: repeat(3, 0fr);
    gap: 10px;

    margin-top: 20px;
  }
  
  /* Style for each customer card */
  .customer_card {
  

    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  

  
  /* Style for profile images */
  .profileimage {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 10px;

    
  }
  
  .profileimage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Style for the customer email */
  .cus_email {
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  
  /* Style for the invoice section */
  .invoice_container {
    border: 2px solid #ff0068;
    width: 100%;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 1px 4px #ff0068;
    transition: box-shadow 0.3s ease;

  }
  .invoice_container:hover{
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  }
  
  .invoice {
    height: 115px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  


  .custotalinvoices{
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0;
    margin-bottom: 5px;
    margin-top: 8px;
    font-weight: bold;
    border-bottom: 1px solid #ff0068;
    padding-bottom: 8px;


  }
  .cuservices{
display: flex;
width: 100%;
justify-content: space-between
margin: 0;
font-size: 14px;
margin-bottom: 5px;
font-weight: bold;
border-bottom: 1px solid #ff0068;
padding-bottom: 8px;
padding-top: 8px;


  }
  .cuservices p{
    margin: 0;
    padding: 0;
  }
  .cusallinvoices{
    display: flex;
    width: 100%;
    margin: 0;
    margin-bottom: 5px;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    padding-bottom: 8px;

  }
  .custotalinvoices p{
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  .custotalinvoices h4{
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  .cusallinvoices p{
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  .cusallinvoices button{
    font-size: 14px;
    padding: 10px;
    margin: 0;
    background:  #21B6A8;
    color: #fff;
    font-weight: bold;
    border-style: none;

  }

  /* Style for pagination buttons */
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination button {
    padding: 8px 16px;
    margin: 0 5px;
    border: none;
    background-color: #007bff;
    color:  #ff0068;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .orders_container2{
    border: 2px solid #ff0068;
    display: block;
    

  }


  .cus_email{
  }

.grid-container {
padding: 10px;
display: grid;
grid-template-columns: repeat(3, 1fr); /* Three columns */
grid-gap: 80px;
overflow: hidden;
font-weight: bold;

}
.item1 {
padding: 5px;
width: 250px;
overflow: hidden;
border-bottom: 2px solid #ff0068;
font-weight: bold;
    font-size: 18px;


}
.item2 {
padding: 5px;
width: 280px;
overflow: hidden;
border-bottom: 2px solid #ff0068;
font-weight: bold;
font-size: 18px;


}
.item3 {
padding: 5px;
width: 200px;
overflow: hidden;
border-bottom: 2px solid #ff0068;
font-size: 18px;


}
  .orders_container1 {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Three columns */
    grid-gap: 80px;
    overflow: hidden;

  }

  .customerName {
    padding: 5px;
    width: 250px;
    display:flex;
    overflow: hidden;
    border-bottom: 2px solid #ff0068;

  }

  .serviceDescription {
    padding: 5px;

    width: 280px;
    display:flex;
    overflow: hidden;
    border-bottom: 2px solid #ff0068;


  }
  .input_servicephoto {
    display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 110px;
  color: #fff;
  
 
}
.input_servicephoto img {
  max-width: 100%; /* Ensure the image does not exceed its container's width */
  max-height: 200px; /* Set the maximum height as needed */
  margin-top: 10px; /* Add margin for spacing */
}
    
    
  }
  .input_servicephoto button {
    
    width: 50px;
    height: 50px; 
    padding: 10px;
    background-color: #008080;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 150px;
    display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50%; /* Set border-radius to 50% for a circular shape */
 
 
  }
  
  .input_servicephoto input[type="PNG"] {
    /* Your styles for the file input */
    display: none; /* Hide the file input */
  }
  
  .input_servicephoto .uploaded-photo {
    margin-top: 10px;
  }
  
  .input_servicephoto .uploaded-image {
    width: 2px; /* Set your desired width */
    height: 1px; /* Set your desired height */
   
  }
  .customers-container {
    width: 900px; /* Set the desired width */
    height: 450px; /* Set the desired height */
    background-color: #fff; /* Set the background color to white */
    border: 2px solid  #ff0068; /* Set the border color to pink */
    margin: 10px; /* Add margin for spacing */
    padding: 10px; /* Add padding for content spacing */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .current-container,
  .pending-container {
    /* Add specific styles for the current and pending containers if needed */
  }
  .customers1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .customer-card {
    width: 30%;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  
  
  

 .orderDate {
  border-bottom: 2px solid #ff0068;
  padding: 5px;

    width: 200px;
    justify-content: center;
    overflow: hidden;

  }
  .orderdate_price{
    width: 100%;
    font-size: 16px;
    color: #ff0068;
    font-family: poppins;
    font-size: 18px;
    font-weight: bold;
    margin: 0 auto;
    padding-bottom: 3px;
  }
  .orderdate_date{
    font-size: 13px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 3px;
  }
  .orderdate_button{
    width: 100%;
    margin: 0 auto;
    padding: 2px;
  }

  .orderdate_button button {
    margin: 0;
    padding: 5px 10px;
    background-color: #21B6A8;
    font-size: 15px;
    color: white;
    border: none;
    cursor: pointer;
  }
  .orders_container{
    display: block;
    padding: 5px;
    width: 950px;
    position: relative;
    overflow: hidden;
  }
  .orderslist{
 height: 350px;
  border: 1.5px solid #ff0068;
  box-shadow: 0 0 3px #ff0068;
  padding: 5px;
  margin: 0 auto;
  border-radius: 5px;

a
  }
   .ordersummary_number{
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    font-size: 35px;
    color: #ff0068;
    font-weight: bold;
    font-family: poppins;
   }
    .ordersummary_title h1{ 
padding: 0;
margin: 0;
    }
  .ordersummary_title{
    width: 30%;
    text-align: center;
    padding-right: 8px;
    border-right: 2px solid #333;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    margin-right: 0;

  }
  .maindash{

    margin: 0;
    margin-top: -120px;
    margin-bottom: 10px;
    width: 280px;
    justify-content: space-between;
    margin-right: 0;
    padding: 6;
    top :10px
    
  }
  .search-container {
    display: flex;
    align-items: center;
  }
  .search-link {
    margin-left: 10px; /* Adjust spacing between "Account" and the search symbol */
  }
  .account-link a {
    text-decoration: none;
    color: #333; /* Set the color to your desired text color */
  }
  
  .search-symbol {
    margin-left: 55px; /* Adjust spacing between "Account" and the search symbol */
    width: 50px; /* Set the width of the image */
    height: 20px; /* Set the height of the image */
    cursor: pointer;
    padding: 545px;
  }
  .search-symbol[contentEditable="true"] {
    border: 1px solid #ccc; /* Add a border to indicate the active state */
    padding: 5px; /* Adjust padding for better visual appearance */
  }
  .countedorders{
    display: flex;
    margin-top: 2%;
    margin-bottom: 50px;
    border-radius: 5px;
    width: 250px;
    box-shadow: 0 0 2px #ff0068;
    height: 100px;
    border: 1.5px solid #ff0068;

  }
  .back_arrow {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
    padding: 8px 16px;
    border-radius: 4px;
    margin: 0;
    margin-right: 10px; /* Adjust margin as needed */
  }
  
  .back_arrow:hover {
    background-color: #ddd;
    cursor: pointer;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
  }
  
  .label {
    color: grey; /* Styling for label */
  }
  
  .data {
    color: #21B6A8; /* Styling for fetched data */
    font-weight: bold;
  }
/* Style for custom file input */
.custom-file-upload {
  display: inline-block;
  border-bottom: 1px solid #ff0068;
  border-radius: 0px;
  padding: 10px;
  width: 330px;

  cursor: pointer;
  color: #ff0068;
  font-weight: bold;
  font-size: 16px;
}

.custom-file-upload:hover {
  background-color: #fffd;
}

/* Hide the original file input */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.popularservice_heading {
  position: relative;
  color: #ff0068;
  font-size: 17px;
  font-weight: bold;
  font-family: poppins;
  margin: 0;
  padding: -25px;
  text-align: 50px;

}
.popularservice_heading:after {
  content: '';
  border-top: 2px solid #ff0068; /* Adjust the style and color as needed */
  display: block;
  width: 470%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
  text-align: 50px;
}


.popularservice_heading:before {
  
  width: 100%; /* Adjust the line width as needed */
  
  
  
}
.popularservice_heading:after {
  content: '';
  border-top: 2px solid #ff0068; /* Adjust the style and color as needed */
  display: block;
  width: 470%; /* Adjust the line width as needed */
  position: absolute;
  top: 50%;
  padding: 0px;
}



.popularservice_heading:after {
  right: 0%;
  margin-right: 0%;
  top: 100%;
  padding-top: 20px;
  
  
  
}

  
   

  .fileheading{
    font-family: poppins;
    font-weight: bold;
    font-size: 18px;
  }
  .uploadfiles{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
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
        .pfp{
          border-radius: 75px;
          background: rgba(0, 0, 0, 0.3);
        margin: 0 auto;
        width: 150px;
        height: 150px;
        margin-bottom: 0px;
        
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
          margin-bottom: 25px;
  
  
        }
        .profile_information{
          border: 2px solid #ff0068;
          height: 500px;
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
          height: 300px;
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
  margin-bottom: 0px;
  
  }
  .pfp_and_files{
   
  }
  .info_container{
    padding: 10px;
    display: flex;
    max-width: 980px;
  }

.upload-form {
display: flex;
flex-direction: column;
align-items: center;
border: 2px solid #ff0068;
border-radius: 5px;
width: 350px;
padding: 10px;
align-items:center;
}

.file-name {

}

.upload-button {
background-color: #007BFF;
color: #fff;
padding: 10px 20px;
margin: 0;
border: none;
border-radius: 5px;
cursor: pointer;
font-weight: bold;
transition: background-color 0.2s;
}

.upload-button:disabled {
background-color: #ccc;
cursor: not-allowed;
}

.upload-button:hover {
background-color: #0056b3;
}

   .file-label {
    display: inline-block;
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

  #selectedFileName {
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
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
  .username{

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
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
    text-overflow: ellipsis;
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
    white-space: nowrap;

   
  }
  .profile-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Adjust the object-fit property to control how the image fits within the container */
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
          background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent background */
         display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999; /* Ensure it's on top of other elements */
        }
        
        .alert-box {
          background-color: orange;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
         
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
        .myserviceheader button {
          font-size: 18px;
          padding: 10px 20px;
        }
        .save-button {
          /* Add any specific styles for the Save button */
          font-size: 20px; /* You can adjust the font size as needed */
          padding: 12px 24px; /* You can adjust the padding as needed */
          width: 20px;
          margin-top: 1000 px; /* Adjust the margin-top value to create space below the border */
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
  
  
    width: 1100px;
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
  
  /* CSS styles for the "No " message */
  .no-pending-requests {
    text-align: center;
    font-size: 18px;
    color: #555;
    /* Add other styling as needed */
  }
  

.provider-email {
color: black;
}






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

  h2{
    font-family: sans-serif;
margin: 30px auto;
text-align: center;
font-size: 20px;
max-width: 600px;
color: #fffdd0;
position:relative;
  }

  h2:before{
    content: "";
display:block;
width: 140px;
height:2px;
background: #fffdd0;
position: absolute;
left: 0;
top: 50%;
z-index: 1111;
  }

  h2:after{
    content: "";
display:block;
width: 140px;
height:2px;
background: #fffdd0;
position: absolute;
right: 0;
top: 50%;
z-index: 1111;
  }

  

  .contact_details{
    background-color: #ff0066;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
    width: 830px;
    color: #fffdd0;
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
  select{
    width:250px;
    padding: 10px;
    font-weight: bold;
  }

  textarea{
width: 400px;
padding: 10px;
border-radius: 10px;
  }
 .registration-form {
  
  display: flex;
  flex-direction: row;
  
  max-width: 850px;
  height: 460px;
  margin: 10px;
  margin-left: 80px;
  padding: 20px;
  color: #fffdd0;
  font-weight: bold;
  background-color: #fffdd0;
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

.dashboard-container {
  padding: 15px;
  background-color: #ff0068;
  border: solid light-red 5px;
  width: 180px;
  height: 100%;
  left: 0;

 
  
}

@media (max-width: 768px){
  .dashboard-container{
    width: 80px;
height: 100vh;
  }
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
     
      background-color: #fff;
      align-items: center;
      width: 80px; 
      height: 80px; /* Adjust the size as needed */
      border-radius: 50%; /* Makes it a circle */
      overflow: hidden; /* Clip the image to the circular boundary */
      margin: 0 auto; /* Center horizontally */
      margin-bottom: -10px;
      margin-top: 15px;
      margin-left: 25px;
      border: 2px solid #fff; /* Add a border for styling */
      box-shadow: 0 0 5px #fff;
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
      width: 100%;
      display: flex;
      align-items: center;
      margin: auto;
      margin-top: 10px;
      margin-left: 50px;
  }
  a{
      position: relative;
      text-decoration: none;
      font-family: 'Poppins',sans-serif;
      color: #ff0068;
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 0.5px;
      padding: 0 10px;
      margin-right: 20px;

  }
  a:after{
      content: "";
      position: absolute;
      background-color: #ff3c78;
      height: 3px;
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
      border-top: 2px solid #ff0068;
      border-bottom: 2px solid #ff0068;
      margin-bottom: 20px;
      position: fixed;
      top: 21%;
      left: 0;
      width: 100%;
    }




    .dashboard-header {
      text-align: center;
      position: inherit;
      width: 250x;
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
      border-top: 2px solid #ff0068;
      border-bottom: 2px solid #ff0068;
      margin-bottom: 0px;
      margin-top: 120px;
      margin-left: 50px;
      width: 0px;
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
  
 
      border-radius: 10px;
      display: flex;
     justify-content: space-between;
      width: 850px;
      margin-bottom: 0px;
      margin-left: 90px;
      padding: 0;
    border: none;
  
  
 }
 .metrics hr{
  display: none;
 }

 

 .progress-circle {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.circle-progress {
  width: 5%; /* Adjust the width to make the circle smaller */
  height: 50%; /* Adjust the height accordingly */
  border: 6px solid #fff; /* Adjust the border width and color */
  border-top-color: ; /* Set the color for the progress */
  border-radius: 50%;
  background: transparent;
  position: absolute;
  top: -50px; /* Adjust the top position */
  left: 50px; /* Adjust the left position */
  padding: 30px; /* Adjust padding accordingly */
  transform: rotate(0deg);
  transform-origin: center;
}

.circle-progress::-webkit-progress-value {
  border-radius: 50%;
  background-color: transparent;
}

.circle-progress::-moz-progress-bar {
  border-radius: 50%;
  background-color: transparent; 
}
.progress-circle span {
  position: absolute;
  top: -20%;
  left: 90px;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: #fff;
  
}.servicesdone{
    
  padding-left: 8px;
height: 100px;
width: 200px;
font-size: 12px;
color: azure;
border-radius: 10px;
background-color:#ff0068;
cursor: pointer;
margin-left: -90px




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
  margin-left: -740px;
  padding-top: -50px;
  margin-top: -20px;
  clear: both;
  
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
right: 3px;

 


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

.btn_logout{
  width: auto;
  align-items: center;
  display: flex;
  width: 160px;
  padding: 0;
  position: absolute;
  bottom: 20px;
 
  
}

.active_Tab{
  font-size: 22px;
  color: #fff;
  font-family: poppins;
position: absolute;
right: -30px;      
  display: none;
}



  `}</style>
</div>
);
};

export default UserDashboard;


//pink colours: #FF0040,#FF0066, #FF0078, #FA3980, #ffeba7, #ff3c78, #21B6A8,#007bff, #0056b3
/* <form onSubmit={handleSubmit} >

        <div className='contact_details'>
            <h2>Contact Details</h2>
  <label>
   Business or Freelancer?*<br /><br />
    <select
      name="businesstype"
      onChange={handleChange}
      value={formData.businesstype}
      required
    >
      <option value="">None</option>
      <option value="BUSINESS">BUSINESS</option>
      <option value="FREELANCER">FREELANCER</option>
    </select>
  </label>
  <br />
  <br />

  <label>
  Provider Type*<br /><br />
  <select
    name="providertype"
    onChange={handleChange}
    value={formData.providertype}
    required
  >
    <option value="">Provider Type</option>
    <option value="APPLIANCE_REPAIR">APPLIANCE_REPAIR</option>
    <option value="PLUMBER">PLUMBER</option>
    <option value="ELECTRICIAN">ELECTRICIAN</option>
    <option value="HVAC_TECHNICIAN">HVAC_TECHNICIAN</option>
    <option value="CARPENTER">CARPENTER</option>
    <option value="PAINTER">PAINTER</option>
    <option value="ROOFER">ROOFER</option>
    <option value="FLOORING_SPECIALIST">FLOORING_SPECIALIST</option>
    <option value="LOCKSMITH">LOCKSMITH</option>
    <option value="PEST_CONTROL_EXPERT">PEST_CONTROL_EXPERT</option>
    <option value="GARDENING_LANDSCAPING_PROFESSIONAL">GARDENING_LANDSCAPING_PROFESSIONAL</option>
    <option value="HOME_SECURITY_INSTALLER">HOME_SECURITY_INSTALLER</option>
    <option value="WINDOW_DOOR_INSTALLER">WINDOW_DOOR_INSTALLER</option>
    <option value="HANDYMAN">HANDYMAN</option>
    <option value="CLEANING_JANITORIAL">CLEANING_JANITORIAL</option>
  </select>
</label>
<br /><br />


  <label>
  Name*<br /><br />
  <input
      type='text'
      name="name"
      onChange={handleChange}
      value={formData.name}
      required
   />
  </label>
  <br />
  <br />
  
  <label>
   Surname*<br /><br />
  <input
      type='text'
      name="surname"
      onChange={handleChange}
      value={formData.surname}
      required
   />
  </label>
  <br />
  <br />

  <label>
   Contact Number*<br /><br />
  <input
      type='text'
      name="contactnumber"
      onChange={handleChange}
      value={formData.contactnumber}
      required
   />
  </label>
  <br />
  <br />

  <label>
   Address?*<br /><br />
  <input

      type='text'
      name="address"
      onChange={handleChange}
      value={formData.address}
      required
   />
  </label>
  <br />
  <br />
  </div>

  <div className='screening_questions'>

    <h2>Screening Questions</h2>
  <label>
  Do you possess the necessary licenses and registrations required to provide repair services in your respective field?*<br /> <br />
  <textarea id="licenses"
    name="licenses"
    onChange={handleChange}
    value={formData.licenses}
    required></textarea>

  </label>
  <br />
  <br />
  <br />
  <label>
  What is your level of experience and expertise in performing repairs? Can you provide examples of similar repair projects you have successfully completed?<br/><br/>
  <textarea id="experience" name="experience"  onChange={handleChange}
    value={formData.experience} required></textarea>

  </label>
  <br />
  <br />
  <br />
  <label>
  Do you have insurance coverage, including liability insurance, to protect against potential damages or liabilities arising from your repair services (IF APPLICABLE)? <br/><br/>
      <textarea id="insurance" name="insurance"  onChange={handleChange}
    value={formData.insurance} required></textarea>

   
  </label>
  <br />
  <br />
  <br />

  
  <label>
  How do you ensure the quality of your repair work? Do you use genuine parts and materials?   <br/><br/>
  <textarea id="quality" name="workquality"  onChange={handleChange}
    value={formData.workquality} required></textarea>

  </label>
  <br />
  <br />
  <br />

  
  <label>
  How do you handle customer communication and address any post-repair issues or complaints? Can you provide examples of how you have resolved customer concerns in the past? <br/><br/>  
  <textarea id="customer_exp" name="communication"  onChange={handleChange}
    value={formData.communication} required></textarea>

  </label>
  <br />



  </div>

  <div className="uploads">
    <label>
      <h2>Important Files</h2>

      <p>ID/Driver_Licence Passport/</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <p>Trading License/Registration</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <p>Certifications/Qualifications</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <p>Insurance</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <p>Work History</p>
      <input type="file" onChange={handleFileInputChange} />
      

      <p>background Checks</p>
      <input type="file" onChange={handleFileInputChange} />
      
      <button onClick={handleFileUpload}>Upload File</button>
      
      </label>
    </div>

  
  <button type="submit" >Submit</button>
</form>*/