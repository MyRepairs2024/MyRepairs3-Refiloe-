import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <section className="about-us">
        <h1>About Us</h1>
        <div className="about-us-content">
          <p>
            Welcome to MyRepairs! We are dedicated to providing top-notch repair and maintenance services for a wide range of appliances. Our mission is to make the process of repairing and maintaining your appliances as seamless and convenient as possible.
          </p>
          <p>
            Our team of experienced and certified technicians are experts in handling all types of appliances from various brands and manufacturers. We pride ourselves on delivering high-quality service, ensuring your appliances are back in working order swiftly and efficiently.
          </p>
          <p>
            At MyRepairs, customer satisfaction is our top priority. We strive to provide excellent service at competitive prices, and our user-friendly platform makes it easy for you to schedule repairs at your convenience.
          </p>
        </div>
        <div className="our-mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to become the leading provider of appliance repair services by consistently offering outstanding service, quality workmanship, and innovative solutions to our customers.
          </p>
        </div>
        <div className="our-values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Customer Focus:</strong> We put our customers at the heart of everything we do.</li>
            <li><strong>Integrity:</strong> We conduct our business with honesty and transparency.</li>
            <li><strong>Excellence:</strong> We strive for excellence in every service we provide.</li>
            <li><strong>Innovation:</strong> We embrace new technologies and methods to improve our services.</li>
            <li><strong>Teamwork:</strong> We believe in the power of collaboration and teamwork.</li>
          </ul>
        </div>
      </section>

      <style jsx>{`
        .about-us-page {
          background: url('/logo-w.png') no-repeat top left;
          background-size: 80px 80px; /* Adjust size as needed */
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #ff0068;
        }

        .about-us {
          text-align: center;
          margin-top: 50px;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.9); /* Adding transparency to see the logo */
          color: #333;
          border-radius: 10px;
        }

        .about-us h1 {
          font-size: 36px;
          color: #ff0068;
        }

        .about-us-content {
          margin-top: 20px;
          font-size: 18px;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
        }

        .our-mission, .our-values {
          margin-top: 40px;
        }

        .our-mission h2, .our-values h2 {
          font-size: 28px;
          color: #ff0068;
          margin-bottom: 10px;
        }

        .our-values ul {
          list-style: none;
          padding: 0;
          max-width: 800px;
          margin: 0 auto;
          text-align: left;
        }

        .our-values li {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .our-values strong {
          color: #ff0068;
        }

      `}</style>
    </div>
  );
};

export default AboutUsPage;