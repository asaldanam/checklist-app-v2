import React, { Suspense } from 'react';
import 'App.scss';
import { BrowserRouter as Router, Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import UIRouterAnimations from 'components/UIRouterAnimations/UIRouterAnimations';

import ViewSignIn from './views/ViewSignIn'
import ViewMain from './views/ViewMain'
import { FilterProvider } from 'core/filterContext';
import Theme from 'core/theme';

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

  return (
    <ThemeProvider theme={Theme}>
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
