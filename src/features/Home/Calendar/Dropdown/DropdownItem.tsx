import * as s from './style.css';
import { DropdownCheckIcon } from 'features/Home/ui';

interface DropdownItemProps {
  item: { value: string; label: string; color?: string };
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const DropdownItem = ({ item, isSelected, onSelect }: DropdownItemProps) => {
  return (
    <div className={s.dropdownItem} onClick={() => onSelect(item.value)}>
      <DropdownCheckIcon
        style={{ visibility: isSelected ? 'visible' : 'hidden' }}
      />
      {item.color && (
        <div
          className={s.dropdownColorBox}
          style={{ backgroundColor: item.color }}
        />
      )}
      <div className={s.dropdownText}>{item.label}</div>
    </div>
  );
};

export default DropdownItem;
