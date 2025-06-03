import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const BusinessProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
      <Text style={styles.name}>윤서 카페</Text>
      <Text style={styles.description}>
        따뜻한 분위기에서 직접 내린 커피를 즐길 수 있는 윤서 카페입니다. 신선한 원두와 수제 디저트를 제공합니다.
      </Text>
      <Text style={styles.infoLabel}>운영 시간</Text>
      <Text style={styles.info}>월-금 09:00 ~ 18:00</Text>
      <Text style={styles.infoLabel}>위치</Text>
      <Text style={styles.info}>서울특별시 성동구 성수동1가</Text>
      <View style={styles.buttonContainer}>
        <Button title="정보 수정하기" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
});

export default BusinessProfileScreen;
