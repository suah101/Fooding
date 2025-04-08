import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

// 날짜를 한글 형식으로 포맷하는 함수
const formatKoreanDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
};

export default function AddFoodScreen() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [expireDate, setExpireDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fridgeLocations, setFridgeLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  const categoryOptions = ['채소', '과일', '육류', '유제품', '음료', '조미료', '냉동식품', '기타'];
  const categoryExpirations: { [key: string]: number } = {
    채소: 7,
    과일: 5,
    육류: 3,
    유제품: 10,
    음료: 30,
    조미료: 180,
    냉동식품: 90,
  };

  const userId = firestore().app?.options.projectId || 'temp-user';

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(userId)
      .collection('fridgeMappings')
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFridgeLocations(data);
      });
  }, []);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    if (categoryExpirations[value]) {
      const today = new Date();
      const autoDate = new Date(today.setDate(today.getDate() + categoryExpirations[value]));
      setExpireDate(autoDate);
    } else {
      setExpireDate(null);
    }
  };

  const handleAddFood = async () => {
    if (!name || !category || !quantity || !selectedLocation) {
      Alert.alert('필수 항목을 입력해주세요.');
      return;
    }

    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('fridgeItems')
        .add({
          name,
          category,
          quantity: Number(quantity),
          unitPrice: unitPrice ? Number(unitPrice) : 0,
          dateAdded: firestore.FieldValue.serverTimestamp(),
          expireDate: expireDate ? firestore.Timestamp.fromDate(expireDate) : null,
          location: {
            userLabel: selectedLocation.userLabel,
            section: selectedLocation.section,
            slot: selectedLocation.slot,
          },
        });

      Alert.alert('식품이 등록되었습니다!');
      setName('');
      setCategory('');
      setQuantity('');
      setUnitPrice('');
      setExpireDate(null);
      setSelectedLocation(null);
    } catch (error) {
      Alert.alert('등록 실패', (error as any).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>식품 등록</Text>

      <Text style={styles.label}>식품명</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>카테고리</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(value: string) => handleCategoryChange(value)}
        >
          <Picker.Item label="카테고리 선택" value="" />
          {categoryOptions.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>수량</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>단가 (선택)</Text>
      <TextInput
        value={unitPrice}
        onChangeText={setUnitPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      {expireDate && (
        <Text style={{ color: '#FFA94D', marginBottom: 5 }}>
          자동 설정된 유통기한: {formatKoreanDate(expireDate)}
        </Text>
      )}

      {category === '기타' && (
        <>
          <Text style={styles.label}>유통기한 직접 선택</Text>
          <Button
            title={expireDate ? formatKoreanDate(expireDate) : '날짜 선택'}
            onPress={() => setShowDatePicker(true)}
            color="#FFA94D"
          />
          {showDatePicker && (
            <DateTimePicker
              value={expireDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setExpireDate(date);
              }}
            />
          )}
        </>
      )}

      <Text style={[styles.label, { marginTop: 10 }]}>냉장고 위치 선택</Text>
      <FlatList
        data={fridgeLocations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedLocation(item)}>
            <Text
              style={{
                color: selectedLocation?.id === item.id ? '#FFA94D' : 'black',
                paddingVertical: 4,
              }}
            >
              {item.userLabel} ({item.section} {item.slot})
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleAddFood}>
        <Text style={styles.submitText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#5C4B3B',
  },
  label: {
    marginTop: 10,
    fontWeight: '500',
    color: '#444',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#FFA94D',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
