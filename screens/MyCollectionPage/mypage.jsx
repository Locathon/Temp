// app/mypage.tsx
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react'; // React import 추가
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const MyPageScreen = () => {
  const router = useRouter();

  // ✅ 더미 로그인 상태와 사용자 정보 (나중에 Context 또는 API 연동으로 대체 예정)
  const isLoggedIn = true;
  const userNickname = '느린행궁러버';
  const userProfileImageUrl = null;

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: () => {
          // TODO: logout 함수 실제 구현 필요
          Alert.alert('로그아웃', '로그아웃 되었습니다.');
          router.replace('/login');
        },
      },
    ]);
  };

  const activityStats = {
    places: isLoggedIn ? 12 : 0,
    courses: isLoggedIn ? 5 : 0,
    reviews: isLoggedIn ? 8 : 0,
  };

  const menuItems = [
    { id: 'reviews', title: '내가 남긴 후기', icon: 'chatbubble-ellipses-outline', screen: '/my-reviews', count: activityStats.reviews },
    { id: 'places', title: '내가 기록한 장소', icon: 'location-outline', screen: '/my-places', count: activityStats.places },
    { id: 'courses', title: '내가 기록한 코스', icon: 'map-outline', screen: '/my-courses', count: activityStats.courses },
    { id: 'guide', title: '행궁 사용 설명서', icon: 'book-outline', screen: '/guide' },
    { id: 'settings', title: '앱 설정', icon: 'settings-outline', screen: '/settings' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileSection}>
          {isLoggedIn && userNickname ? ( // 이제 Context의 isLoggedIn과 userNickname을 사용합니다.
            <>
              {userProfileImageUrl ? (
                <Image source={{ uri: userProfileImageUrl }} style={styles.profileImage} />
              ) : (
                <Ionicons name="person-circle" size={70} color="#BDBDBD" style={styles.profileIcon} />
              )}
              <Text style={styles.nickname}>{userNickname}님</Text> {/* Context에서 가져온 닉네임 */}
              <Link href="/edit-profile" asChild>
                <TouchableOpacity style={styles.editProfileButton}>
                  <Text style={styles.editProfileButtonText}>내 정보 수정</Text>
                  <Ionicons name="chevron-forward-outline" size={16} color="#828282" />
                </TouchableOpacity>
              </Link>
            </>
          ) : (
            <>
              <Ionicons name="person-circle" size={70} color="#BDBDBD" style={styles.profileIcon} />
              <Text style={styles.loginPrompt}>로그인이 필요합니다.</Text>
              <Link href="/login" asChild>
                <TouchableOpacity style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>로그인 / 회원가입</Text>
                </TouchableOpacity>
              </Link>
            </>
          )}
        </View>

        {isLoggedIn && ( // Context의 isLoggedIn 상태에 따라 활동 내역 표시
          <View style={styles.activitySection}>
            {menuItems.slice(0, 3).map((item) => (
              <Link key={item.id} href={item.screen} asChild>
                <TouchableOpacity style={styles.activityItem}>
                  <View style={styles.activityTextContainer}>
                    <Ionicons name={item.icon} size={22} color="#4F4F4F" style={styles.activityIcon} />
                    <Text style={styles.activityTitle}>{item.title}</Text>
                  </View>
                  <View style={styles.activityCountContainer}>
                    <Text style={styles.activityCount}>{item.count ?? 0}</Text>
                    <Ionicons name="chevron-forward-outline" size={20} color="#C7C7CC" />
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        )}

        <View style={styles.menuListSection}>
          {menuItems.slice(3).map((item) => (
             <Link key={item.id} href={isLoggedIn || item.id === 'guide' ? item.screen : '/login'} asChild>
              <TouchableOpacity style={styles.menuListItem}>
                <Ionicons name={item.icon} size={24} color="#4F4F4F" style={styles.menuListIcon} />
                <Text style={styles.menuListText}>{item.title}</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
          ))}
          {isLoggedIn && ( // Context의 isLoggedIn 상태에 따라 로그아웃 버튼 표시
            <TouchableOpacity style={styles.menuListItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#EB5757" style={styles.menuListIcon} />
              <Text style={[styles.menuListText, styles.logoutText]}>로그아웃</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
  },
  profileIcon: {
    marginBottom: 12,
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  editProfileButtonText: {
    fontSize: 14,
    color: '#828282',
    marginRight: 4,
  },
  loginPrompt: {
    fontSize: 17,
    color: '#4F4F4F',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  activitySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  activityTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 16,
    color: '#333333',
  },
  activityCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityCount: {
    fontSize: 16,
    color: '#828282',
    marginRight: 4,
  },
  menuListSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  menuListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  menuListIcon: {
    marginRight: 12,
  },
  menuListText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  logoutText: {
    color: '#EB5757',
  },
});

export default MyPageScreen;
