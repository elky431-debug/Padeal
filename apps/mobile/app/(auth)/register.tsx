import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 py-8">
        <Text
          style={{ fontFamily: 'Boldonse', fontSize: 20, color: '#3B6D11' }}
          className="mb-12"
        >
          PADEAL
        </Text>

        <Text
          style={{
            fontFamily: 'Boldonse',
            fontSize: 28,
            color: '#111111',
            letterSpacing: -0.5,
          }}
        >
          REJOINS LE GAME
        </Text>
        <Text
          style={{ fontFamily: 'Inter-Regular', fontSize: 15, color: '#555555' }}
          className="mt-2 mb-8"
        >
          Crée ton profil et trouve ton partenaire padel.
        </Text>

        <Text
          style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: '#555555' }}
          className="mb-1.5"
        >
          Email
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="ton@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          className="h-[52px] border-[1.5px] border-border rounded-xl px-4 mb-4 bg-white"
          style={{ fontFamily: 'Inter-Regular', fontSize: 16 }}
        />

        <Text
          style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: '#555555' }}
          className="mb-1.5"
        >
          Mot de passe
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Min. 8 caractères"
          secureTextEntry
          className="h-[52px] border-[1.5px] border-border rounded-xl px-4 mb-6 bg-white"
          style={{ fontFamily: 'Inter-Regular', fontSize: 16 }}
        />

        <Pressable
          onPress={() => router.replace('/onboarding')}
          className="bg-green-dark rounded-full py-3.5 items-center min-h-[44px] justify-center"
        >
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#FFFFFF' }}>
            Créer mon compte
          </Text>
        </Pressable>

        <Link href="/(auth)/login" asChild>
          <Pressable className="mt-8 items-center min-h-[44px] justify-center">
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555' }}>
              Déjà inscrit ?{' '}
              <Text style={{ color: '#3B6D11', fontFamily: 'Inter-SemiBold' }}>
                Se connecter
              </Text>
            </Text>
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
