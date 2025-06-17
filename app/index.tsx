// C:\Users\mnb09\Desktop\Temp\app\index.tsx

import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';
import { useAuth } from '../contexts/AuthContext';
import TabNavigator from '../navigation/TabNavigator';
import UserTypeSelectionScreen from '../screens/Auth/UserTypeSelectionScreen';

// app/index.tsx는 더 이상 네비게이터가 아닙니다.
// 로그인 후 보여줄 화면을 결정하는 단순한 컴포넌트입니다.
export default function Index() {
  const { userType } = useAuth();
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const videoRef = useRef(null);

  if (!isIntroFinished) {
    return (
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={require('../assets/videos/intro.mp4')}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (
              status.isLoaded &&
              (status as AVPlaybackStatusSuccess).didJustFinish
            ) {
              setIsIntroFinished(true);
            }
          }}
          style={styles.video}
        />
      </View>
    );
  }

  // 백엔드로부터 받은 userType이 아직 visitor이면 유형 선택 화면을 보여줍니다.
  if (userType === 'visitor') {
    return <UserTypeSelectionScreen />;
  }

  // userType이 resident 또는 business_owner 등으로 설정되었다면,
  // 메인 탭 네비게이터를 보여줍니다.
  return <TabNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
});
