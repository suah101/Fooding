// /screens/WasteScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const wasteData = [
  { category: '과일', quantity: 5 },
  { category: '유제품', quantity: 3 },
  { category: '육류', quantity: 2 },
  { category: '채소', quantity: 4 },
];

export default function WasteScreen() {
  const chartData = {
    labels: wasteData.map((item) => item.category),
    datasets: [
      {
        data: wasteData.map((item) => item.quantity),
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 이번 달 폐기량 분석</Text>

      <BarChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              yAxisLabel=""
              chartConfig={{
                  backgroundGradientFrom: '#FFF6E5',
                  backgroundGradientTo: '#FFF6E5',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 169, 77, ${opacity})`,
                  labelColor: () => '#5C4B3B',
              }}
              style={{ marginVertical: 20, borderRadius: 12 }} yAxisSuffix={''}      />

      <View style={styles.summary}>
        {wasteData.map((item) => (
          <View key={item.category} style={styles.summaryItem}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.count}>{item.quantity}개 폐기</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6E5',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5C4B3B',
  },
  summary: {
    marginTop: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  category: {
    fontSize: 16,
    color: '#2F2F2F',
  },
  count: {
    fontSize: 16,
    color: '#FFA94D',
    fontWeight: '600',
  },
});
