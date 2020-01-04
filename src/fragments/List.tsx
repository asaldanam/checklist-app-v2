import React, { useCallback } from 'react';
import { animated, useSprings } from 'react-spring';
import { Box } from 'reflexbox';
import UIListItem from 'components/UIListItem';
import UIEmptyState from 'components/UIEmptyState';
import useGlobalFilter from 'core/filterContext';
import { fire, useProductList } from 'core/firebase';
import UIButton from 'components/UIButton';
import { generateTags } from 'core/utils';

const List: React.FC = () => {
  const [filter, setFilter] = useGlobalFilter();
  const [collection, loading, error] = useProductList(filter);

  const items = collection.list;
  const query = collection.query;

  const animations = useSprings(items.length, items?.map((item: any, index: number) => ({
    delay: index * 25,
    from: { opacity: 0 },
    to: { opacity: 1 }
  })));

  const handleCheck = useCallback(([id, state]) => {
    const onList = Boolean(filter) && !state;
    filter 
      ? fire.updateItem('lzCiykDQBPMjr1rCBCZK', id, onList)
      : setTimeout(() => { fire.updateItem('lzCiykDQBPMjr1rCBCZK', id, onList) }, 1000)
  }, [filter])

  const handleAdd = useCallback(() => {
    console.log(filter);
    fire.addProduct('lzCiykDQBPMjr1rCBCZK', {
      name: filter,
      onList: true,
      tags: generateTags(filter) 
    });
    setFilter('')
  }, [filter, setFilter])

  console.log({items, loading, error, query});
  
  return (
    <React.Fragment>
      <Box pt={4}>
        <React.Fragment>

          {items.length > 0 && query === 'list' &&  items.map((item, index) => 
            <animated.div key={item.id} style={{...animations[index], willChange: 'opacity, transform'}}>
              <UIListItem 
                id={item.id} 
                text={item.name} 
                type={query}
                checked={query === 'product' ? item.onList : !item.onList}
                onChecked={handleCheck}
              />
            </animated.div>
          )}

          {items.length > 0 && query === 'product' && items.map((item, index) => 
            <div key={item.id}>
              <UIListItem 
                id={item.id} 
                text={item.name} 
                type={query}
                checked={item.onList}
                onChecked={handleCheck}
              />
            </div>
          )}

          <UIEmptyState
            show={items.length === 0 && query === 'list'}
            image={'empty-bag'} 
            title={'Lista de la compra vacía'}
            subtitle={'Busca un producto y añádelo a tu lista de la compra '}
          />

          <UIEmptyState
            show={items.length === 0 && query === 'product'}
            image={'not-found'} 
            title={'Producto no encontrado'}
            subtitle={'Busca otro o añade tu búsqueda a la lista de productos '}
          >
            <UIButton onClick={handleAdd}>Añadir a la lista</UIButton>
          </UIEmptyState>

        </React.Fragment>
      </Box>
    </React.Fragment>
  )
  
}

export default React.memo(List);