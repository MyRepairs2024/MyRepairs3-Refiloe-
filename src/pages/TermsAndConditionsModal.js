import React, { useState } from 'react';

const TermsAndConditionsModal = ({ handleClose }) => {
  const [showContent, setShowContent] = useState(false);

  const handleTermsClick = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        
        <h2>
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}
            onClick={handleTermsClick}
          >
            Terms and Conditions
          </span>
        </h2>

        {showContent && (
          <>
            <p>
              Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website.
            </p>
            <p>
              By accessing or using this website in any way, you agree to and are bound by the terms and conditions set forth herein. If you do not agree to all of the terms and conditions contained in this agreement, do not use this website.
            </p>
            <p>
              The content of the pages of this website is for your general information and use only. It is subject to change without notice.
            </p>
            <p>
              If you create an account on this website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;