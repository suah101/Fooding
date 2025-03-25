// /screens/FridgeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface FoodItem {
  id: string;
  name: string;
  expirationDate: string;
  category: string;
}

const dummyData: FoodItem[] = [
  { id: '1', name: '우유', expirationDate: '2025-03-28', category: '유제품' },
  { id: '2', name: '사과', expirationDate: '2025-03-27', category: '과일' },
  { id: '3', name: '상추', expirationDate: '2025-03-29', category: '채소' },
];

export default function FridgeScreen() {
  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.card}>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.expiration}>유통기한: {item.expirationDate}</Text>
      <Text style={styles.category}>카테고리: {item.category}</Text>
      <TouchableOpacity style={styles.deleteBtn}>
        <Text style={styles.deleteText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 내 냉장고</Text>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5C4B3B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F2F2F',
  },
  expiration: {
    fontSize: 14,
    marginTop: 5,
    color: '#444',
  },
  category: {
    fontSize: 13,
    color: '#888',
  },
  deleteBtn: {
    marginTop: 8,
    backgroundColor: '#FFA94D',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
