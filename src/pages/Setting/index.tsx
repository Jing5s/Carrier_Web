import { useEffect, useMemo, useState } from 'react';
import * as s from './style.css';
import SettingIcon from 'pages/Setting/ui/SettingIcon';
import EditContainer from 'features/Setting/EditContainer';
import CheckModal from 'features/Setting/CheckModal';
import useUser from 'features/user/hooks/useUser';
import {
  useUpdateUserInfo,
  useUpdateUserPicture,
  useUserSecession,
} from 'features/user/services/user.mutation';
import { useAlarmTimeMutation } from 'features/AlaramTime/services/time.mutation';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from 'features/auth/services/auth.mutation';
import { useQueryClient } from '@tanstack/react-query';
import { userKeys } from 'features/user/services/user.keys';
const Setting = () => {
  const [isOpenedModal, setIsOpenedModal] = useState<
    'Logout' | 'Warning' | 'Secession' | false
  >(false);

  const queryClient = useQueryClient();

  const { user } = useUser();
  const { mutate: updateUserInfoMutate } = useUpdateUserInfo();
  const {
    mutate: updateUserPictureMutate,
    isPending: updateUserPicturePending,
  } = useUpdateUserPicture();
  const { mutate: updateAlarmTimeMutate } = useAlarmTimeMutation();
  const { mutate: deleteSecession } = useUserSecession();

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

  const handleSave = async () => {
    const invalidateUserInfoQuery = () => {
      queryClient.invalidateQueries({ queryKey: [userKeys.userInfo] });
    };

    if (user.notificationTime !== formatTime) {
      await updateAlarmTimeMutate(formatTime, {
        onSuccess: invalidateUserInfoQuery,
      });
    }

    if (user.nickname !== userInfos.name) {
      await updateUserInfoMutate(userInfos.name, {
        onSuccess: invalidateUserInfoQuery,
      });
    }

    if (userInfos.profileImage instanceof File) {
      const formData = new FormData();
      formData.append('picture', userInfos.profileImage);
      await updateUserPictureMutate(formData, {
        onSuccess: invalidateUserInfoQuery,
      });
    }
  };

  const navigate = useNavigate();
  const { mutate: logoutMutate } = useLogoutMutation();

  // 브라우저 뒤로가기 경고창
  useEffect(() => {
    const handleBlockNavigation = (event: Event) => {
      if (!isButtonDisabled) {
        event.preventDefault();
        setIsOpenedModal('Warning');
        navigate(1);
        return;
      }
      navigate(-1);
    };

    window.addEventListener('popstate', handleBlockNavigation);

    return () => {
      window.removeEventListener('popstate', handleBlockNavigation);
    };
  }, [isButtonDisabled, navigate]);

  const handleVerification = () => {
    if (isOpenedModal === 'Logout') {
      logoutMutate();
    }
    if (isOpenedModal === 'Secession') {
      deleteSecession();
    }
    if (isOpenedModal === 'Warning') {
      navigate(-1);
    }
    setIsOpenedModal(false);
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
          toggleModal={setIsOpenedModal}
          userInfos={userInfos}
          setUserInfos={setUserInfos}
          time={time}
          setTime={setTime}
          isPending={updateUserPicturePending}
        />
      </div>
      {isOpenedModal && (
        <CheckModal
          toggleCloseModal={() => {
            setIsOpenedModal(false);
          }}
          verification={handleVerification}
          type={isOpenedModal}
          text={
            isOpenedModal === 'Logout'
              ? '정말 로그아웃하시겠습니까?'
              : isOpenedModal === 'Warning'
                ? '저장하지 않은 변경 사항이 있습니다. 페이지를 떠나시겠습니까?'
                : '정말로 계정 탈퇴를 진행하시겠습니까? 계속 진행하려면 아래 입력란에 “계정 탈퇴"를 입력해주세요'
          }
        />
      )}
    </main>
  );
};

export default Setting;
