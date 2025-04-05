import { useRef } from 'react';
import * as s from './style.css';
import PencilIcon from 'pages/Setting/ui/PencilIcon';
import TimePicker from 'shared/components/TimePicker';
import { DotLoader } from 'react-spinners';
import theme from 'shared/styles/theme.css';

interface InputContainerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  readOnly: boolean;
}

const InputContainer = ({
  label,
  value,
  onChange,
  placeholder,
  readOnly,
}: InputContainerProps) => {
  return (
    <div className={s.inputContainer}>
      <label className={s.label}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={s.input}
        readOnly={readOnly}
        disabled={readOnly}
      />
    </div>
  );
};

interface EditContainerProps {
  toggleModal: (type: 'Logout' | 'Secession') => void;
  userInfos: {
    name: string;
    email: string;
    profileImage: string | File;
    notificationTime: string;
  };
  setUserInfos: (userInfos: {
    name: string;
    email: string;
    profileImage: string | File;
    notificationTime: string;
  }) => void;
  time: string[];
  setTime: (time: string[]) => void;
  isPending: boolean;
}

const EditContainer = ({
  toggleModal,
  userInfos,
  setUserInfos,
  time,
  setTime,
  isPending,
}: EditContainerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInfoChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfos({
        ...userInfos,
        [key]: e.target.value,
      });
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserInfos({
        ...userInfos,
        profileImage: file,
      });
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={s.container}>
      <div className={s.category}>
        <div className={s.categoryText}>프로필</div>
        <div className={s.profileContent}>
          <div className={s.profileContentLeft}>
            <p className={s.explainText}>
              사용자의 프로필을 관리하는 영역입니다. 이곳에서 해당 박스를 클릭해
              사용자의 이름, 이메일, 사진을 수정할 수 있습니다.
            </p>
            <InputContainer
              label="이름"
              value={userInfos.name}
              onChange={handleInfoChange('name')}
              placeholder="이름을 입력하세요"
              readOnly={false}
            />
            <InputContainer
              label="이메일"
              value={userInfos.email}
              onChange={handleInfoChange('email')}
              placeholder="이메일을 입력하세요"
              readOnly={true}
            />
          </div>
          <div
            className={s.profileImage}
            style={{
              backgroundImage: `url(${
                typeof userInfos.profileImage === 'string'
                  ? userInfos.profileImage
                  : URL.createObjectURL(userInfos.profileImage)
              })`,
            }}
            onClick={triggerFileSelect}
          >
            {isPending ? (
              <div className={s.imageInner}>
                <DotLoader color={theme.white} size={60} />
                <p className={s.innerText}>사진 업로드 중...</p>
              </div>
            ) : (
              <div className={s.imageInner}>
                <PencilIcon />
                <p className={s.innerText}>클릭하여 수정하기</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={s.category}>
        <p className={s.categoryText}>일정 요약 시간대</p>
        <p className={s.explainText}>
          일정 요약을 받는 시간대를 변경합니다. 이 설정은 추후에 언제든지 변경할
          수 있습니다.
        </p>
        <TimePicker time={time} onChange={setTime} />
      </div>
      <div className={s.category}>
        <p className={`${s.categoryText} ${s.colorRed}`}>로그아웃</p>
        <p className={s.explainText}>
          이곳에서는 로그아웃을 진행할 수 있으며, 로그아웃 후에도 계정 정보는
          유지되며 언제든지 다시 로그인할 수 있습니다.
        </p>
        <button
          className={s.logoutButton}
          onClick={() => toggleModal('Logout')}
        >
          로그아웃
        </button>
      </div>
      <div className={s.category}>
        <p className={`${s.categoryText} ${s.colorRed}`}>계정 탈퇴</p>
        <p className={s.explainText}>
          이곳에서 계정 탈퇴를 진행할 수 있습니다.
          <br />
          탈퇴 시 계정과 모든 데이터가 영구적으로 삭제되며, 복구할 수 없으니
          신중하게 결정해 주세요.
        </p>
        <button
          className={s.logoutButton}
          onClick={() => toggleModal('Secession')}
        >
          계정 탈퇴
        </button>
      </div>
    </div>
  );
};

export default EditContainer;
