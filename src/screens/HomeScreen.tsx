// /screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>👋 안녕하세요, 수아님!</Text>

      {/* Section 1: 유통기한 임박 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏰ 임박한 식재료</Text>
        <Text>🥛 우유 - 2일 남음</Text>
        <Text>🍎 사과 - 내일 만료</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>전체 보기</Text>
        </TouchableOpacity>
      </View>

      {/* Section 2: 폐기량 요약 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 이번 달 폐기량</Text>
        <Text>사과 2개, 우유 1팩</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>자세히 보기</Text>
        </TouchableOpacity>
      </View>

      {/* Section 3: 레시피 추천 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🍳 오늘의 레시피 추천</Text>
        <Text>크림 파스타 (🧀 치즈, 🥛 우유)</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>더 보기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF6E5',
  },
  greeting: {
    fontSize: 20,
    marginBottom: 10,
    color: '#5C4B3B',
  },
  section: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2F2F2F',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFA94D',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
