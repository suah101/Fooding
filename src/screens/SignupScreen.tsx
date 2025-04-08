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
import firestore from '@react-native-firebase/firestore';

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      await firestore().collection('users').doc(uid).set({
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        fridge: [],
      });

      Alert.alert('회원가입 성공!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('회원가입 실패', (error as any).message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>홈</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Text style={styles.title}>회원가입</Text>

        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력하세요"
          keyboardType="email-address"
        />

        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.toggleLink}>이미 계정이 있으신가요? 로그인하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  homeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#059761',
    borderRadius: 8,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
