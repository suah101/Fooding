// /screens/RecipeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  message: string;
}

const dummyRecipes: Recipe[] = [
  {
    id: '1',
    title: '크림 파스타',
    ingredients: ['🧀 치즈', '🥛 우유'],
    message: '치즈와 우유가 곧 상해요! 크림 파스타를 만들어보세요 🍝',
  },
  {
    id: '2',
    title: '오믈렛',
    ingredients: ['🥚 달걀', '🧀 치즈'],
    message: '유통기한 임박한 재료로 간단한 오믈렛 추천!',
  },
];

export default function RecipeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍽 레시피 추천</Text>

      {dummyRecipes.map((recipe) => (
        <View key={recipe.id} style={styles.card}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text style={styles.ingredients}>재료: {recipe.ingredients.join(', ')}</Text>
          <Text style={styles.message}>{recipe.message}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>레시피 보기</Text>
          </TouchableOpacity>
        </View>
      ))}
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
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 4,
  },
  ingredients: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: '#FFA94D',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFA94D',
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
