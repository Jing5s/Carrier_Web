import { useEffect } from 'react';
import * as s from './style.css';
import useDropdown from './dropdown.hook.ts';
import DropdownItem from './DropdownItem.tsx';
import { Arrow } from 'shared/icons';

type DropdownItemType =
  | { id: number; name: string; color: string; value?: never }
  | { id: number; name: string; value: string; color?: never };

interface DropdownProps {
  id: number;
  name?: string;
  data: DropdownItemType[];
  onChange: (id: number, name: string) => void;
}

const EventDropdown = ({ id, data, onChange }: DropdownProps) => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();

  const selectedItem = data.find((item) => item.id === id) ?? data[0];
  const selectedLabel = selectedItem ? selectedItem.name : '에러';

  useEffect(() => {
    if (!id && data.length > 0) {
      const firstItem = data[0];
      onChange(
        firstItem.id,
        'value' in firstItem ? (firstItem.value ?? '') : firstItem.name
      );
    }
  }, [id, data, onChange]);

  return (
    <div>
      <div className={s.dropdownBtn} onClick={toggleDropdown}>
        {'color' in selectedItem && (
          <div
            className={s.dropdownColorBox}
            style={{ backgroundColor: selectedItem.color }}
          />
        )}
        <div className={s.dropdownText}>{selectedLabel}</div>
        <Arrow direction={isOpen ? 'up' : 'down'} />
      </div>

      {isOpen && (
        <div className={s.dropdownContainer}>
          {data.map((item) => (
            <DropdownItem
              key={item.id}
              item={item}
              isSelected={item.id === id}
              onSelect={(selectedId, selectedValueOrName) => {
                onChange(selectedId, selectedValueOrName);
                closeDropdown();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDropdown;
