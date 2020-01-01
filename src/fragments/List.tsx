import React, { useCallback } from 'react';
import { animated, useSprings } from 'react-spring';
import { Box } from 'reflexbox';
import UIListItem from 'components/UIListItem';
import useGlobalFilter from 'core/filterContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { fire } from 'core/firebase';
import 'firebase/firestore';
const FilteredList: React.FC<{items: any}> = React.memo(({items}) => {

  // const [filter] = useGlobalFilter();

  const animations = useSprings(items?.length, items?.map((item: any, index: number) => (
    {
      delay: 850 + (index * 30),
      from: {transform: 'translateY(15px)', opacity: 0},
      to: {transform: 'translateY(0)', opacity: 1}
    }
  )));

  const handleCheck = useCallback((id) => { 
    setTimeout(() => {
      fire.updateItem('lzCiykDQBPMjr1rCBCZK', id, false)
        .then(data => console.log('success', data))
        .catch(err => console.error('error', err))
    }, 1000)
  }, [])

  // const query = () => {
  //   items.forEach(item => {
  //     console.log('waiting...');
  //     fire.updateItem('lzCiykDQBPMjr1rCBCZK', item.id, false)
  //       .then(data => console.log('success', data))
  //       .catch(err => console.error('error', err))
  //   })
  // }

  return (
    <React.Fragment>
      {/* <button onClick={query}>query</button> */}
      {items.map((item, index) => 
        <animated.div key={item.id} style={{...animations[index], willChange: 'opacity, transform'}}>
          <UIListItem id={item.id} text={item.name} onChecked={handleCheck} checked={false}/>
        </animated.div>
      )}
    </React.Fragment>
  )
});

const List: React.FC = () => {
  const [collection] = useCollection(fire.getList('lzCiykDQBPMjr1rCBCZK'));

  const mappedItems = collection?.docs
    .map<any>(doc => ({id: doc.id, ...doc.data()}))
    || [];

  console.log('List', mappedItems)

  return (
    <React.Fragment>
      <Box pt={4}>
        <FilteredList items={mappedItems}/>
      </Box>
    </React.Fragment>
  )
  
}

export default React.memo(List);