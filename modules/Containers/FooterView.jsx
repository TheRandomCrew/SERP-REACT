import React from 'react';

const FooterView = () => {
  return (
    <footer
      className='container-fluid .d-sm-none .d-md-block'
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '35px',
        lineHeight: '35px',
        backgroundColor: '#f5f5f5'
      }}
    >    
      <p className='text-right small'>&copy; 2019 SERP</p>
    </footer>
  );
};

export default FooterView;