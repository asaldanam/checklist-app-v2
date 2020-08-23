import UIContent from 'components/UIContent';
import UIHeader from 'components/UIHeader';
import UIToolbar from 'components/UIToolbar/UIToolbar';
import { fire } from 'core/firebase';
import { setUserAction } from 'core/redux';
import 'firebase/auth';
import List from 'fragments/List';
import SearchBar from 'fragments/SearcBar';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const ViewSignIn: React.FC = () => {
  const dispatch = useDispatch();

  const goBack = useCallback(() => {
    fire.signOut()
      .then(() => {
        dispatch(setUserAction(null))
        console.log('logout sucess')
      })
      .catch((err) => console.error(err))
    }, [dispatch])

  return (
    <React.Fragment>
      <UIHeader convexEnd>
        <UIToolbar onMenu={goBack}> Mi lista </UIToolbar>
        <SearchBar />
      </UIHeader>
      <UIContent headerSize={'88px'} >
        <List />
      </UIContent>
    </React.Fragment>
  );
};

export default React.memo(ViewSignIn);