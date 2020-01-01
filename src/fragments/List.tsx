import React, { useCallback, useState, useEffect } from 'react';
import { animated, useSprings } from 'react-spring';
import { Box } from 'reflexbox';
import UIListItem from 'components/UIListItem';
import useGlobalFilter, { FilterProvider } from 'core/filterContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { fire } from 'core/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

// const FilteredList: React.FC<{items: any}> = React.memo(({items}) => {
//   const query = () => {
//     items.forEach(item => {
//       // console.log(item.name, tags);
//       firebase.firestore()
//         .collection('Lists')
//         .doc('lzCiykDQBPMjr1rCBCZK')
//         .collection('Products')
//         .doc(item.id)
//         .update({'tags': tags})
//         .then(data => console.log('success', data));
//     })
//   }

//   return (
//     <React.Fragment>
//       {/* <button onClick={query}>query</button> */}
//       {items.map((item, index) => 
//         <animated.div key={item.id} style={{...animations[index], willChange: 'opacity, transform'}}>
//           <UIListItem id={item.id} text={item.name} onChecked={handleCheck} checked={false}/>
//         </animated.div>
//       )}
//     </React.Fragment>
//   )
// });

const List: React.FC = React.memo(() => {
  const [filter] = useGlobalFilter();
  const [collection, loading, error] = useCollection(fire.getProductList('lzCiykDQBPMjr1rCBCZK', filter));
  const mappedItems = collection?.docs
    .map<any>(doc => ({id: doc.id, ...doc.data()}))
    || [];

  const animations = useSprings(mappedItems?.length, mappedItems?.map((item: any, index: number) => (
    {
      delay: 850 + (index * 30),
      from: !filter
        ? {transform: 'translateY(15px)', opacity: 0}
        : {transform: 'translateY(0)', opacity: 1},
      to: {transform: 'translateY(0)', opacity: 1}
    }
  )));

  const handleCheck = useCallback(([id, state]) => { 
    setTimeout(() => {
      fire.updateItem('lzCiykDQBPMjr1rCBCZK', id, !state)
    }, 1000)
  }, [])

  return (
    <React.Fragment>
      <Box pt={4}>
        <React.Fragment>
          {mappedItems.map((item, index) => 
            <animated.div key={item.id} style={{...animations[index], willChange: 'opacity, transform'}}>
              <UIListItem id={item.id} text={item.name} onChecked={handleCheck} checked={false}/>
            </animated.div>
          )}
        </React.Fragment>
      </Box>
    </React.Fragment>
  )
  
})

export default React.memo(List);