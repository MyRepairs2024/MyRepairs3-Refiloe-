import React from 'react';

const PDFLink = () => {
  const downloadServiceProviderPdf = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = '/Service Provider (10).pdf'; // Ensure this path is correct
    link.download = '/Service Provider (10).pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadFreelancerPdf = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = '/Freelancer Application Form.pdf'; // Ensure this path is correct
    link.download = 'Freelancer Application Form.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ marginRight: '40px', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <a
        onClick={downloadServiceProviderPdf}
        style={{
          color: '#fff',
          background: '#ff0068',
          borderStyle: 'none',
          fontWeight: 'bold',
          fontFamily: 'poppins',
          padding: '8px',
          borderRadius: '10px',
          textDecoration: 'none',
          marginBottom: '10px' // Add some margin to separate the buttons
        }}
        href="#"
      >
        Download a Business Form
      </a>
      <a
        onClick={downloadFreelancerPdf}
        style={{
          color: '#fff',
          background: '#ff0068',
          borderStyle: 'none',
          fontWeight: 'bold',
          fontFamily: 'poppins',
          padding: '8px',
          borderRadius: '10px',
          textDecoration: 'none',
          marginBottom: '20px' // Add some margin to separate the buttons
        }}
        href="#"
      >
        Download a Freelancer Form
      </a>
      <div style={{ marginTop: '20px', color: '#000', fontFamily: 'poppins' }}>
        <p>Scan the form to this Email: <a href="mailto:myrepairs@gmail.com" style={{ color: '#ff0068', textDecoration: 'none' }}>myrepairs@gmail.com</a></p>
      </div>
    </div>
  );
};

export default PDFLink;