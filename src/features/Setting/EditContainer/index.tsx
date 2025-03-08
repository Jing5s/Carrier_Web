import { useRef } from 'react';
import * as s from './style.css';
import PencilIcon from 'pages/Setting/ui/PencilIcon';
import TimePicker from 'shared/components/TimePicker';

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
      />
    </div>
  );
};

interface EditContainerProps {
  toggleModal: () => void;
  userInfos: {
    name: string;
    email: string;
    profileImage: string;
    notificationTime: string;
  };
  setUserInfos: (userInfos: {
    name: string;
    email: string;
    profileImage: string;
    notificationTime: string;
  }) => void;
  time: string[];
  setTime: (time: string[]) => void;
}

const EditContainer = ({
  toggleModal,
  userInfos,
  setUserInfos,
  time,
  setTime,
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfos({
          ...userInfos,
          profileImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
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
            style={{ backgroundImage: `url(${userInfos.profileImage})` }}
            onClick={triggerFileSelect}
          >
            <PencilIcon />
            클릭하여 수정하기
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
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
        <p className={s.categoryText}>로그아웃 또는 계정탈퇴</p>
        <p className={s.explainText}>
          이곳에서는 로그아웃을 진행할 수 있으며, 로그아웃 후에도 계정 정보는
          유지되며 언제든지 다시 로그인할 수 있습니다.
        </p>
        <button className={s.logoutButton} onClick={toggleModal}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default EditContainer;
