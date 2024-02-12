import React, { useState, useEffect } from 'react';

const ServiceDetail = ({ service, onClose, onNext, username }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [showpayment, setshowpayment] = useState(false)
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null); // Initialize payment status as null

  const handlePayment = async () => {
    const storedUsername = localStorage.getItem('userEmail');
    if (!storedUsername) {
      // Handle the case where username is not defined
      console.error('Username is not defined.');
      // You can handle this by redirecting to an error page or displaying a message to the user.
      return;
    }
    const payFastUrl = ' https://sandbox.payfast.co.za​/eng/process';
    const cancelUrl = ` https://2fc4-197-184-176-15.ngrok-free.app/user-dashboard?username=${encodeURIComponent(storedUsername)}`;
    const returnUrl = ' https://2fc4-197-184-176-15.ngrok-free.app/paymentsuccess';

    const requestPayload = {
      merchant_id: '10000100',
      merchant_key: '46f0cd694581a',
      return_url: returnUrl,
      cancel_url:  cancelUrl,
      notify_url: 'https://www.example.com/notify',
      amount: service.pricePerHour,
      item_name: service.serviceType,
      provider_name: service.serviceProviderEmail,
    };
  
    try {
      // Create a form and add the fields for payment
      const form = document.createElement('form');
      form.method = 'post';
      form.action = payFastUrl;
  
      for (const field in requestPayload) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field;
        input.value = requestPayload[field];
        form.appendChild(input);
      }
      const paymentDetails = {
        serviceType: service.serviceType,
        serviceProviderEmail: service.serviceProviderEmail,
        pricePerHour: service.pricePerHour,
        deliveryAddress,
        email,
        paymentStatus: 'Successful',
      };
  
      // Store payment details in localStorage
      localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
  
  
      document.body.appendChild(form);
      form.submit();
      setPaymentSubmitted(true);
    } catch (error) {
      console.error('Error creating request:', error);
      // Handle the error as needed
      // Set payment status to "Failed"
      setPaymentStatus('Failed');
    }
  };
  
  


 
  const handleGetGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );

            if (!response.ok) {
              throw new Error('Error fetching address');
            }

            const data = await response.json();
            const address = data.address;

            const formattedAddress = [
              address.road || '',
              address.city || '',
              address.postcode || ''
            ].join('\n');
            setDeliveryAddress(formattedAddress);
          } catch (error) {
            console.error("Error getting geolocation:", error);
            alert("Error getting geolocation. Please enter the address manually.");
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          alert("Error getting geolocation. Please enter the address manually.");
        }
      );
    } else {
      alert("Geolocation is not available in this browser.");
    }
  };
 
  
  const handleNext = () => {
    if (deliveryAddress.trim() !== '' && email.trim() !== '') {
      setShowSummary(true);
    } else {
      alert('Please enter a valid delivery address.');
    }
  };

  const handleBack = () => {
    setShowSummary(false);
  };

  useEffect(() => {
    if (showSummary) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showSummary]);

  return (
    <div className='parent'>
      <div className="service-detail-modal">
      <div className="close-button-container">
      <button className="close-button" onClick={onClose}>
        <span className="close-icon">X</span>
      </button>
     
    
    </div>
    <div className="service-detail-content">
    {service && service.serviceType ? (

      <div>
  {showSummary ? (
    <div>
      {paymentStatus === 'Successful' ? (
        <div>
          <h2>Payment Successful</h2>
          <p>Your payment has been processed successfully.</p>
        </div>
      ) : paymentStatus === 'Failed' ? (
        <div>
          <h2>Payment Failed</h2>
          <p>Your payment has failed. Please try again.</p>
        </div>
      ) : (
        <div>
          <div className='summary_title'><h2>Request Summary</h2></div>
          <p>Service: <strong>{service.serviceType}</strong></p>
          <p>Provider Email: <strong>{service.serviceProviderEmail}</strong></p>
          <p>Price: <strong>R{service.pricePerHour}</strong></p>
          <p>Address: <strong>{deliveryAddress}</strong></p>
          <p>Total Amount: <strong>R{service.pricePerHour}</strong></p>
          <p>Email: <strong>{email}</strong></p>
          <div className='buttons'>
            <button className="purchase-button" onClick={handlePayment}>
              Pay Now
            </button>
            <div className='back-button-conatiner'> 
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      <div className='service_name'><h2>{service.serviceType} Services</h2></div>
      <p className='service_price_heading'>Service Price</p>
      <p className='service_price'> R{service.pricePerHour}</p>
      <div>
        <label>Enter Email</label><br/>
        <input
          className='email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br/>
      <button className="geolocation-button" onClick={handleGetGeolocation}>
        Get Location
      </button>
      <div className="input-container">
        <textarea
          className="address-textarea"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          rows={3} // Specify the number of visible rows
        />
        <div className="next-button-container">
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  )}
  </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

      </div>

      <style jsx>{`
      .summary_title{
        border-bottom: 2px solid #fff;
        width: 100%;

      }
    
      .service_price_heading{
        margin-bottom: -35px;
      }
      .service_price{
        font-size: 40px;
        font-family: poppins;
        font-weight: bold;
        padding: 0;
        margin-bottom: 5px;

      }
      .service_name{
        border-bottom: 2px solid #fff;
      }
      .geolocation-button{
        background: #21B6A8;
        color: #fff;
        font-family: poppins;
        font-weight: bold;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        border-style: none;
        font-family: poppins;
        font-weight: bold;
      }
   .email{
    width: 200px;
    border-radius: 5px;
    border-style: none;
    padding: 5px;
    margin-top: 5px;

   }
      .buttons{
        display: flex;
        width: 100%;
        
        justify-content: space-between;
       
      }
 .back-button-container {
  position: absolute;
 bottom: 20px;
  right: 15px;
  

}
.purchase-button{
  background: #21B6A8;
  font-family: poppins;
  font-weight: bold;
  color: #fff;
  border-style: none;
  border-radius: 5px;
}
.back-button {
  background-color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  color: #ff0068;
  font-weight: bold;

  transition: background-color 0.3s, transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);
}

.back-button:hover {
  
  transform: scale(1.1);
}

.next-button-container {
  position: absolute;
 bottom: 20px;
  right: 15px;

}

.next-button {
  background-color: #21B6A8;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  transition: background-color 0.3s, transform 0.5s cubic-bezier(0.42, 0, 0.58, 1);
}

.next-button:hover {
  background-color: #21B6A8;
  transform: scale(1.1);
  color:white;
  
  
}
textarea{
  width: 200px;
  resize: none;
  border-radius: 5px;
  border-style: none;
  padding: 5px;
}

      .close-button-container {
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 1111;
      }
    
      .close-button {
        background-color: #fff;
        border: 2px solid #ff0068;
        cursor: pointer;
        padding: 0;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        width: 30px;
        color: #ff0068;
        height: 30px;

        border-radius: 50%;
        transition: background-color 0.3s;
      }
    
      .close-button:hover {
        background-color: rgba(0, 0, 0, 0.3);
        background: #fff;
        width: 32px;
        height: 32px;
        
        color: red;
        box-shadow: 0 0 5px red;
        transition: box-shadow 2s cubic-bezier(0.42, 0, 0.58, 1), width 0.3s, height 0.3s;

        .close-icon {
          font-size: 20px;
    color: red;
    display: flex;
    position: absolute; 
   border-radius:8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: font-size 0.5s cubic-bezier(0.42, 0, 0.58, 1), width 0.3s, height 0.3s;
        }
      }
  
    
      .close-icon {
        font-size: 18px;
        color: red;
      }

.input-container {
  margin-top: 10px;
  display: grid;
  flex-direction: column;
}

.address-input {
  width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    min-height: 100px; /* Adjust the minimum height as needed */
    white-space: pre-line; /* Preserve line breaks */
  }
        .parent {
          position: absolute;
          place-items: center;
         
          width: 1000px;
          height: 620px;
          backdrop-filter: blur(10px);
          background-color: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2222; 
          transition: backdrop-filter 0.3s;

        }
        
        .service-detail-modal {
          width: 500px;
          background: #ff0068;
          border-radius: 10px;
          box-shadow: 0 0 5px white;
          color: white;
          animation: slide-in 0.5s cubic-bezier(0.42, 0, 0.58, 1) forwards;
          display: flex;
          flex-direction: column; /* Align items in a column */
          
          padding: 20px;
          
          }

        @keyframes slide-in {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
