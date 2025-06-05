// app/places.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PlacesScreen() {
  return (
    <>
      {/* 헤더 제목은 _layout.tsx에서 설정됩니다. */}
      {/* <Stack.Screen options={{ title: "장소" }} /> */}
      <View style={styles.container}>
        <Text style={styles.text}>장소 목록 화면 (팀원 작업 예정)</Text>
        <Text style={styles.textSmall}>이 화면은 김원기님이 멋지게 만들어주실 거예요!</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  }
});
