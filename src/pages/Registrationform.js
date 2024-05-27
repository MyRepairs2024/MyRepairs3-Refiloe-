import React from 'react';

const PDFLink = () => {
  const downloadPdf = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = '/Service Provider.pdf'; // Ensure this path is correct
    link.download = 'Service Provider.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ marginRight: '40px', marginTop: '20px' }}>
      <a
        onClick={downloadPdf}
        style={{
          color: '#fff',
          background: '#ff0068',
          borderStyle: 'none',
          fontWeight: 'bold',
          fontFamily: 'poppins',
          padding: '8px',
          borderRadius: '10px',
          textDecoration: 'none',
          display: 'inline-block',
        }}
        href="#"
      >
        Download Application Form
      </a>
      <div style={{ marginTop: '20px', color: '#000', fontFamily: 'poppins' }}>
        <p>Scan the form to this Email: <a href="mailto:example@example.com" style={{ color: '#ff0068', textDecoration: 'none' }}>myrepairs@gmail.com</a></p>
      </div>
    </div>
  );
};

export default PDFLink;