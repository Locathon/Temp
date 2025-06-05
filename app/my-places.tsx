// app/settings.tsx
import { Ionicons } from '@expo/vector-icons';
import { Href, Link, Stack } from 'expo-router'; // Href 타입 추가
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// settingItems의 screen 속성 타입을 Href으로 명시
interface SettingItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap; // 좀 더 정확한 아이콘 타입
  screen?: Href; // Href 타입 사용
  type?: 'switch';
  value?: boolean;
  action?: () => void;
  valueText?: string;
}

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(true);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleLocationServices = () => setLocationServicesEnabled(previousState => !previousState);

  const settingItems: SettingItem[] = [ // 타입 명시
    { id: 'account', title: '계정 관리', icon: 'key-outline', screen: '/account-settings' },
    { id: 'notifications', title: '알림 설정', icon: 'notifications-outline', type: 'switch', value: notificationsEnabled, action: toggleNotifications },
    { id: 'location', title: '위치 서비스 사용', icon: 'navigate-circle-outline', type: 'switch', value: locationServicesEnabled, action: toggleLocationServices },
    { id: 'terms', title: '이용약관', icon: 'document-text-outline', screen: '/terms' },
    { id: 'privacy', title: '개인정보 처리방침', icon: 'shield-checkmark-outline', screen: '/privacy' },
    { id: 'version', title: '앱 버전', icon: 'information-circle-outline', valueText: '1.0.0 (베타)' },
  ];

  return (
    <>
      <Stack.Screen options={{ title: '앱 설정' }} />
      <ScrollView style={styles.container}>
        {settingItems.map((item) => (
          item.type === 'switch' ? (
            <View key={item.id} style={styles.settingItem}>
              <Ionicons name={item.icon} size={24} color="#4F4F4F" style={styles.icon} />
              <Text style={styles.settingText}>{item.title}</Text>
              <Switch
                trackColor={{ false: "#E9E9EB", true: "#34C759" }}
                thumbColor={item.value ? "#ffffff" : "#f4f3f4"}
                ios_backgroundColor="#E9E9EB"
                onValueChange={item.action}
                value={item.value}
              />
            </View>
          ) : item.screen ? (
            // item.screen이 Href 타입으로 간주되어야 함
            <Link key={item.id} href={item.screen} asChild> 
              <TouchableOpacity style={styles.settingItem}>
                <Ionicons name={item.icon} size={24} color="#4F4F4F" style={styles.icon} />
                <Text style={styles.settingText}>{item.title}</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            </Link>
          ) : (
             <View key={item.id} style={styles.settingItem}>
              <Ionicons name={item.icon} size={24} color="#4F4F4F" style={styles.icon} />
              <Text style={styles.settingText}>{item.title}</Text>
              {item.valueText && <Text style={styles.valueText}>{item.valueText}</Text>}
            </View>
          )
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DCDCDC',
  },
  icon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 17,
    color: '#000000',
  },
  valueText: {
    fontSize: 17,
    color: '#8E8E93',
  },
});
