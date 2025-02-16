import { useState } from 'react';
import { Arrow } from 'shared/icons';
import { TodoNormalIcon, TodoCheckedIcon } from 'features/Home/ui';
import * as s from './style.css';

interface TodoItem {
  id: number;
  text: string;
  checked: boolean;
}

const Todo = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    { id: 1, text: '미래랑 산책가기', checked: false },
    { id: 2, text: '하니 산책시키기', checked: true },
    { id: 3, text: '베이스 치기', checked: false },
  ]);

  const handleToggle = (id: number) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className={s.TodoListContainer}>
      <div className={s.TodoListHeader}>
        <div className={s.TodoListTitle}>해야할 것</div>
        <div className={s.TodoListSetDate}>
          <Arrow direction="left" />
          <div className={s.TodoListDateTitle}>2025.01.07</div>
          <Arrow direction="right" />
        </div>
      </div>
      <div className={s.TodoListMain}>
        {todoItems.map((item) => (
          <div
            key={item.id}
            className={s.TodoListItem}
            onClick={() => handleToggle(item.id)}
          >
            {item.checked ? <TodoCheckedIcon /> : <TodoNormalIcon />}
            <span className={s.TodoListItemText}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
