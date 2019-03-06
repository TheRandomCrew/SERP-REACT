import React from 'react';
import NavBarView from './Containers/NavBarView';
import FooterView from './Containers/FooterView';
import Home from './Containers/Home.jsx';
// import Features from './Containers/Features';
// import Pricing from './Containers/Pricing';

const AppRouter = () => {
  return (
      <React.Fragment>
        <NavBarView />
        <div style={{ height: '100%', minHeight: '100%' }}>
        <Home/>
        </div>
        <FooterView />
      </React.Fragment>
  );
};

export default AppRouter;
