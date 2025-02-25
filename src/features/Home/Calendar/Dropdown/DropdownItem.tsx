import * as s from './style.css';
import { DropdownCheckIcon } from 'features/Home/ui';

interface DropdownItemProps {
  item: { id: number; name: string; color?: string };
  isSelected: boolean;
  onSelect: (id: number, name: string) => void;
}

const DropdownItem = ({ item, isSelected, onSelect }: DropdownItemProps) => {
  return (
    <div
      className={s.dropdownItem}
      onClick={() => onSelect(item.id, item.name)}
    >
      <DropdownCheckIcon
        style={{ visibility: isSelected ? 'visible' : 'hidden' }}
      />
      {item.color && (
        <div
          className={s.dropdownColorBox}
          style={{ backgroundColor: item.color }}
        />
      )}
      <div className={s.dropdownText}>{item.name}</div>
    </div>
  );
};

export default DropdownItem;
