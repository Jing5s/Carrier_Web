import { Sidebar, Content } from 'features/Mail';
import * as s from './style.css';
import { useState } from 'react';

const Mail = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <div className={s.container}>
      <Sidebar />
      <Content modalOpen={isModalOpened} toggleModalOpen={setIsModalOpened} />
    </div>
  );
};

export default Mail;
