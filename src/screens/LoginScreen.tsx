import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('로그인 성공!');
      // 🔁 App.tsx의 user 상태를 통해 Main으로 자동 전환되므로 여기선 이동 생략 가능
    } catch (error) {
      Alert.alert('로그인 실패', (error as any).message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>로그인</Text>

        <Text style={styles.label}>이메일</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="example@email.com"
        />

        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholder="비밀번호 입력"
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
          <Text style={styles.signupButtonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.toggleLink}>회원가입으로 이동</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ✅ 스타일 코드
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  form: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 8,
    width: '90%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  input: {
    width: '100%',
    maxWidth: 280,
    padding: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  signupButton: {
    width: '100%',
    maxWidth: 280,
    padding: 12,
    backgroundColor: '#059761',
    borderRadius: 4,
    marginTop: 15,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleLink: {
    marginTop: 10,
    fontSize: 14,
    color: '#778899',
    textDecorationLine: 'underline',
  },
});
