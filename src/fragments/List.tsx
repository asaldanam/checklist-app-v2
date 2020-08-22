import React, { useCallback } from 'react';
import { animated, useSprings } from 'react-spring';
import { Box, Flex } from 'reflexbox';
import UIListItem from 'components/UIListItem';
import UIEmptyState from 'components/UIEmptyState';
import useGlobalFilter from 'core/filterContext';
import { fire, useProductList } from 'core/firebase';
import UIButton from 'components/UIButton';
import { generateTags } from 'core/utils';
import UIDeleteBar from 'components/UIDeleteBar';

const List: React.FC = () => {
  const [filter, setFilter] = useGlobalFilter();
  const [collection] = useProductList(filter);

  const items = collection.list;
  const query = collection.query;

  const animations = useSprings(items.length, items?.map((item: any, index: number) => ({
    delay: (index + 1) * 25,
    from: { opacity: 0, transform: 'translateY(10px)', willChange: 'opacity, transform' },
    to: { opacity: 1, transform: 'translateY(0)' }
  })));

  const handleCheck = useCallback(([id, checked]) => {
    fire.checkItem(fire.PROVISIONAL_listId, id, !checked)
  }, [])

  const handleToList = useCallback(([id, onList]) => {
    fire.toListItem(fire.PROVISIONAL_listId, id, !onList)
  }, [])

  const handleClearAll = useCallback(() => {
    const itemsIds = items.map((item: any) => item.id);
    fire.updateAllProducts(fire.PROVISIONAL_listId, itemsIds, 
      {
        onList: false,
        checked: false
      }
    );
  }, [items])

  const handleAdd = useCallback(() => {
    console.log(filter);
    fire.addProduct(fire.PROVISIONAL_listId, {
      name: filter,
      onList: true,
      tags: generateTags(filter) 
    });
    setFilter('')
  }, [filter, setFilter])

  const handleDelete = useCallback((itemId) => {
    console.log('delete', itemId);
    fire.deleteProduct(fire.PROVISIONAL_listId, itemId)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }, [])
  
  return (
    <React.Fragment>
      <Box pt={4}>
        <React.Fragment>

          {items.length > 0 && query === 'list' &&  items.map((item, index) => 
            <animated.div key={item.id} style={animations[index]}>
              <UIListItem 
                id={item.id} 
                text={item.name} 
                type={query}
                checked={item.checked}
                onChecked={handleCheck}
                onDelete={handleDelete}
              />
            </animated.div>
          )}

          {items.length > 0 && query === 'product' && items.map((item, index) => 
            <animated.div key={item.id} style={animations[index]}>
              <UIListItem 
                id={item.id} 
                text={item.name} 
                type={query}
                checked={item.onList}
                onChecked={handleToList}
                onDelete={handleDelete}
              />
            </animated.div>
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

          { items.length > 0 &&
            <UIDeleteBar
              confirm={query === 'list'}
              deleteTxt={query === 'product' ? 'Desmarcar todo' : 'Borrar lista'}
              onDelete={handleClearAll}
            />
          }

        </React.Fragment>
      </Box>
    </React.Fragment>
  )
  
}

export default React.memo(List);