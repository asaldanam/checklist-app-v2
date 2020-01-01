import React, { Suspense } from 'react';
import 'App.scss';
import { BrowserRouter as Router, Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import UIRouterAnimations from 'components/UIRouterAnimations/UIRouterAnimations';

import ViewSignIn from './views/ViewSignIn'
import ViewMain from './views/ViewMain'
import { FilterProvider } from 'core/filterContext';

const Routes = withRouter(({location, history}: RouteComponentProps) => {
  return (
    <UIRouterAnimations
      locationKey={location.key}
      action={history.action}
      path={location.pathname}
    >
      <Switch location={location}>
        <Route exact path={'/'} component={ViewSignIn} />
        <Route exact path={'/main'} component={ViewMain} />
      </Switch>
    </UIRouterAnimations>
  )
})

const App: React.FC = () => {

  const theme = {
    space: [
      0, 8, 16, 32, 40, 48, 56, 64, 72, 80, 88
    ],
  }

  return (
    <ThemeProvider theme={theme}>
    <FilterProvider>

      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes />
        </Router>
      </Suspense>
      
    </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
