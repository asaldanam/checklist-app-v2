import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
// import SignIn from './views/SignIn';

const SignIn = React.lazy(() => import('./views/SignIn'))

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path={'/'} component={SignIn} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
