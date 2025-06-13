import { Ionicons } from '@expo/vector-icons';
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

// [오류 수정] 1. 메뉴 아이템에 대한 명확한 타입을 정의합니다.
// icon의 타입을 Ionicons가 가진 name들의 집합으로 지정하여 타입 안정성을 확보합니다.
type MenuItem = {
  id: string;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  count?: number; // 활동 통계에서만 사용되므로 optional '?' 처리
};

const MyPageScreen = () => {
  const navigation = useNavigation();
  const { isLoggedIn, logout } = useAuth();

  const userNickname = '느린행궁러버';
  const userProfileImageUrl = null;

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          await logout();
          Alert.alert('로그아웃', '로그아웃 되었습니다.');
        },
      },
    ]);
  };

  const activityStats = {
    places: isLoggedIn ? 12 : 0,
    courses: isLoggedIn ? 5 : 0,
    reviews: isLoggedIn ? 8 : 0,
  };
  
  // [오류 수정] 2. 정의한 MenuItem 타입을 배열에 적용합니다.
  const activityItems: MenuItem[] = [
    { id: 'my-courses', title: '내가 기록한 코스', icon: 'map-outline', count: activityStats.courses },
    { id: 'my-places', title: '내가 기록한 장소', icon: 'location-outline', count: activityStats.places },
    { id: 'my-reviews', title: '내가 남긴 후기', icon: 'chatbubble-ellipses-outline', count: activityStats.reviews },
  ];

  const settingItems: MenuItem[] = [
    { id: 'ResidentAuth', title: '주민 인증', icon: 'shield-checkmark-outline' },
    { id: 'settings', title: '설정', icon: 'settings-outline' },
    { id: 'guide', title: '이용 가이드', icon: 'book-outline' },
    { id: 'terms', title: '이용약관 및 정책', icon: 'document-text-outline' },
  ];

  // [오류 수정] 3. render 함수의 파라미터 타입을 'any' 대신 'MenuItem'으로 명확하게 지정합니다.
  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => navigation.navigate(item.id as never)}>
      <View style={styles.menuItemContent}>
        <Ionicons name={item.icon} size={22} color="#4F4F4F" style={styles.menuIcon} />
        <Text style={styles.menuTitle}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <Image
            source={userProfileImageUrl ? { uri: userProfileImageUrl } : { uri: 'https://placehold.co/60x60/EFEFEF/AAAAAA?text=P' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.nickname}>{isLoggedIn ? `${userNickname}님` : '로그인이 필요합니다'}</Text>
            {isLoggedIn && (
                <TouchableOpacity onPress={() => navigation.navigate('edit_profile' as never)}>
                    <Text style={styles.editProfileText}>프로필 수정 &gt;</Text>
                </TouchableOpacity>
            )}
          </View>
          {isLoggedIn && (
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="#828282" />
            </TouchableOpacity>
          )}
        </View>

        {/* 내 활동 섹션 */}
        <View style={styles.section}>
            <View style={styles.activityRow}>
                {activityItems.map(item => (
                    <TouchableOpacity key={item.id} style={styles.activityItem} onPress={() => navigation.navigate(item.id as never)}>
                        <Ionicons name={item.icon} size={24} color="#333" />
                        <Text style={styles.activityTitle}>{item.title}</Text>
                        <Text style={styles.activityCount}>{item.count}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* 설정 및 기타 메뉴 섹션 */}
        <View style={styles.menuSection}>
          {settingItems.map(renderMenuItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  profileSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20, },
  profileImage: { width: 60, height: 60, borderRadius: 30 },
  profileInfo: { flex: 1, marginLeft: 16 },
  nickname: { fontSize: 20, fontWeight: 'bold' },
  editProfileText: { fontSize: 14, color: '#828282', marginTop: 4 },
  section: { backgroundColor: '#FFFFFF', borderRadius: 10, marginHorizontal: 16, marginTop: 12, paddingVertical: 8 },
  activityRow: { flexDirection: 'row', justifyContent: 'space-around' },
  activityItem: { alignItems: 'center', padding: 8, },
  activityTitle: { fontSize: 14, color: '#4F4F4F', marginTop: 8 },
  activityCount: { fontSize: 20, fontWeight: 'bold', color: '#2F80ED', marginTop: 4 },
  menuSection: { backgroundColor: '#FFFFFF', borderRadius: 10, marginHorizontal: 16, marginTop: 12, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0' },
  menuItemContent: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 16 },
  menuTitle: { fontSize: 16 },
});

export default MyPageScreen;
