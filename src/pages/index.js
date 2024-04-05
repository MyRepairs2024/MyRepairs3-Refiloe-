import React, { useState, useEffect } from 'react';
import Header from './components/Header1';



const cardData = [
  {
    icon: '/Icon1.1.png',
    title: 'Electrician Services',
    hoverIcon: '/Icon1.png',
    longDescription: "Services:\n Electrical Installation\n Eletrical Repair\n Electrical Upgrades\n Light Installation\n Circuit Breaker\n Electrical Wiring\n Ceiling Fan Installation\n Appliance Wiring\n Outdoor Electrical Services\n Outdoor Safety Inspections\n Surge Protection\n Emergency Eletrcical Services\n Electrical Panel Upgrade\n Grounding and Bonding\n Generator Installation and Maintenance\n Energy Efficiency Audits\n Smoke and Carbon Monoxide Detector Installation\n Home Automation and Smart Home Services"

  },

  {
    icon: '/Icon2.1.png',
    title: 'Appliance Services',
    hoverIcon: '/Icon2.png',
    longDescription: "Appliance Repair Faults:\n Refrigerator\n Dryer\n DishWasher\n Oven and Stove\n Microwave\n Freezer\n Garbage Disposal Repair\n Air Conditioner\n Water Heater\n Range Hood\n Ice Maker\n Small Applianes\n General Maintenance and Tune-Ups "
  },
  
  {
    icon: '/Icon3.1.png',
    title: 'Plumbing Repairs',
    hoverIcon: '/Icon3.png',
    longDescription: "Services:\n Emergency Plumbing \nSewer Line\n Pipe Installation\n Drain\n Cleaning and Unclogging\n Water Heater\n Garbage Disposal\n Backflow Prevention\n Water Filtration\n Gas Line\n Sceptic tank\n Water Pressure\n Bathroom and Kitchen Remodels\n Frozen\n Pipe Thawing\n Hydro Jetting\n Plumbing System Maintenance\n Commercial Plumbing\n Plumbing Consultaion and Advice"
  },
  
  {
    icon: '/Icon4.1.png', 
    title: 'Repair Services',
    hoverIcon: '/Icon4.png',
    longDescription: "Repairs:\nHomes.\nOffices\n Commercial Buildings"

  },
  {
    icon: '/Icon5.1.png',
    title: 'Painting Services',
    hoverIcon: '/Icon5.png',
  },
  {
    icon: '/Icon6.1.png',
    title: 'Pest Control',
    hoverIcon: '/Icon6.png',
  },

  {
    icon: '/Icon7.1.png', 
    title: 'Laundry Services',
    hoverIcon: '/Icon7.png',
  },
  {
    icon: '/Icon8.1.png',
    title: 'Beauty Spa',
    hoverIcon: '/Icon8.png',
  },
  {
    icon: '/Icon9.1.png',
    title: 'Grocery Delivery',
    hoverIcon: '/Icon9.png',
  },

  {
    icon: '/Icon10.1.png', 
    title: 'Medication Delivery',
    hoverIcon: '/Icon10.png',
  },
  {
    icon: '/Icon11.1.png',
    title: 'Packers and Movers',
    hoverIcon: '/Icon11.png',
  },
  {
    icon: '/Icon12.1.png',
    title: 'Cake Catering',
    hoverIcon: '/Icon12.png',
  },
  
];

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

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
    setExpandedCard((prevExpandedCard) => (prevExpandedCard === index ? null : index));
  };
  const handleDescriptionItemClick = (line) => {
    // Handle click event for each line in the long description
    console.log('Clicked:', line);
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

            <p className='paragraph1'>At MyRepairs we believe that any product failure should be 
handled quickly, efficiently, and effectively, with as little disruption 
and inconvenience to the consumer as possible.
</p>
           
            
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
                <a key={index} onClick={() => handleDescriptionItemClick(line)}>
                  {line}
                </a>
              ))
            ) : (
              "No description available"
            )}
          </div>
    </div>
  </div>
)}
</div>
 ))}
</div>
  
</div>



          }
        </section>
        
       

       

        <section className='partnership'>
          <div className='pictureandinfo'>
            <div className='foldedpic'>
              <img src='/foldedman.png' alt='JoinUs'style={{width: "500px", height:'500px'}}/>
            </div>
            <div className='pictureinfo' >
              <h2 style={{color: '#21B6A8', fontWeight: 'bold', fontFamily: 'poppins', fontSize: '35px'}}>Become a Partner</h2><br/>
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
      font-family: poppins;
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
     
     
    
      `}</style>
    </div>
  );
}

export default HomePage;
