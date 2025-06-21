import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

// [핵심] API 통신 관련 로직이 모두 제거되어, 더 이상 UserProfile 타입이 필요 없습니다.

const MyPageScreen = () => {
  const navigation = useNavigation<any>();
  // [핵심] 로그인 여부와 로그아웃 기능만 가져옵니다.
  const { isLoggedIn, logout } = useAuth();

  // [핵심] API 요청 관련 상태(user, isLoading)를 모두 제거합니다.
  
  // [핵심] API를 호출하던 fetchUserInfo 함수와 useFocusEffect를 모두 제거합니다.

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          await logout();
          // 더 이상 user 상태를 초기화할 필요가 없습니다.
          Alert.alert('로그아웃', '로그아웃 되었습니다.');
        },
      },
    ]);
  };
  
  const navigateToLogin = () => {
    navigation.navigate('Auth', { screen: 'Login' });
  };

  // [핵심] 로딩 화면 로직을 제거하여, 즉시 화면을 보여줍니다.

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* [핵심] 오직 로그인 여부(isLoggedIn)만으로 화면을 결정합니다. */}
        {isLoggedIn ? (
          <>
            {/* 프로필 카드 */}
            <View style={styles.profileCard}>
              <View style={styles.profileInfoContainer}>
                <Image
                  source={require('../../assets/images/default-profile.png')}
                  style={styles.profileImage}
                />
                <View style={styles.profileTextContainer}>
                  {/* [핵심] API 데이터 대신, 고정된 상수 값으로 정보를 표시합니다. */}
                  <Text style={styles.profileName}>현재닉네임</Text>
                  <Text style={styles.profileId}>ID1234</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('edit_profile')}>
                  <Image source={require('../../assets/images/edit.png')} style={{width: 14, height: 16}} />
              </TouchableOpacity>
            </View>

            {/* 마이 컬렉션 버튼 */}
            <TouchableOpacity style={styles.myCollectionButton} onPress={() => navigation.navigate('MyCollection')}>
                <Image source={require('../../assets/images/MyCollection.png')} style={{width: 24, height: 24}} />
              <Text style={styles.myCollectionButtonText}>마이 컬렉션</Text>
            </TouchableOpacity>

            {/* 설정 */}
            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>설정</Text>
              <View style={styles.settingItemsContainer}>
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ResidentAuth')}>
                  <Text style={styles.settingItemText}>인증 설정</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('app-setting')}>
                  <Text style={styles.settingItemText}>앱 설정</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 고객센터 */}
            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>고객센터</Text>
              <View style={styles.settingItemsContainer}>
                <TouchableOpacity style={styles.settingItem}>
                  <Text style={styles.settingItemText}>의견 남기기</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('privacy')}>
                  <Text style={styles.settingItemText}>약관 및 정책 보기</Text>
                </TouchableOpacity>
              </View>
            </View>

             {/* 로그아웃 버튼 */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>로그아웃</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.loginPromptContainer}>
            <Text style={styles.loginPromptText}>로그인이 필요합니다.</Text>
            <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
              <Text style={styles.loginButtonText}>로그인/회원가입</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FEFEFE',
      },
      container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      header: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFEFE',
        borderBottomWidth: 1,
        borderBottomColor: '#EBEEEF'
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#121212',
        fontFamily: 'Pretendard-Regular',
      },
      profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 36,
        padding: 16,
        backgroundColor: '#FEFEFE',
        borderWidth: 1,
        borderColor: '#DCE2E4',
        borderRadius: 20,
        height: 120,
      },
      profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#006CA6',
      },
      profileTextContainer: {
        marginLeft: 16,
        gap: 4,
      },
      profileName: {
        fontSize: 20,
        fontWeight: '500',
        color: '#121212',
        fontFamily: 'Pretendard-Medium',
      },
      profileId: {
        fontSize: 16,
        fontWeight: '400',
        color: '#7E8B91',
        fontFamily: 'Pretendard-Regular',
      },
      editButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#48C8FF',
        justifyContent: 'center',
        alignItems: 'center',
      },
      myCollectionButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 16,
        height: 48,
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#EBEEEF',
        borderRadius: 12,
        gap: 16,
      },
      myCollectionButtonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#121212',
        fontFamily: 'Pretendard-Regular',
      },
      settingSection: {
        marginTop: 32,
        marginHorizontal: 16,
      },
      sectionTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#93A2A9',
        marginBottom: 8,
        fontFamily: 'Pretendard-Medium',
      },
      settingItemsContainer: {
        backgroundColor: '#FEFEFE',
        borderRadius: 12,
        overflow: 'hidden',
      },
      settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEFEFE',
        paddingHorizontal: 16,
        height: 48,
      },
      settingItemText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#121212',
        fontFamily: 'Pretendard-Regular',
      },
      separator: {
        height: 1,
        backgroundColor: '#DCE2E4',
      },
      loginPromptContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100, // 콘텐츠를 수직 중앙에 더 가깝게 배치
        paddingBottom: 100,
      },
      loginPromptText: {
        fontSize: 16,
        color: '#828282',
        marginBottom: 20,
        fontFamily: 'Pretendard-Regular',
      },
      loginButton: {
        backgroundColor: '#48C8FF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
      },
      loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Pretendard-Bold',
      },
      logoutButton: {
        margin: 16, // 좌우, 상하 여백을 한 번에 적용
        marginTop: 32,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#EBEEEF',
        borderRadius: 12,
      },
      logoutButtonText: {
        color: '#FF4D4F',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Pretendard-Regular'
      },
});

export default MyPageScreen;
