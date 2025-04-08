import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, deleteDoc, orderBy, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // ✅ navigation import

interface FoodItem {
  id: string;
  name: string;
  category: string;
  expireDate: string | null;
}

// ✅ Firebase 설정
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// ✅ Firebase 초기화
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export default function FridgeScreen() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const navigation = useNavigation<any>();; // ✅ navigation 사용

  const fetchFoods = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const fridgeRef = collection(db, 'users', user.uid, 'fridgeItems');
    const q = query(fridgeRef, orderBy('dateAdded', 'desc'));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map(docSnap => {
      const item = docSnap.data();
      return {
        id: docSnap.id,
        name: item.name,
        category: item.category,
        expireDate: item.expireDate?.toDate().toISOString().split('T')[0] || '없음',
      };
    });

    setFoods(data);
  };

  const handleDelete = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'fridgeItems', id));
      fetchFoods();
    } catch (error) {
      Alert.alert('삭제 실패', (error as any).message);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.card}>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.expiration}>유통기한: {item.expireDate}</Text>
      <Text style={styles.category}>카테고리: {item.category}</Text>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteText}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📦 내 냉장고</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddFood')}>
          <Text style={styles.addButton}>+ 식품 등록</Text>
        </TouchableOpacity>
      </View>

      {foods.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
          등록된 식품이 없습니다.
        </Text>
      ) : (
        <FlatList
          data={foods}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5C4B3B',
  },
  addButton: {
    fontSize: 16,
    color: '#FFA94D',
    fontWeight: '600',
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
