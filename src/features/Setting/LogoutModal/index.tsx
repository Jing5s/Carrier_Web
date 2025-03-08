import { useLogoutMutation } from 'features/auth/services/auth.mutation';
import * as s from './style.css';

interface LogoutModalProps {
  toggleCloseModal: () => void;
}

const LogoutModal = ({ toggleCloseModal }: LogoutModalProps) => {
  const { mutate: logoutMutate } = useLogoutMutation();

  return (
    <div className={s.container}>
      <div className={s.modalContent}>
        <p className={s.explainText}>
          지금 나가시면 변경된 사항이 저장되지 않을 수 있습니다. 그래도
          나가시겠습니까?
        </p>
        <div className={s.buttons}>
          <div
            className={s.button({ type: 'cancel' })}
            onClick={toggleCloseModal}
          >
            취소
          </div>
          <div
            className={s.button({ type: 'leave' })}
            onClick={() => logoutMutate()}
          >
            나가기
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
