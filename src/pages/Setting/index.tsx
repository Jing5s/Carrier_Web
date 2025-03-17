import { useEffect, useMemo, useState } from 'react';
import * as s from './style.css';
import SettingIcon from 'pages/Setting/ui/SettingIcon';
import EditContainer from 'features/Setting/EditContainer';
import LogoutModal from 'features/Setting/LogoutModal';
import useUser from 'features/user/hooks/useUser';
import {
  useUpdateUserInfo,
  useUpdateUserPictrue,
} from 'features/user/services/user.mutation';
import { useAlarmTimeMutation } from 'features/AlaramTime/services/time.mutation';

const Setting = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const toggleModal = () => setIsOpenedModal(true);

  const { user } = useUser();
  const { mutate: updateUserInfoMutate } = useUpdateUserInfo();
  const { mutate: updateUserPictureMutate } = useUpdateUserPictrue();
  const { mutate: updateAlarmTimeMutate } = useAlarmTimeMutation();

  const [userInfos, setUserInfos] = useState<{
    name: string;
    email: string;
    profileImage: string | File;
    notificationTime: string;
  }>({
    name: user?.nickname || '',
    email: user?.email || '',
    profileImage: user?.picture || '',
    notificationTime: user?.notificationTime || '',
  });

  const [time, setTime] = useState(['', '', '', '']);

  const parseNotificationTime = (timeString: string) => {
    if (!timeString) return ['', '', '', ''];
    const [mm, ss] = timeString.split(':');
    return [mm[0] || '', mm[1] || '', ss[0] || '', ss[1] || ''];
  };

  useEffect(() => {
    document.body.style.overflow = isOpenedModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpenedModal]);

  useEffect(() => {
    if (user) {
      setUserInfos((prev) => ({
        ...prev,
        name: user.nickname || '',
        email: user.email || '',
        profileImage: user.picture || '',
        notificationTime: user.notificationTime || '',
      }));

      setTime(parseNotificationTime(user.notificationTime || ''));
    }
  }, [user]);

  const formatTime = useMemo(() => {
    return time[0] + time[1] + ':' + time[2] + time[3];
  }, [time]);

  const isButtonDisabled = useMemo(() => {
    return (
      user.nickname === userInfos.name &&
      user.notificationTime === formatTime &&
      user.picture === userInfos.profileImage
    );
  }, [user, userInfos, formatTime]);

  const handleSave = () => {
    if (user.notificationTime !== userInfos.notificationTime) {
      updateAlarmTimeMutate(formatTime);
    }
    if (user.nickname !== userInfos.name) {
      updateUserInfoMutate(userInfos.name);
    }
    if (userInfos.profileImage instanceof File) {
      const formData = new FormData();
      formData.append('picture', userInfos.profileImage);
      updateUserPictureMutate(formData);
    }
  };

  return (
    <main className={s.container}>
      <header className={s.header}>
        <div className={s.userInfos}>
          <label htmlFor="profile-upload">
            <img
              src={
                typeof userInfos.profileImage === 'string'
                  ? userInfos.profileImage
                  : URL.createObjectURL(userInfos.profileImage)
              }
              alt="프로필 사진"
              className={s.headerProfileImg}
            />
          </label>
          <input
            type="file"
            id="profile-upload"
            style={{ display: 'none' }}
            accept="image/*"
          />
          <div className={s.textBox}>
            <p className={s.nameText}>{userInfos.name}</p>
            <p className={s.emailText}>{userInfos.email}</p>
          </div>
        </div>
        <button
          className={s.button({
            type: isButtonDisabled ? 'disabled' : 'enabled',
          })}
          onClick={handleSave}
          disabled={isButtonDisabled}
        >
          저장하기
        </button>
      </header>
      <div className={s.mainContent}>
        <div className={s.menuList}>
          <div className={s.menu}>
            <SettingIcon />
            <p className={s.menuText}>설정</p>
          </div>
        </div>
        <EditContainer
          toggleModal={toggleModal}
          userInfos={userInfos}
          setUserInfos={setUserInfos}
          time={time}
          setTime={setTime}
        />
      </div>
      {isOpenedModal && (
        <LogoutModal
          toggleCloseModal={() => {
            setIsOpenedModal(false);
          }}
        />
      )}
    </main>
  );
};

export default Setting;
