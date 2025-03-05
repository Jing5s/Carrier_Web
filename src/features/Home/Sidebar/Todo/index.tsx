import { useEffect, useState } from 'react';
import { Arrow } from 'shared/icons';
import { TodoNormalIcon, TodoCheckedIcon } from 'features/Home/ui';
import * as s from './style.css';
import { useQueryClient } from '@tanstack/react-query';
import {
  ChangeDateToDash,
  NowDatePeriod,
  getNextDate,
  getPrevDate,
} from 'shared/lib/date';
import { usePatchTodoMutation } from 'features/Home/services/home.mutation';
import { todoQuery } from 'features/Home/services/home.query';

interface TodoItem {
  id: number;
  title: string;
  isDone: boolean;
}

const Todo = () => {
  const queryClient = useQueryClient();
  const NowDate = NowDatePeriod;
  const [date, setDate] = useState(NowDate);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    try {
      const fetchTodos = async () => {
        const data = await queryClient.fetchQuery(
          todoQuery.getTodo(ChangeDateToDash(date))
        );
        setTodoItems(data);
      };
      fetchTodos();
    } catch (error) {
      console.error('에러 발생:', error);
    }
  }, [queryClient, date]);

  const { mutate } = usePatchTodoMutation();
  const handleToggle = async (id: number) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
    mutate(id);
  };

  const handlePrevDate = () => {
    setDate(getPrevDate(date));
  };

  const handleNextDate = () => {
    setDate(getNextDate(date));
  };

  return (
    <div className={s.TodoListContainer}>
      <div className={s.TodoListHeader}>
        <div className={s.TodoListTitle}>해야할 것</div>
        <div className={s.TodoListSetDate}>
          <Arrow direction="left" onClick={handlePrevDate} />
          <div className={s.TodoListDateTitle}>{date}</div>
          <Arrow direction="right" onClick={handleNextDate} />
        </div>
      </div>
      <div className={s.TodoListMain}>
        {todoItems.map((item) => (
          <div
            key={item.id}
            className={s.TodoListItem}
            onClick={() => handleToggle(item.id)}
          >
            {item.isDone ? <TodoCheckedIcon /> : <TodoNormalIcon />}
            <span className={s.TodoListItemText}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
