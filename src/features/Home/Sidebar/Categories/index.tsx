import { useEffect, useState } from 'react';
import * as s from './style.css';
import { CategoryPlusIcon, CategoryItemIcon } from 'features/Home/ui';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCreateCategoryMutation,
  usePatchCategoryMutation,
} from 'features/Home/services/home.mutation';
import { useCategoryListQuery } from 'features/Home/services/home.query';
import type { Category } from 'entities/calendar/type';

/* eslint-disable no-console */

const CATEGORY_COLORS = [
  'RED',
  'GREEN',
  'BLUE',
  'PURPLE',
  'BROWN',
  'ROSE',
] as const;

const Categories = () => {
  const { mutate: createCategoryMutate } = useCreateCategoryMutation();
  const { mutate: updateCategoryMutate } = usePatchCategoryMutation();
  const queryClient = useQueryClient();
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>('카테고리');
  const [editCategoryName, setEditCategoryName] = useState<string>();
  const [editId, setEditId] = useState<number>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const fetchCategory = async () => {
        const data = await queryClient.fetchQuery(
          useCategoryListQuery.getCategoryList()
        );
        setCategoryData(data);
      };
      fetchCategory();
    } catch (error) {
      console.error('에러 발생:', error);
    }
  }, [queryClient]);

  const activeEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'create' | 'update',
    categoryId?: number
  ) => {
    if (e.key !== 'Enter') return;

    const trimmedName =
      type === 'create' ? newCategoryName.trim() : editCategoryName?.trim();

    if (!trimmedName) return;

    if (type === 'create') {
      const newCategoryColor =
        CATEGORY_COLORS[categoryData.length % CATEGORY_COLORS.length];

      const newCategory: Category = {
        id: categoryData.length + 1,
        name: trimmedName,
        color: newCategoryColor,
        active: true,
      };

      setCategoryData([...categoryData, newCategory]);
      createCategoryMutate({ name: trimmedName, color: newCategoryColor });

      setNewCategoryName('카테고리');
      setModalOpen(false);
    }

    if (type === 'update' && categoryId !== undefined) {
      const prevCategory = categoryData.find((c) => c.id === categoryId);
      if (!prevCategory) return;

      updateCategoryMutate({
        id: categoryId,
        name: trimmedName,
        color: prevCategory.color,
      });

      setCategoryData((prev) =>
        prev.map((cat) =>
          cat.id === categoryId ? { ...cat, name: trimmedName } : cat
        )
      );

      setEditId(undefined);
      setEditCategoryName(undefined);
    }
  };

  return (
    <div className={s.categoryContainer}>
      <div className={s.categoryHeader}>
        <div className={s.categoryTitle}>카테고리</div>
        <div
          className={s.categoryPlusBtn}
          onClick={() => setModalOpen(!isModalOpen)}
        >
          <CategoryPlusIcon />
        </div>
      </div>
      <div className={s.categoryItemContainer}>
        {categoryData?.map((category) => (
          <div className={s.categoryItem} key={category.id}>
            <CategoryItemIcon
              initialBgColor={category.color}
              activeState={category.active}
              id={category.id}
            />
            {editId === category.id ? (
              <input
                className={s.categoryItemInput}
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.currentTarget.value)}
                onKeyDown={(e) => activeEnter(e, 'update', category.id)}
                autoFocus
                onFocus={(e) => e.target.select()}
              />
            ) : (
              <div
                className={s.categoryItemTitle}
                onClick={() => {
                  setEditCategoryName(category.name);
                  setEditId(category.id);
                }}
              >
                {category.name}
              </div>
            )}
          </div>
        ))}
        {isModalOpen && (
          <div className={`${s.categoryNewItem} ${s.categoryItem}`}>
            <CategoryItemIcon
              initialBgColor={
                CATEGORY_COLORS[categoryData.length % CATEGORY_COLORS.length]
              }
              activeState={true}
            />
            <div className={s.categoryItemTitle}>
              <input
                className={`${s.categoryItemTitle} ${s.categoryNewItemInput}`}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.currentTarget.value)}
                onKeyDown={(e) => activeEnter(e, 'create')}
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

export default Categories;
