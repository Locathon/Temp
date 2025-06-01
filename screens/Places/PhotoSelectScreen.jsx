import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PhotoSelectScreen = ({ navigation, route }) => {
  // 가짜 사진 리스트
  const dummyPhotos = Array.from({ length: 12 }, (_, i) => ({
    id: i.toString(),
    uri: `https://placekitten.com/200/20${i}`,
  }));

  const [selected, setSelected] = useState(new Set());

  const toggleSelect = (id) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const onDone = () => {
    // 선택된 사진 URI 배열 생성
    const selectedUris = dummyPhotos
      .filter(photo => selected.has(photo.id))
      .map(photo => photo.uri);

    // 이전 화면에 선택된 사진 전달 후 돌아가기
    navigation.navigate('PlaceWrite', { photos: selectedUris });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 모음</Text>

      <FlatList
        data={dummyPhotos}
        numColumns={3}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const isSelected = selected.has(item.id);
          return (
            <TouchableOpacity
              onPress={() => toggleSelect(item.id)}
              style={styles.photoWrapper}
              activeOpacity={0.7}
            >
              <Image source={{ uri: item.uri }} style={styles.photo} />
              {isSelected && (
                <View style={styles.overlay}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={[styles.doneButton, { backgroundColor: selected.size > 0 ? '#4A90E2' : '#ccc' }]}
        onPress={onDone}
        disabled={selected.size === 0}
        activeOpacity={0.8}
      >
        <Text style={styles.doneButtonText}>선택 완료 ({selected.size})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },
  photoWrapper: {
    margin: 5,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    width: 100,
    height: 100,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  doneButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default PhotoSelectScreen;