import 'App.scss';
import UIRouterAnimations from 'components/UIRouterAnimations/UIRouterAnimations';
import Theme from 'core/theme';
import { ThemeProvider } from 'emotion-theming';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import ViewMain from './views/ViewMain';
import ViewSignIn from './views/ViewSignIn';

import { fire } from 'core/firebase';
import { setUserAction } from 'core/redux';
import { useSelector, useDispatch } from 'react-redux'

const Routes = withRouter(({location, history}: RouteComponentProps) => {
  const user = useSelector(state => state.data.user);
  const dispatch = useDispatch()

  React.useEffect(() => {
    const userChangeSubscription = fire.onUserChange((auth) => {
      console.log('auth changes', auth)
      if (!user && auth) dispatch(setUserAction({
        name: auth.displayName,
        email: auth.email,
        photoUrl: auth.photoURL,
        emailVerified: auth.emailVerified,
        uid: auth.uid
      }))
    })
    return userChangeSubscription
  }, [dispatch, user]) 

  React.useEffect(() => {
    const path = history.location.pathname;

    if (path === '/login' && user && user.uid) {
      history.push('/')
    }
    
    else if (path === '/' && !user) {
      history.push('/login')
    } 

  }, [user, history])

  return (
    <UIRouterAnimations
      locationKey={location.key}
      action={history.action}
      path={location.pathname}
    >
      <Switch location={location}>
        <Route exact path={'/login'} component={ViewSignIn} />
        <Route exact path={'/'} component={ViewMain} />
      </Switch>
    </UIRouterAnimations>
  )
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes />
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
