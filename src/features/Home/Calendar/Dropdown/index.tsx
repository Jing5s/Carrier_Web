import { useEffect } from 'react';
import * as s from './style.css';
import DropdownItem from './DropdownItem.tsx';
import useDropdown from './dropdown.hook.ts';
import { Arrow } from 'shared/icons';

interface Data {
  value: string;
  label: string;
  color?: string;
}

interface DropdownProps {
  label?: string;
  data: Data[];
  value?: string;
  onChange: (value: string, name: string) => void;
  name: string;
}

const EventDropdown = ({
  label,
  data,
  value,
  onChange,
  name,
}: DropdownProps) => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();

  useEffect(() => {
    if (!value && data.length > 0) {
      onChange(data[0].value, name);
    }
  }, [value, data, name, onChange]);

  const selectedItem = data.find((item) => item.value === value) || data[0];
  const selectedLabel = selectedItem?.label || '에러';

  return (
    <div>
      {label && <div>{label}</div>}
      <div className={s.dropdownBtn} onClick={toggleDropdown}>
        {selectedItem?.color ? (
          <div
            className={s.dropdownColorBox}
            style={{ backgroundColor: selectedItem.color }}
          />
        ) : (
          <div className={s.dropdownText}>{selectedLabel}</div>
        )}
        <Arrow direction={isOpen ? 'up' : 'down'} />
      </div>

      {isOpen && (
        <div className={s.dropdownContainer}>
          {data.map((item) => (
            <DropdownItem
              key={item.value}
              item={item}
              isSelected={item.value === value}
              onSelect={(selectedValue) => {
                onChange(selectedValue, name);
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
