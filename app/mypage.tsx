// app/mypage.tsx
// 👇 Alert를 react-native에서 명시적으로 import 합니다.
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용을 위해 import
import { Link, useRouter } from 'expo-router';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MyPageScreen = () => {
  const router = useRouter();
  const isLoggedIn = false; // TODO: 실제 로그인 상태로 교체해야 합니다. (예: useAuth 훅 사용)

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 구현
    Alert.alert('로그아웃', '로그아웃 되었습니다.'); // Alert가 이제 정상적으로 인식될 것입니다.
    // router.replace('/login'); // 로그아웃 후 로그인 화면으로 이동 등
  };

  const menuItems = [
    { id: '1', title: '내 정보 수정', icon: 'person-circle-outline', screen: '/edit-profile' },
    { id: '2', title: '내가 등록한 장소', icon: 'location-outline', screen: '/my-places' },
    { id: '3', title: '내가 만든 코스', icon: 'map-outline', screen: '/my-courses' },
    { id: '4', title: '고객센터', icon: 'help-circle-outline', screen: '/support' },
    { id: '5', title: '앱 설정', icon: 'settings-outline', screen: '/settings' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          <Ionicons name="person-circle" size={80} color="#cccccc" style={styles.profileIcon} />
          {isLoggedIn ? (
            <>
              <Text style={styles.username}>건호님</Text>
              <Text style={styles.email}>geonho@example.com</Text>
            </>
          ) : (
            <Text style={styles.loginPrompt}>로그인이 필요합니다.</Text>
          )}
        </View>

        {isLoggedIn ? (
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>로그아웃</Text>
          </TouchableOpacity>
        ) : (
          <Link href="/login" asChild>
            <TouchableOpacity style={[styles.button, styles.loginButton]}>
              <Ionicons name="log-in-outline" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>로그인 / 회원가입</Text>
            </TouchableOpacity>
          </Link>
        )}

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <Link key={item.id} href={isLoggedIn ? item.screen : '/login'} asChild>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name={item.icon as any} size={24} color="#4F4F4F" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.title}</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        <View style={styles.tempLinks}>
          <Text style={styles.tempLinksTitle}>임시 이동 링크 (개발용):</Text>
          <Link href="/" style={styles.tempLink}>- 홈 (index)</Link>
          <Link href="/mapTest" style={styles.tempLink}>- 지도 테스트 (mapTest)</Link>
          <Link href="/login" style={styles.tempLink}>- 로그인 (login)</Link>
          <Link href="/register" style={styles.tempLink}>- 회원가입 (register)</Link>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileIcon: {
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  loginPrompt: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loginButton: {
    backgroundColor: '#007AFF',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonIcon: {},
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFF4',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 17,
    color: '#000',
  },
  tempLinks: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  tempLinksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tempLink: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
});

export default MyPageScreen;
