import React, { useState } from 'react';
import { View, Text, Button, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const PhotoPickerScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  const navigation = useNavigation();

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...uris]);
    }
  };

  const goToPostDetail = () => {
    navigation.navigate('PostDetail' as never); // 'PostDetail' should match your navigator screen name
  };

  const renderItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 선택</Text>
      <Button title="사진 추가하기" onPress={pickImages} />
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
      <TouchableOpacity style={styles.doneButton} onPress={goToPostDetail}>
        <Text style={styles.doneText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PhotoPickerScreen;