// src/screens/FridgeMappingScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const sectionOptions = ['냉장실', '냉동실', '야채칸'];
const slotOptions = ['상단', '중단', '하단', '좌측칸', '우측칸'];

export default function FridgeMappingScreen() {
  const [userLabel, setUserLabel] = useState('');
  const [section, setSection] = useState('');
  const [slot, setSlot] = useState('');
  const [locations, setLocations] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const userId = firestore().app?.options.projectId || 'temp-user'; // 실제로는 auth().currentUser.uid 사용

  const fetchMappings = async () => {
    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('fridgeMappings')
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLocations(data);
  };

  useEffect(() => {
    fetchMappings();
  }, []);

  const handleSave = async () => {
    if (!userLabel || !section || !slot) {
      Alert.alert('모든 항목을 입력해주세요!');
      return;
    }

    try {
      if (editingId) {
        // 수정
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('fridgeMappings')
          .doc(editingId)
          .update({ userLabel, section, slot });
        setEditingId(null);
      } else {
        // 새로 추가
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('fridgeMappings')
          .add({ userLabel, section, slot });
      }

      Alert.alert('저장 완료!');
      setUserLabel('');
      setSection('');
      setSlot('');
      fetchMappings();
    } catch (error) {
      Alert.alert('오류 발생', (error as any).message);
    }
  };

  const handleDelete = async (id: string) => {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('fridgeMappings')
      .doc(id)
      .delete();
    fetchMappings();
  };

  const handleEdit = (item: any) => {
    setUserLabel(item.userLabel);
    setSection(item.section);
    setSlot(item.slot);
    setEditingId(item.id);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>냉장고 위치 등록</Text>

      <Text style={{ marginTop: 20 }}>사용자 위치 이름</Text>
      <TextInput
        placeholder="예: 문 쪽 칸"
        value={userLabel}
        onChangeText={setUserLabel}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Text>냉장고 구역</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {sectionOptions.map((opt) => (
          <Button
            key={opt}
            title={opt}
            color={section === opt ? '#FFA94D' : 'gray'}
            onPress={() => setSection(opt)}
          />
        ))}
      </View>

      <Text style={{ marginTop: 10 }}>칸</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {slotOptions.map((opt) => (
          <Button
            key={opt}
            title={opt}
            color={slot === opt ? '#FFA94D' : 'gray'}
            onPress={() => setSlot(opt)}
          />
        ))}
      </View>

      <Button title={editingId ? '수정하기' : '저장하기'} onPress={handleSave} />

      <Text style={{ marginTop: 30, fontWeight: 'bold' }}>등록된 위치</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              borderBottomWidth: 0.5,
            }}
          >
            <Text>{`${item.userLabel} (${item.section} > ${item.slot})`}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={{ color: 'blue', marginRight: 10 }}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={{ color: 'red' }}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
