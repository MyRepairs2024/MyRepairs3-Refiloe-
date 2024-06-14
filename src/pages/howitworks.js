import React from 'react';

const HowItWorksPage = () => {
  return (
    <div>
     

      <div className='howitworks'>
        <h2 className="heading-with-lines">How It Works</h2>
        <div className='phase1'>
          <div className='step'>
            <div className='icon-area'>
              <h3 className='step-heading'>Step 1</h3>
              <img src='/tv-pink.png' alt='Step 1' />
            </div>
            <div className='step-description'>
              <p className='descrip-p'>Select Your<br />Appliance</p>
            </div>
            <div className='step-instructions'>
              <p>Choose the appliance that needs to be repaired or serviced</p>
            </div>
          </div>

          <div className='step'>
            <div className='icon-area'>
              <h3 className='step-heading'>Step 2</h3>
              <img src='/logotv.png' alt='Step 2' />
            </div>
            <div className='step-description'>
              <p className='descrip-p'>Select An Appliance Brand<br />or Manufacturer</p>
            </div>
            <div className='step-instructions'>
              <p>Select the brand or manufacturer of your appliance.</p>
            </div>
          </div>

          <div className='step'>
            <div className='icon-area'>
              <h3 className='step-heading'>Step 3</h3>
              <img src='/tv-pink.png' alt='Step 3' />
            </div>
            <div className='step-description'>
              <p className='descrip-p'>Select Your<br />Appliance</p>
            </div>
            <div className='step-instructions'>
              <p>Select the problem from the dropdown.</p>
            </div>
          </div>
        </div>

        <div className='phase2'>
          <div className='step'>
            <div className='icon-area'>
              <h3 className='step-heading'>Step 4</h3>
              <img src='/calendar.png' alt='Step 4' />
            </div>
            <div className='step-description'>
              <p className='descrip-p'>Select the preferred date and<br />time for the repair</p>
            </div>
            <div className='step-instructions'>
              <p>Select the date and time slot to get the repair or servicing done at your convenience.</p>
            </div>
          </div>

          <div className='step'>
            <div className='icon-area'>
              <h3 className='step-heading'>Step 5</h3>
              <img src='/quote.png' alt='Step 5' />
            </div>
            <div className='step-description'>
              <p className='descrip-p'>Servicing/Repair Request for a<br />quotation sent</p>
            </div>
            <div className='step-instructions'>
              <p>Select the brand or manufacturer of your appliance.</p>
            </div>
          </div>

          <div className='step'>
            <div className='icon-area'>
              <h3 className='step-heading'>Step 6</h3>
              <img src='/rocket.png' alt='Step 6' />
            </div>
            <div className='step-description'>
              <p className='descrip-p'>Get a quotation from trusted<br />service providers</p>
            </div>
            <div className='step-instructions'>
              <p>Get a quote, schedule an appointment, and securely pay a call-out fee.</p>
            </div>
          </div>
        </div>
        <footer className='finalsection'>
          <div className='homefooter'>
           
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
        </footer>
      </div>
      
      <style jsx>{`
        .HowItWorks {
          // Add your styles here
        }

        .howitworks {
          text-align: center;
          margin-top: 50px;
          background-color: #fff;
          color: #636363;
          font-size: 40px;
          font-family: Arial;
          padding: 20px;
          border-radius: 10px;
        }

        .phase1,
        .phase2 {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .step {
          flex-basis: calc(33.33% - 20px); /* Adjust as needed */
          padding: 20px;
          border-radius: 10px;
        }

        .step h3 {
          font-size: 24px;
          color:#ff0068;
        }

        .step img {
          width: 140px;
          height: 140px;
        }

        .step-description,
        .step-instructions {
          margin-top: 10px;
          font-size: 20px;
        }

        .step-instructions p {
          font-size: 20px;
        }

        .footerlogo{
          padding:10px;
          width: 950px;
         margin: 0 auto;
         mix-blend-mode: none;
          height: 150px;
        }

        .logo {
          width: 300px; /* Adjust width as needed */
          height: auto; /* Maintain aspect ratio */
          margin-left: -20px; /* Add left margin for spacing */
        }

        .footerlist li a{
          list-style: none;
          text-decoration: none;
         color: #fff;
          
        }

        .footerlist li {
          list-style: none;
        }

        .footerlinks2{
          width: 300px;
          font-family: poppins;
        font-weight: bold;
        font-size: 20px;
          padding-left: 50px;
        }

        .footerlinks{
          font-family: poppins;
        font-weight: bold;
        font-size: 20px;
          width: 300px;
          padding-left: 60px;
         border-left: 2px solid #fff;
         border-right: 2px solid #fff;
          justify-content: center;
         
          
        }
        .footeraddress{
          font-family: poppins;
        font-weight: bold;
        font-size: 20px;
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
        .footerimage {
          margin-left: 0px;
        }

      `}</style>
    </div>
  );
};

export default HowItWorksPage;