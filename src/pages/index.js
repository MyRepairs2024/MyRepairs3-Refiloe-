import React, { useState, useEffect } from 'react';
import Header from './components/Header1';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';






const cardData = [
  {
    icon: '/Icon1.1.png',
    title: 'Appliance Repairs',
    hoverIcon: '/Icon1.png',
   
  },

  {
    icon: '/Icon2.1.png',
    title: 'Plumber',
    hoverIcon: '/Icon2.png',
   
  },
  
  {
    icon: '/Icon3.1.png',
    title: 'Electrician Services',
    hoverIcon: '/Icon3.png',
  
  },
  
  {
    icon: '/Icon4.1.png', 
    title: 'Painting and Decoration',
    hoverIcon: '/Icon4.png',
   
  },
  {
    icon: '/Icon5.1.png',
    title: 'Capentry',
    hoverIcon: '/Icon5.png',
   
  },
  {
    icon: '/Icon6.1.png',
    title: 'HAVC',
    hoverIcon: '/Icon6.png',
  
  },

  {
    icon: '/Icon7.1.png', 
    title: 'Gardening and Landscaping',
    hoverIcon: '/Icon7.png',
    
  },
  {
    icon: '/Icon8.1.png',
    title: 'Home Security Services',
    hoverIcon: '/Icon8.png',
   
  },
  {
    icon: '/Icon9.1.png',
    title: 'Handyman Services',
    hoverIcon: '/Icon9.png',
  
  },

  {
    icon: '/Icon10.1.png', 
    title: 'Roofing Services',
    hoverIcon: '/Icon10.png',
   
  },
  {
    icon: '/Icon11.1.png',
    title: 'Cleaning Services',
    hoverIcon: '/Icon11.png',
    
  },
  {
    icon: '/Icon12.1.png',
    title: 'Locksmith Services',
    hoverIcon: '/Icon12.png',
   
  },
  
];

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showNextContainer, setShowNextContainer] = useState(false);
  const [selectedService, setSelectedService] = useState("");
const [location, setLocation] = useState("");
const [selectedTime, setSelectedTime] = useState("");
const [selectedDate, setSelectedDate] = useState(null);
const [description, setDescription] = useState('');

const [hasSubFaults, setHasSubFaults] = useState('no');
const [selectedMainFault, setSelectedMainFault] = useState('');
const [selectedSubFault, setSelectedSubFault] = useState('');
const [applianceRepairsClicked, setApplianceRepairsClicked] = useState(false);
const [showPopupOtherServices, setShowPopupOtherServices] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [showProfilePopup, setShowProfilePopup] = useState(false);
const [showPlumberPopup, setShowPlumberPopup] = useState(false);
const [showElectricianPopup, setShowElectricianPopup] = useState(false);
const [showPaintingPopup, setShowPaintingPopup] = useState(false);

const profileInfo = {
  name: 'John Doe',
  description: "I'm a friendly and experienced refrigerator repairer with a passion for providing safe and comfortable services to my clients. With 10 years of repairing  experience and a clean  record, I prioritize customer satisfaction and timely service.",

};


const subFaults = {
  '1.1': [
    { id: 1, name: 'Compressor Not Running', description: 'The compressor fails to start, resulting in no cooling.' },
    { id: 2, name: 'Compressor Noisy', description: 'Unusual or excessively loud noises coming from the compressor.' },
    { id: 3, name: 'Compressor Overheating', description: 'The compressor becomes too hot, affecting cooling efficiency.' }
  ],
  '1.2': [
    { id: 1, name: 'Inaccurate temperature reading', description: 'The thermostat provides incorrect temperature information' },
    { id: 2, name: 'Thermostat Unresponsive', description: 'The thermostat doesnt adjust or regulate the temperature as intended.' },
    { id: 3, name: 'Thermostat Sensor Malfuction', description: 'The sensor resposible for temperature measurement is faulty .' }
  ],
  '1.3': [
    { id: 1, name: 'Low Refrigerant Levels: ', description: 'Reduced cooling due to insufficient refrigerant levels..' },
    { id: 2, name: 'Leaking Refrigerant: ', description: 'Refrigerant leaks lead to a decline in cooling performance.' },
    { id: 3, name: 'Inadequate Cooling: ', description: 'Inadequate cooling even after cleaning coils and components.' }
  ],
  '1.4': [
    { id: 1, name: 'Torn or Worn Seals: ', description: 'Seals are torn, cracked, or damaged, leading to air leaks.' },
    { id: 2, name: 'Lose Seals', description: 'Seals that doent seal properly due to poor alignment or wear' },
    { id: 3, name: 'Moldy Seals: ', description: 'Seals that have mold growth due to moisture accumulation.' }
  ],
  '1.5': [
    { id: 1, name: 'Excessive Frost Buildup:', description: ' Frost accumulates more than usual, hindering proper cooling.' },
    { id: 2, name: 'Defrost Heater Failure', description: 'The defrost heater that doesnt work,leading to frost build up' },
    { id: 3, name: 'Defrost Timer Malfunction:', description: ' The timer doesnt initiate defrost cyclesas intended' }
  ]
};



;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleCardClick = (index) => {
    if (cardData[index].title === 'Appliance Repairs') {
      setShowPopup(true); // Show 'Appliance Repairs' pop-up
      setExpandedCard((prevExpandedCard) => (prevExpandedCard === index ? null : index));
      setShowPopupOtherServices(false); // Hide pop-ups for other services
      document.body.style.overflow = 'hidden'; // Disable scrolling when pop-up is open
    } else {
      setShowPopupOtherServices(false); // Hide pop-ups for other services
      setShowPopup(false); // Hide 'Appliance Repairs' pop-up
      setExpandedCard((prevExpandedCard) => (prevExpandedCard === index ? null : index));
      document.body.style.overflow = ''; // Enable scrolling when pop-up is closed
    }
  
    // Check the title directly for 'plumber' and 'electrician' services
    console.log('Checking pop-up for other services');

  // Check the title directly for other services and show respective pop-ups
  if (cardData[index].title === 'Plumber') {
    setShowPlumberPopup(true);
  } else if (cardData[index].title === 'Electrician') {
    setShowElectricianPopup(true);
  } else if (cardData[index].title === 'Painting and Decorating') {
    setShowPaintingPopup(true);
  }
  };
  const handleDescriptionItemClick = (line) => {
    // Handle click on individual lines within long description
    console.log('Clicked line:', line);
    
  };
  const handleCloseButtonClick = () => {
    setShowPopup(false);
    setShowNextContainer(false); // Reset the state when closing the popup
  };
  const handleContactCustomer = () => {
    // Add your logic for handling the contact customer action
    window.location.href = '/customer-login'; // Replace '/login' with the actual URL of your login page
  };

  const handleNextButtonClick = () => {
    setShowNextContainer(true);
  };
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation(`${latitude}, ${longitude}`);
  }

  const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  const handleViewProfile = () => {
    setShowProfilePopup(true);       
  };

  const handleCloseProfilePopup = () => {
    setShowProfilePopup(false);
  };
  

 
  return (
    <div className="home-page">
   <a id="top"></a>

      <header className='header1'>
        <div className='firstheader'>

       <h6 className='topheader'>+27 064 897 3566 | info@myrepairs.com</h6>
  </div>
      </header>
    
      <Header />
      <main>
        <section className="banner">
          {
<div className='slider'><div className='intro'><h1>Hello!</h1><br/> <h4>Welcome To<br/> My Repairs.</h4> </div>
              <div className='images'>        
              <img src="/machines.png" className='image1' alt="Repairman" style={{ width: '600px', objectFit: 'cover',  borderRadius: "10px"}}/>
             <img src="/guy4.png" className='image2' alt="Repairman" style={{ width: '250px', objectFit: 'cover',  borderRadius: "10px" }}/>
              <img src="/guy2.png" className='image3' alt="Repairman" style={{ width: '550px', objectFit: 'cover',  borderRadius: "10px"}}/>
              <img src="/tools.png" className= 'image4' alt="Repairman" style={{ width: '350px', objectFit: 'cover',  borderRadius: "10px"}}/>

</div>

</div>



          }
        </section>
        
        <section className="services">
          {
            <div>
            <div className='service-heading'> 
            
            <h2 className="heading-with-lines">  OUR SERVICES  </h2>

           
            
            </div>
 <div className="card-container">
 {cardData.map((card, index) => (
                <div
                  className={`card ${index === expandedCard ? 'expanded' : ''}`}
                  key={index}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="icon-container">
                    <img
                      src={index === hoveredCard ? card.hoverIcon : card.icon}
                      alt={card.title}
                      className="card-icon"
                      style={{ width: '200px', height: '180px' }}
                    />
                  </div>
                  <div className="card-title">{card.title}</div>
                  {index === expandedCard && (
  <div className="expanded-content-container">
    <div className="expanded-content">
    <div className="long-description-container">
            {card.longDescription && typeof card.longDescription === 'string' ? (
              card.longDescription.split('\n').map((line, index) => (
                <a key={index} onClick={() => handleDescriptionItemClick(line)} style={{ color: '', cursor: 'pointer' }}>
                  {line}
                </a>
              ))
            ) : (
              "No description available"
            )}
          </div>
    </div>
    {applianceRepairsClicked && (
  <div className="popup-container">
  <div className="popup-content">
    {/* Close button */}
    <button className="close-button" onClick={handleCloseButtonClick} style={{fontWeight: 'bold',color: 'black' }}>X</button>
    {/* Three containers */}
    <div className="infoContainer">
      <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
<select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
  <option value="">Select Service</option>
  <option value="electrician">Refrigerator Repair</option>
  <option value="appliance">Oven and Stove Repair</option>
  <option value="electrician">Washing Machine Repair</option>
  <option value="appliance">Fridge Repair</option>
  <option value="electrician">DishWasher Repair</option>
  <option value="appliance"> Dryer Repair</option>
  <option value="electrician">Dishwasher Repair</option>
  <option value="appliance">Microwave Repair</option>
  <option value="electrician">Freeze Repair</option>
  <option value="appliance">Garage Disposal Repair</option>
  <option value="electrician">Air Conditioner Repair</option>
  <option value="appliance">Water Heater Repair</option>
  <option value="appliance">Range Hood Repair</option>
  <option value="appliance">Ice Maker Repair</option>
  <option value="appliance">Small Appliance Repair</option>
  <option value="appliance">General Maintenance and Tune-ups</option>
</select>

<p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>Select your brand?</p>
<select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
  <option value="">Select Brand</option>
  <option value="electrician">Whirlpool Corporation</option>
  <option value="appliance">LG Electronics</option>
  <option value="electrician">Samsung Electronics</option>
  <option value="appliance">Electrolux</option>
  <option value="electrician">Bosch: </option>
  <option value="appliance">General Electic</option>
  <option value="electrician">Sofa Repair</option>
  <option value="appliance">Haier Group </option>
  <option value="electrician">Miele</option>
  <option value="appliance">Panasonic Corporation</option>
  <option value="electrician">Siemens</option>
  <option value="appliance">Maytag</option>
  <option value="appliance">AEG</option>
  <option value="appliance">KitchenAid</option>
  <option value="appliance">Sharp Corporation</option>
  <option value="appliance">Indesit Company</option>
  

 
</select>
{/* Yes or No question */}
<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any sub faults?</p>
          <select
            value={hasSubFaults}
            onChange={(e) => setHasSubFaults(e.target.value)}
            style={{ borderRadius: '5px', width: '250px', height: '40px' }}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
          {/* Input for sub faults if "Yes" */}
          {hasSubFaults === 'yes' && (
            <div>
              <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select Sub Fault:</p>
              <select
                value={selectedMainFault}
                onChange={(e) => setSelectedMainFault(e.target.value)}
                style={{ borderRadius: '5px', width: '250px', height: '40px' }}
              >
                <option value="">Select Main Fault</option>
                <option value="1.1">Compressor Replacement</option>
                <option value="1.2">Thermostat Repair</option>
                <option value="1.3">Refrigerant Recharge</option>
                <option value="1.4">Door Seal Replacement</option>
                <option value="1.5">Defrost System Repair</option>
              </select>
              {/* Render subfaults dropdown based on selected main fault */}
              {selectedMainFault && (
                <div>
                  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                  <select
                    value={selectedSubFault}
                    onChange={(e) => setSelectedSubFault(e.target.value)}
                    style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                  >
                    <option value="">Select Sub Fault</option>
                    {subFaults[selectedMainFault].map(subFault => (
                      <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                    ))}
                  </select>
                </div>
              )}
                </div>
          )}
<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Describe the issue or any additional details"
style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>

<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
    <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
      Get My Location
    </button>
<p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>

<DatePicker 
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select Date and Time" 
      className="custom-datepicker"
    />
        <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
              Next
            </button>
</div>  
  </div>
</div>
)}
    
  </div>
)}

</div>
 ))}
 

</div>
  
</div>



          }
{showPopup && (
  
  <div className="popup-container">
    <div className="popup-content">
      {/* Close button */}
      <button className="close-button" onClick={handleCloseButtonClick} style={{fontWeight: 'bold',color: 'black' }}>X</button>
      {/* Three containers */}
      <div className="infoContainer">
        <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
  <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
    <option value="">Select Service</option>
    <option value="electrician">Refrigerator Repair</option>
    <option value="appliance">Oven and Stove Repair</option>
    <option value="electrician">Washing Machine Repair</option>
    <option value="appliance">Fridge Repair</option>
    <option value="electrician">DishWasher Repair</option>
    <option value="appliance"> Dryer Repair</option>
    <option value="electrician">Dishwasher Repair</option>
    <option value="appliance">Microwave Repair</option>
    <option value="electrician">Freeze Repair</option>
    <option value="appliance">Garage Disposal Repair</option>
    <option value="electrician">Air Conditioner Repair</option>
    <option value="appliance">Water Heater Repair</option>
    <option value="appliance">Range Hood Repair</option>
    <option value="appliance">Ice Maker Repair</option>
    <option value="appliance">Small Appliance Repair</option>
    <option value="appliance">General Maintenance and Tune-ups</option>
  </select>

  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>Select your brand?</p>
  <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
    <option value="">Select Brand</option>
    <option value="electrician">Whirlpool Corporation</option>
    <option value="appliance">LG Electronics</option>
    <option value="electrician">Samsung Electronics</option>
    <option value="appliance">Electrolux</option>
    <option value="electrician">Bosch: </option>
    <option value="appliance">General Electic</option>
    <option value="electrician">Sofa Repair</option>
    <option value="appliance">Haier Group </option>
    <option value="electrician">Miele</option>
    <option value="appliance">Panasonic Corporation</option>
    <option value="electrician">Siemens</option>
    <option value="appliance">Maytag</option>
    <option value="appliance">AEG</option>
    <option value="appliance">KitchenAid</option>
    <option value="appliance">Sharp Corporation</option>
    <option value="appliance">Indesit Company</option>
    

   
  </select>
 {/* Yes or No question */}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
            <select
              value={hasSubFaults}
              onChange={(e) => setHasSubFaults(e.target.value)}
              style={{ borderRadius: '5px', width: '250px', height: '40px' }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {/* Input for sub faults if "Yes" */}
            {hasSubFaults === 'yes' && (
              <div>
                <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
                <select
                  value={selectedMainFault}
                  onChange={(e) => setSelectedMainFault(e.target.value)}
                  style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                >
                  <option value="">Select Main Fault</option>
                  <option value="1.1">Compressor Replacement</option>
                  <option value="1.2">Thermostat Repair</option>
                  <option value="1.3">Refrigerant Recharge</option>
                  <option value="1.4">Door Seal Replacement</option>
                  <option value="1.5">Defrost System Repair</option>
                </select>
                {/* Render subfaults dropdown based on selected main fault */}
                {selectedMainFault && (
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                    <select
                      value={selectedSubFault}
                      onChange={(e) => setSelectedSubFault(e.target.value)}
                      style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                    >
                      <option value="">Select Sub Fault</option>
                      {subFaults[selectedMainFault].map(subFault => (
                        <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                  </div>
            )}
  <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Describe the issue or any additional details"
  style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
  
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
      <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
        Get My Location
      </button>
  <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
  
  <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select Date and Time" 
        className="custom-datepicker"
      />
          <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
                Next
              </button>
</div>  
    </div>
  </div>
  
)}

{showNextContainer && (
   <div className="popup-container">
     <button className="close-button" onClick={handleCloseButtonClick} style={{fontWeight: 'bold',color: 'black' }}>X</button>
             
             <div className="inner-container">
                 <div className="container">
         <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
         <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
   
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Peter</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Repair</p>
         
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> peter@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price:R 900</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
      
      </div>
      <button onClick={handleCloseProfilePopup} >Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
            
             Request
           </button>
         </div>
       
           {/* Container 2 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px'}}>Angel</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Upgrades</p>
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> angel@yahoo.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 1200</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
    
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             
             Request
           </button>
           </div>
           {/* Container 3 */}
           <div className="container">
           <img src="person_Icon1.png" alt="Picture Icon" className="icon1" style={{ width: '60px', height: '60px' }} />
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           <p style={{ fontWeight: 'bold', color: '#ff0068',fontSize: '25px' }}>John</p>
           <hr style={{ color: '#ff0068', backgroundColor: '#ff0068', height: '1px', border: 'none' }} />
           
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> Electrical Installation</p>
   
           
           {/* Email address */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}> refiloem@gmail.com</p>
           
           {/* Price */}
           <p style={{ fontWeight: 'bold', color: '#ff0068' }}>Price: R 700</p>
           <a href="#" onClick={() => handleViewProfile(profileInfo)} style={{ fontWeight: 'bold', color: '#ff0068', marginTop: '10px', textDecoration: 'underline' }}>
          View Profile
        </a>
        {showProfilePopup && (
  <div className="profile-popup">
    <div className="popup-content">
      <div className="profile-container">
        <h2>{profileInfo.name}</h2>
        <p>{profileInfo.description}</p>
      
      </div>
      <button onClick={handleCloseProfilePopup}>Close</button>
    </div>
  </div>
)}
           
           {/* Request button */}
           <button className='small-button' onClick={handleContactCustomer} style={{ fontWeight: 'bold', color: '#fff',marginTop: '30px',backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px'}}>
             Request
           </button>
           </div>
   
   
   
   
             </div>
             </div>
               )}
               
 

              


        </section>
        {showPlumberPopup && (
 <div className="popup-container">
 <div className="popup-content">
   {/* Close button */}
   <button className="close-button" onClick={handleCloseButtonClick} style={{fontWeight: 'bold',color: 'black' }}>X</button>
   {/* Three containers */}
   <div className="infoContainer">
     <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
<select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
 <option value="">Select Service</option>
 <option value="electrician">Emergency Plumbing Services:</option>
 <option value="appliance">Available 24/7 for urgent plumbing issues like burst pipes, leaks, and overflowing toilets.</option>
 <option value="electrician">Identifying and fixing leaks in pipes, faucets, toilets, and appliances.</option>
 <option value="appliance">Pipe Installation and Repair:</option>
 <option value="electrician">Installing, repairing, or replacing water and gas pipes.</option>
 <option value="appliance"> Drain Cleaning and Unclogging:</option>
 <option value="electrician">Clearing clogged drains, sinks, toilets, and sewer lines.</option>
 <option value="appliance">Sewer Line Services:</option>
 <option value="electrician">Repairing and replacing damaged or blocked sewer lines.</option>
 <option value="appliance">Water Heater Services:</option>
 <option value="electrician">Installing, repairing, and maintaining water heaters, including tankless and traditional models.</option>
 <option value="appliance">Fixture Installation and Repair:</option>
 <option value="appliance">Installing and repairing faucets, sinks, toilets, showers, and bathtubs.</option>
 <option value="appliance">Garbage Disposal Services:</option>
 <option value="appliance">Installing, repairing, or replacing garbage disposals.</option>
 <option value="appliance">Backflow Prevention and Testing:</option>
 <option value="appliance">Installing and testing backflow prevention devices to prevent contaminated water from flowing back into the water supply.</option>
 <option value="appliance">Water Filtration and Purification:</option>
 <option value="appliance">Installing water filtration systems to improve water quality and remove impurities.</option>
 <option value="appliance">Gas Line Services:</option>
 <option value="appliance">Installing, repairing, and inspecting gas lines for stoves, dryers, and other appliances.</option>
 <option value="appliance">Septic Tank Services:</option>
 <option value="appliance">Pumping, cleaning, and maintaining septic tanks and systems.</option>
 <option value="appliance">Plumbing Inspections:</option>
 <option value="appliance">Conducting thorough inspections to identify potential plumbing issues and provide maintenance recommendations.</option>
 <option value="appliance">Fixture Upgrades:</option>
 <option value="appliance">Upgrading old fixtures to more efficient and modern options.</option>
 <option value="appliance">Bathroom and Kitchen Remodels:</option>
 <option value="appliance">Plumbing services for remodeling projects, including moving or adding plumbing fixtures.</option>
 <option value="appliance">Outdoor Plumbing:</option>
 <option value="appliance">Installing and repairing outdoor plumbing fixtures such as sprinkler systems, outdoor faucets, and drainage systems.</option>
 <option value="appliance">Water Pressure Regulation:</option>
 <option value="appliance">Adjusting and maintaining proper water pressure in the plumbing system.</option>
 <option value="appliance">Frozen Pipe Thawing:</option>
 <option value="appliance">Thawing frozen pipes and preventing them from bursting.</option>
 <option value="appliance">Hydro Jetting:</option>
 <option value="appliance">Using high-pressure water jets to clear stubborn clogs and clean sewer lines.</option>
 <option value="appliance">Plumbing System Maintenance:</option>
 <option value="appliance">Regular maintenance services to prevent plumbing issues and ensure optimal system performance.</option>
 <option value="appliance">Commercial Plumbing Services:</option>
 <option value="appliance">Providing plumbing services for commercial properties, including offices, restaurants, and retail spaces.</option>
 <option value="appliance">Offering expert advice on plumbing systems, repairs, and upgrades.</option>

</select>

<p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>Select your brand?</p>
<select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
 <option value="">Select Brand</option>
 <option value="electrician">Whirlpool Corporation</option>
 <option value="appliance">LG Electronics</option>
 <option value="electrician">Samsung Electronics</option>
 <option value="appliance">Electrolux</option>
 <option value="electrician">Bosch: </option>
 <option value="appliance">General Electic</option>
 <option value="electrician">Sofa Repair</option>
 <option value="appliance">Haier Group </option>
 <option value="electrician">Miele</option>
 <option value="appliance">Panasonic Corporation</option>
 <option value="electrician">Siemens</option>
 <option value="appliance">Maytag</option>
 <option value="appliance">AEG</option>
 <option value="appliance">KitchenAid</option>
 <option value="appliance">Sharp Corporation</option>
 <option value="appliance">Indesit Company</option>
 


</select>

<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Describe the issue or any additional details"
style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>

<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

   <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
   <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
     Get My Location
   </button>
<p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>

<DatePicker 
     selected={selectedDate}
     onChange={date => setSelectedDate(date)}
     showTimeSelect
     dateFormat="MMMM d, yyyy h:mm aa"
     placeholderText="Select Date and Time" 
     className="custom-datepicker"
   />
       <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
             Next
           </button>
</div>  
 </div>
</div>
)}
{showElectricianPopup && (
   <div className="popup-container">
   <div className="popup-content">
     {/* Close button */}
     <button className="close-button" onClick={handleCloseButtonClick} style={{fontWeight: 'bold',color: 'black' }}>X</button>
     {/* Three containers */}
     <div className="infoContainer">
       <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
 <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
   <option value="">Select Service</option>
   <option value="electrician">Refrigerator Repair</option>
   <option value="appliance">Oven and Stove Repair</option>
   <option value="electrician">Washing Machine Repair</option>
   <option value="appliance">Fridge Repair</option>
   <option value="electrician">DishWasher Repair</option>
   <option value="appliance"> Dryer Repair</option>
   <option value="electrician">Dishwasher Repair</option>
   <option value="appliance">Microwave Repair</option>
   <option value="electrician">Freeze Repair</option>
   <option value="appliance">Garage Disposal Repair</option>
   <option value="electrician">Air Conditioner Repair</option>
   <option value="appliance">Water Heater Repair</option>
   <option value="appliance">Range Hood Repair</option>
   <option value="appliance">Ice Maker Repair</option>
   <option value="appliance">Small Appliance Repair</option>
   <option value="appliance">General Maintenance and Tune-ups</option>
 </select>

 <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>Select your brand?</p>
 <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
   <option value="">Select Brand</option>
   <option value="electrician">Whirlpool Corporation</option>
   <option value="appliance">LG Electronics</option>
   <option value="electrician">Samsung Electronics</option>
   <option value="appliance">Electrolux</option>
   <option value="electrician">Bosch: </option>
   <option value="appliance">General Electic</option>
   <option value="electrician">Sofa Repair</option>
   <option value="appliance">Haier Group </option>
   <option value="electrician">Miele</option>
   <option value="appliance">Panasonic Corporation</option>
   <option value="electrician">Siemens</option>
   <option value="appliance">Maytag</option>
   <option value="appliance">AEG</option>
   <option value="appliance">KitchenAid</option>
   <option value="appliance">Sharp Corporation</option>
   <option value="appliance">Indesit Company</option>
   

  
 </select>
{/* Yes or No question */}
<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
           <select
             value={hasSubFaults}
             onChange={(e) => setHasSubFaults(e.target.value)}
             style={{ borderRadius: '5px', width: '250px', height: '40px' }}
           >
             <option value="no">No</option>
             <option value="yes">Yes</option>
           </select>
           {/* Input for sub faults if "Yes" */}
           {hasSubFaults === 'yes' && (
             <div>
               <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
               <select
                 value={selectedMainFault}
                 onChange={(e) => setSelectedMainFault(e.target.value)}
                 style={{ borderRadius: '5px', width: '250px', height: '40px' }}
               >
                 <option value="">Select Main Fault</option>
                 <option value="1.1">Compressor Replacement</option>
                 <option value="1.2">Thermostat Repair</option>
                 <option value="1.3">Refrigerant Recharge</option>
                 <option value="1.4">Door Seal Replacement</option>
                 <option value="1.5">Defrost System Repair</option>
               </select>
               {/* Render subfaults dropdown based on selected main fault */}
               {selectedMainFault && (
                 <div>
                   <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                   <select
                     value={selectedSubFault}
                     onChange={(e) => setSelectedSubFault(e.target.value)}
                     style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                   >
                     <option value="">Select Sub Fault</option>
                     {subFaults[selectedMainFault].map(subFault => (
                       <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                     ))}
                   </select>
                 </div>
               )}
                 </div>
           )}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
 <textarea
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 placeholder="Describe the issue or any additional details"
 style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
 
<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

     <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
     <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
       Get My Location
     </button>
 <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
 
 <DatePicker 
       selected={selectedDate}
       onChange={date => setSelectedDate(date)}
       showTimeSelect
       dateFormat="MMMM d, yyyy h:mm aa"
       placeholderText="Select Date and Time" 
       className="custom-datepicker"
     />
         <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
               Next
             </button>
</div>  
   </div>
 </div>
)}
{showPaintingPopup && (
   <div className="popup-container">
   <div className="popup-content">
     {/* Close button */}
     <button className="close-button" onClick={handleCloseButtonClick} style={{fontWeight: 'bold',color: 'black' }}>X</button>
     {/* Three containers */}
     <div className="infoContainer">
       <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>What do you need help with?</p>
 <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
   <option value="">Select Service</option>
   <option value="electrician">Refrigerator Repair</option>
   <option value="appliance">Oven and Stove Repair</option>
   <option value="electrician">Washing Machine Repair</option>
   <option value="appliance">Fridge Repair</option>
   <option value="electrician">DishWasher Repair</option>
   <option value="appliance"> Dryer Repair</option>
   <option value="electrician">Dishwasher Repair</option>
   <option value="appliance">Microwave Repair</option>
   <option value="electrician">Freeze Repair</option>
   <option value="appliance">Garage Disposal Repair</option>
   <option value="electrician">Air Conditioner Repair</option>
   <option value="appliance">Water Heater Repair</option>
   <option value="appliance">Range Hood Repair</option>
   <option value="appliance">Ice Maker Repair</option>
   <option value="appliance">Small Appliance Repair</option>
   <option value="appliance">General Maintenance and Tune-ups</option>
 </select>

 <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>Select your brand?</p>
 <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}  style={{ borderRadius: '5px' ,width: '250px',height: '40px'}}>
   <option value="">Select Brand</option>
   <option value="electrician">Whirlpool Corporation</option>
   <option value="appliance">LG Electronics</option>
   <option value="electrician">Samsung Electronics</option>
   <option value="appliance">Electrolux</option>
   <option value="electrician">Bosch: </option>
   <option value="appliance">General Electic</option>
   <option value="electrician">Sofa Repair</option>
   <option value="appliance">Haier Group </option>
   <option value="electrician">Miele</option>
   <option value="appliance">Panasonic Corporation</option>
   <option value="electrician">Siemens</option>
   <option value="appliance">Maytag</option>
   <option value="appliance">AEG</option>
   <option value="appliance">KitchenAid</option>
   <option value="appliance">Sharp Corporation</option>
   <option value="appliance">Indesit Company</option>
   

  
 </select>
{/* Yes or No question */}
<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Are there any faults?</p>
           <select
             value={hasSubFaults}
             onChange={(e) => setHasSubFaults(e.target.value)}
             style={{ borderRadius: '5px', width: '250px', height: '40px' }}
           >
             <option value="no">No</option>
             <option value="yes">Yes</option>
           </select>
           {/* Input for sub faults if "Yes" */}
           {hasSubFaults === 'yes' && (
             <div>
               <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Select  Fault:</p>
               <select
                 value={selectedMainFault}
                 onChange={(e) => setSelectedMainFault(e.target.value)}
                 style={{ borderRadius: '5px', width: '250px', height: '40px' }}
               >
                 <option value="">Select Main Fault</option>
                 <option value="1.1">Compressor Replacement</option>
                 <option value="1.2">Thermostat Repair</option>
                 <option value="1.3">Refrigerant Recharge</option>
                 <option value="1.4">Door Seal Replacement</option>
                 <option value="1.5">Defrost System Repair</option>
               </select>
               {/* Render subfaults dropdown based on selected main fault */}
               {selectedMainFault && (
                 <div>
                   <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sub Faults:</p>
                   <select
                     value={selectedSubFault}
                     onChange={(e) => setSelectedSubFault(e.target.value)}
                     style={{ borderRadius: '5px', width: '250px', height: '40px' }}
                   >
                     <option value="">Select Sub Fault</option>
                     {subFaults[selectedMainFault].map(subFault => (
                       <option key={subFault.id} value={subFault.id}>{subFault.name}</option>
                     ))}
                   </select>
                 </div>
               )}
                 </div>
           )}
 <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px'}}>Description:</p>
 <textarea
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 placeholder="Describe the issue or any additional details"
 style={{ width: '250px', minHeight: '50px' }} // Adjust width and height as needed
></textarea>
 
<p style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Where are you based?</p>

     <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ borderRadius: '5px', width: '250px', height: '40px' }} placeholder="Enter Your Location" />
     <button onClick={getLocation} style={{ fontWeight: 'bold', color: '#fff', marginTop: '10px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px', width: '250px', height: '40px' }}>
       Get My Location
     </button>
 <p style={{ fontWeight: 'bold', color: '#fff',fontSize: '15px'}}>When are you available?</p>
 
 <DatePicker 
       selected={selectedDate}
       onChange={date => setSelectedDate(date)}
       showTimeSelect
       dateFormat="MMMM d, yyyy h:mm aa"
       placeholderText="Select Date and Time" 
       className="custom-datepicker"
     />
         <button className="small-button" onClick={ handleNextButtonClick} style={{ fontWeight: 'bold', color: '#fff', marginTop: '15px', backgroundColor: '#40E0D0', border: '3px solid #40E0D0', borderRadius: '7px',width: '80px',height: '40px' ,marginLeft: '150px'}}>
               Next
             </button>
</div>  
   </div>
 </div>
)}
        
       

       

        <section className='partnership'>
          <div className='pictureandinfo'>
            <div className='foldedpic'>
              <img src='/foldedman.png' alt='JoinUs'style={{width: "500px", height:'500px'}}/>
            </div>
            <div className='pictureinfo' >

              <h1 style={{color: '#ff0068', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '40px', marginBottom: '40px'}}>Become a partner and enjoy many benefits</h1>
              <button style={{color: '#fff', float: 'right', background: '#ff0068', borderStyle: 'none', fontWeight: 'bold', fontFamily: 'poppins', padding: "8px", borderRadius: '10px', marginRight: '40px'}}>Register Now</button>
            </div>
            
          </div>
        </section>
        <section className="contactcontainer">
          {<div className='contactdetails'>
            <div className='registerimg'>

            </div>
            <div className='contactcontainer1'>
            <div>
              <h1 className='contactheading'style={{}}>Your Repairs<br/> Made Simple!</h1>
              <p className='contactparagraph'>Easily repair and maintain home<br/> 
appliances at your fingertips</p>



            </div>
            <div><img className='phone' src="/phone.png" style={{ width: '500px', height: '400px' }}/></div>
            
            </div>
            </div>}
        </section>
      
     
      </main>
      <footer className='finalsection'>
        {
          <div className='homefooter'>
            
            <div className='footerlogo'>

            </div>
            <div className='footerinfo'>
              
              <div className='footeraddress'>
                <p>Grand Central Office Park<br/>
Opposite Grand Central International Airport<br/>
<br/>49 New Road,Midrand<br/> +27 064 897 3566| info@myrepairs.com</p>
              </div>
              <div className='footerlinks'>
                <label>Links</label>
                <ul className='footerlist'><li><a href='/'>Home</a></li>
                <li><a href='/'></a></li>
                <li><a href='/'>Become A Partner</a></li>
                <li><a href='/'>Apps</a></li>
                <li><a href='/'>Contact us</a></li></ul>
              </div>
              <div className='footerlinks2'>
                <label>Information</label>
                <ul className='footerlist'><li><a href='/'>Privacy Policy</a></li>
                <li><a href='/'>Terms & Conditions</a></li>
                <li><a href='/'>Disclaimer</a></li>
                <li><a href='/'>Cancellation</a></li>
                <li><a href='/'>Return And Refund</a></li></ul>
              </div>

            </div>
          </div>
        }
      </footer>
    
      {showScrollButton && (
        <div
          className={`scroll-to-top ${showScrollButton ? 'show' : ''}`}
          onClick={() => {
            const topElement = document.getElementById('top');
            if (topElement) {
              topElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          ^
        </div>
      )}

      <style jsx global>{`
     

  .pictureinfo{
    padding: 20px;
    width: 390px;
  }
.pictureandinfo{
  display: flex;
  width: 970px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  
}


@keyframes colorfulShadow {
  0% {
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  }
  25% {
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
  }
  75% {
    box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  }
}

     @keyframes slideInFromTop {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    .card {
      position: relative;
      overflow: hidden;
      height: auto;
      width: auto;
      padding: 5px;
      border-style: none;
      z-index: 1;
    }
    
    .card:hover .expanded-content-container,
    .card:hover + .long-description-container .expanded-content-container {
      display: block; /* Show the container on hover */
    }
    
 
    .long-description-container {
      position: relative; /* Make sure the position is relative */
      z-index: 1000; /* Set a z-index for the description box */
      max-height: 150px; /* Adjust the max height as per your need */
      overflow-y: auto;

    }
    
    .expanded-content {
      font-size: 20px;
      position: relative;
      color: #ff0068;
      font-weight: bold;
      font-family:  Courier New;
      box-shadow: 0 0 10px rgba(255, 0, 104, 0.7);
      transition: box-shadow 0.5s ease;
      display: flex;
      justify-content: center;
      z-index: 1;
      overflow: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */
    }
    
    .expanded-content::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
    
    .long-description-container div {
      margin-bottom: 10px;
    }
    
    .long-description-container strong {
      margin-right: 5px;
    }
      label{
      margin-left: 40px;
      font-family: poppins;
      font-weight: bold;
      font-size: 20px;

        text-align: center;
       color: #fff;
        place-items: center;
      }
      .footerlist li a{
        list-style: none;
        text-decoration: none;
       color: #fff;
        
      }
      .footerlist li{
        list-style: none;
      }
      .footerlinks2{
        width: 300px;
        font-family: poppins;
      font-weight: bold;
        padding-left: 50px;
      }
      .footerlinks{
        font-family: poppins;
      font-weight: bold;
        width: 300px;
        padding-left: 60px;
       border-left: 2px solid #fff;
       border-right: 2px solid #fff;
        justify-content: center;
       
        
      }
      .footeraddress{
        font-family: poppins;
      font-weight: bold;
        padding-top: 40px;
        width: 300px;
     color: #fff;

      }
      .footerinfo{
        display: flex;
        width: 950px;
        justify-content: space-evenly;
        margin: 0 auto;
        margin-top: 10px;
       padding: 30px;

       
      }
      .finalsection{
        width: 100%;
        width: 100vw;
        background-color: #ff0068;

      }
      .homefooter{
        width: 970px;
        margin: 0 auto;
        background-color: #ff0068;

  
      }
      .footerimage{
        margin-left: 0px;
      }
      .footerlogo{
        padding:10px;
        width: 950px;
       margin: 0 auto;
       mix-blend-mode: none;
        height: 150px;
      }
      .Downloadheading{
        color: black;
        font-weight: bold;
        font-family: poppins;
        font-size: 35px;
      }
      .contactparagraph{
        color: #21B6A8;
        font-weight: bold;
        font-family: poppins;
        font-size: 25px;
        padding-left: 35px;
       
      }
      .contactheading{
        font-size: 50px;
        color: #ff0050;
        font-weight: bold;
        font-family: poppins;
       padding-left: 35px;
      }
      .contactcontainer1{
        margin: 0 auto;
        display: flex;
        align-items: center;

        width: 950px;
        padding:20px;
        justify-content: space-between;
      }
      .contactdetails{
        margin: 0 auto;
       padding-bottom: 50px;
        width: 1005;
     
        align-items: end;
        padding: 10px;
        margin-bottom: 20px;
        justify-content: space-between;
      }

      .sponsors{
        background: #E3E6E3;
        align-items: center;
        height: 400px;
        width: 970px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      }
   
      .descrip-p{
        font-family: poppins;
        font-weight: bold;
      }
      .descrip-p1{
        font-family: poppins;
        color: #21B6A8;
        font-weight: bold;
      }
      .stepdescription{
        margin-top: -10px;
        justify-content: space-around;
        margin-left: 5px;
        color: #ff0068;
       
        

      }
      .stepinstructions{
        margin-top: -13px;
        justify-content: space-around;
        margin-left: 5px;
        font-size: 11px;
        color: #454545;
        font-weight: bold;
      }
      .stepheadings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
        color: #ff0055;
      }
      .step2headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
      }
      .step3headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
        color: #ff0055;
      }
      .step4headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
      }
      .step5headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
        color: #ff0055;
      }
      .step6headings{
        font-family: poppins;
        font-weight: bold;
        font-size: 36px;
      }
      .iconarea1{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea2{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea3{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea4{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea5{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .iconarea6{
        display: flex;
        
        align-items: end;
        justify-content: space-evenly;
        color: #21B6A8;
       

      }
      .step1{
width: 250px;

      }
      .step2{
        width: 250px;
        
              }
              .step3{
                width: 250px;
                
                      }
                      .step4{
                        width: 250px;
                        
                              }
                              .step5{
                                width: 250px;
                                
                                      }
                                      .step6{
                                        width: 250px;
                                        
                                              }
    
      .phase1{
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #ff0055;
      }
      .phase2{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #ff0055;
      }
      .howitworks{
        margin: 0 auto;
        margin-top:25px;
        width: 950px;
        padding: 20px;
        padding-left: 0;
        padding-right: 0;
       
      }

body::-webkit-scrollbar {
  width: 0.1rem;
  background-color: transparent; 
}


body::-webkit-scrollbar-thumb {
  background-color: transparent;
}


body {
  scrollbar-width: none;
}


body {
  -ms-overflow-style: none; 
}
@media (max-width: 768px){
  .scroll-to-top{
    display: none;
  }
}
      .scroll-to-top {
        position: fixed;
        bottom: 50px;
        right: 50px;
        background-color: #21B6A8;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0;
        font-size: 40px;
        font-weight: bold;
        transition: opacity 0.3s;
      }
      
      .scroll-to-top.show {
        opacity: 1;
      }

      .scroll-to-top:hover{
        background: #ff0068;
        transition: background 0.3s;
      }
      
 
   .heading-with-lines {
    display: flex;
    font-family: poppins;
    align-items: center;
    font-size: 40px; 
    font-weight: bold;
    color: #ff0050;
  }
  .heading-with-lines::before,
  .heading-with-lines::after {
    content: '';
    flex-grow: 1;
    font-weight: bold;
   
    border-top: 2px solid #ff0055;
    margin: 0 10px; 
    width: 30px;
  }

      .services{
        background: #fff;
        margin-top: -10px;

      }
      .service-heading{
       width: 970px;
      
        text-align: center;
        padding-top: 100px;
        color: white;
        margin: 0 auto;
       
        justify-content: center;

      }
      .hovered .card-icon {
        background-image: url('/icons/icon-hover-background.png'); // Change to the background image on hover
      }
      .card{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: auto;
        width: auto;
        padding: 5px;
        border-style: none;

      }
      .card:hover{
        .card-title{
          color: #ff0068;
          
        }
      }
      
 .card-container {
  display: grid;
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  border-radius: 30px;
  grid-template-columns: repeat(4, 1fr); /* Four columns */
  gap: 20px; /* Gap between cards */
  justify-items: center; /* Center icons horizontally */
  
}
.icon-container {
  display: flex;
          justify-content: center;
          align-items: center;
          height: 100px; 
          margin-top: 40px;
          margin-bottom: 25px;
}
.card-title {
  text-align: center;
  position: relative;
  margin: 0 auto;
  margin-top: 25px;
  font-weight: bold;
  font-family: poppins;
 color:#21B6A8;
  width: 85px;
  
}

.section-heading {
  text-align: center;
  margin-bottom: 20px;
}
.section-line {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px auto;
  width: 50px;
}
.images{
  margin-top: 0px;
  background: black;

}
.image1{
  position: absolute;
  margin-top: -80px;
  margin-left: -650px;
z-index: 3;

}
.image2{
  position: absolute;
z-index: 1;
width: 80px;
object-fit: cover;
margin-left: -750px;
margin-top: -30px;

}


.image3{
  position: absolute;
  z-index: 2;
  margin-top: -220px;
  margin-left: -600px;
}
.image4{
  position: absolute;
  z-index: 1;
  margin-left: -380px;
  margin-top: -80px;
}

      .btn-register1{
        margin-top: 30px;
        border-radius: 10px;
        background:#21B6A8;
        color: white;
        font-weight: bold;
        padding: 8px; 
      }
      h1{
        font-size: 80px;
        font-family: poppins;
      }
    
      h4{
        font-size: 30px;
        margin-top: -50px;
        font-family: poppins;
      }
      .topheader{
        margin-left: 40px;
      }
.intro{
  display: block;
  width: 300px;
 margin-left: 40px;
}
.slider{
  display: flex;
  align-items: center;
  width: 970px;
      
        background: #ff0068;
        padding-top: 100px;
        color: white;
        margin: 0 auto;
       
        justify-content: space-between;
  color: white;
  font-weight: bold;
  font-size: 20px
  
  
  
}
      .banner{
        width: 100%;
        height: 350px;
        background: #ff0068;
        width: 100vw;
        margin: 0 auto;
      }
      .home-page{
        
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0px;
      

      }
      .header1{
       width: 100vw;
       background: #fff;
      }
      .paragraph1{
        padding-top: 5px;
       font-weight: bold;
       color: #ff0068;
        margin-top: 10px;
        font-family: Arial;
        font-size: 20px;
       

      }
      .firstheader{
        display: flex;
       
        width: 970px;
      
        text-align: center;
      
        color: white;
        margin: 0 auto;
       
line-height: 5px;
        background: #fff;
        
        font-weight: bold;
        color: #ff0068;

     
       
     
      
      
      }
      .Menu{
        width: 100%;
        background: red;
        height: 100px;
      }
      .long-description-container {
        max-width: 500px;
        margin: 0 auto;
        padding: 10px;
        display: grid;
        grid-template-rows: repeat(2, auto); /* Set the number of rows */
        gap: 5px; /* Adjust the gap between rows if needed */
      }
      .popup-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 192, 203, 0.9); /* Pink color with some transparency */
        z-index: 9999; /* Ensure the popup is above other elements */
        display: flex;
        justify-content: center;
        align-items: center;
        
      }
      
 
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        color: #fff; /* Color of the close button */
        font-size: 20px;
        cursor: pointer;
      }
      .inner-container {
        display: flex;
        justify-content: space-between;
      }
      
      .container {
        width: 250px; /* Adjust the width as per your layout */
        height: 450px;
        padding: 20px;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: #fff; /* Pink background color */
        color: #fff; /* Text color */
        text-align: center; /* Center the content */
        font-size: 20px; /* Adjust the font size */
        margin: 15px; /* Added margin to create space between containers */
        border: 2px solid #ff0068;
      }
      .infoContainer{
        width: 600px; /* Adjust the width as per your layout */
        height: 650px;
        padding: 20px;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: #ff0068; /* Pink background color */
        color: #fff; /* Text color */
        text-align: center; /* Center the content */
        font-size: 20px; /* Adjust the font size */
        margin: 15px; /* Added margin to create space between containers */
        border: 2px solid #ff0068;

      }
      .custom-datepicker {
        /* Your custom styles here */
        border-radius: 5px;
        /* Add any other styles you want */
      }
      .profile-popup {
  position: fixed; /* This ensures the popup stays fixed in the viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 192, 203, 0.9); /* Pink color with some transparency */
  z-index: 9999; /* Ensure the popup appears on top of other elements */
  display: flex;
  justify-content: center;
  align-items: center;
 
}

.popup-content {
  background-color: #ff0068;
  padding: 20px;
  border-radius: 10px;
  font-family: Papyrus; 
  font-size: 20px;
  font-weight: bold;
  
}

.profile-container {
  height: 350px;
  width: 350px;
}
     
     
    
      `}</style>
    </div>
  );
}

export default HomePage;
