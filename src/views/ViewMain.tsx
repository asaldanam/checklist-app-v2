import React from 'react';
import 'firebase/auth';
import { useHistory } from 'react-router-dom'
import UIHeader from 'components/UIHeader';
import UIContent from 'components/UIContent';
import UIToolbar from 'components/UIToolbar/UIToolbar';
import SearchBar from 'fragments/SearcBar';
import List from 'fragments/List';

// const LazyToolbar = React.lazy(() => import('components/UIToolbar/UIToolbar'))
// const LazySearchBar = React.lazy(() => import('fragments/SearcBar'))
// const LazyList = React.lazy(() => import('fragments/List'))

const ViewSignIn: React.FC = () => {
  const history = useHistory();

  return (
    <React.Fragment>
      <UIHeader convexEnd>
        <UIToolbar onMenu={() => history.goBack()}> Mi lista </UIToolbar>
        <SearchBar />
      </UIHeader>
      <UIContent headerSize={'88px'} >
        <List />
      </UIContent>
    </React.Fragment>
  );
};

export default React.memo(ViewSignIn);