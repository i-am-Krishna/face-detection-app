import React from 'react';
import MainRoute from './MainRoute';
import Home from './Home/Home';
import NavBar from './Home/NavBar';

const App = () => {
  return (
    <div>
      <NavBar/>
      <MainRoute/>
    </div>
  );
};

export default App;