import { useEffect, useState } from 'react';
import * as s from './style.css';
import { CategoryPlusIcon, CategoryItemIcon } from 'features/Home/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateCategoryMutation } from 'features/Home/services/home.mutation';
import { categoryQuery } from 'features/Home/services/home.query';

/* eslint-disable no-console */

const CategoryColor = ['RED', 'GREEN', 'BLUE', 'PURPLE', 'BROWN', 'ROSE'];

const Category = () => {
  const { mutate } = useCreateCategoryMutation();
  const queryClient = useQueryClient();
  const [categoryData, setCategoryData] = useState<
    { id: number; name: string; color: string; active: boolean }[]
  >([]);
  const [newCategory, setNewCategory] = useState<string>('카테고리');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      const fetchCategory = async () => {
        const data = await queryClient.fetchQuery(
          categoryQuery.getCategories()
        );
        setCategoryData(data);
      };
      fetchCategory();
    } catch (error) {
      console.error('에러 발생:', error);
    }
  }, [queryClient, mutate]);

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCategoryData([
        ...categoryData,
        {
          id: categoryData.length + 1,
          name: newCategory,
          color: CategoryColor[categoryData.length],
          active: true,
        },
      ]);
      mutate({ name: newCategory, color: CategoryColor[categoryData.length] });
      setNewCategory('카테고리');
      setIsOpenModal(false);
    }
  };

  return (
    <div className={s.CategoryContainer}>
      <div className={s.CategoryHeader}>
        <div className={s.CategoryTitle}>카테고리</div>
        <div
          className={s.CategoryPlusBtn}
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          <CategoryPlusIcon />
        </div>
      </div>
      <div className={s.CategoryItemContainer}>
        {categoryData?.map(
          (category: {
            id: number;
            name: string;
            color: string;
            active: boolean;
          }) => (
            <div className={s.CategoryItem} key={category.id}>
              <CategoryItemIcon
                initialBgColor={category.color}
                activeState={category.active}
                id={category.id}
              />
              <div className={s.CategoryItemTitle}>{category.name}</div>
            </div>
          )
        )}
        {isOpenModal && (
          <div className={`${s.CategoryNewItem} ${s.CategoryItem}`}>
            <CategoryItemIcon
              initialBgColor={CategoryColor[categoryData.length]}
              activeState={true}
            />
            <div className={s.CategoryItemTitle}>
              <input
                className={`${s.CategoryItemTitle} ${s.CategoryNewItemInput}`}
                value={newCategory}
                onChange={(e) => setNewCategory(e.currentTarget.value)}
                onKeyDown={(e) => activeEnter(e)}
                autoFocus
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
