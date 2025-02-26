import { useState } from 'react';

const useModal = <T extends string>() => {
  const [modals, setModals] = useState<Record<T, boolean>>(
    {} as Record<T, boolean>
  );

  const openModal = (key: T) => {
    setModals((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const closeModal = (key: T) => {
    setModals((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const isOpen = (key: T) => modals[key] ?? false;

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
