import React, { useCallback, useEffect, useState } from 'react';
import { animated, useSprings } from 'react-spring';
import { Box } from 'reflexbox';
import UIListItem from 'components/UIListItem';
import UIEmptyState from 'components/UIEmptyState';
import useGlobalFilter from 'core/filterContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { fire } from 'core/firebase';

const List: React.FC = () => {
  const [filter] = useGlobalFilter();
  const [collection] = useCollection(fire.getProductList('lzCiykDQBPMjr1rCBCZK', filter));

  const mappedItems = collection?.docs
    .map<any>(doc => ({id: doc.id, ...doc.data()}))
    || [];


  const animations = useSprings(mappedItems?.length, mappedItems?.map((item: any, index: number) => (
    {
      delay: index * 25,
      from: { opacity: 0 },
      to: { opacity: 1 }
    }
  )));

  const handleCheck = useCallback(([id, state]) => {
    const onList = Boolean(filter) && !state;
    filter 
      ? fire.updateItem('lzCiykDQBPMjr1rCBCZK', id, onList)
      : setTimeout(() => { fire.updateItem('lzCiykDQBPMjr1rCBCZK', id, onList) }, 1000)
  }, [filter])

  // console.log(mappedItems, animations);

  return (
    <React.Fragment>
      <Box pt={4}>
        <React.Fragment>
          {collection?.docs.length > 0 && mappedItems.map((item, index) => 
            <animated.div key={item.id} style={{...animations[index], willChange: 'opacity, transform'}}>
              <UIListItem 
                id={item.id} 
                text={item.name} 
                type={filter ? 'product' : 'list'}
                checked={filter && item.onList}
                onChecked={handleCheck}
              />
            </animated.div>
          )}

          {collection?.docs.length === 0 && !filter && 
            <UIEmptyState />
          }
        </React.Fragment>
      </Box>
    </React.Fragment>
  )
  
}

export default React.memo(List);