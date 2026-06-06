import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function ProfilScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 py-6">
        <View className="flex-row items-center gap-4 mb-8">
          <View className="h-20 w-20 rounded-full bg-green-light border-2 border-border items-center justify-center">
            <Text style={{ fontFamily: 'Boldonse', fontSize: 32, color: '#3B6D11' }}>A</Text>
          </View>
          <View>
            <Text style={{ fontFamily: 'Boldonse', fontSize: 28, color: '#111111' }}>ALEX, 25</Text>
            <View className="bg-green-light border border-border rounded-full px-3 py-1 self-start mt-1">
              <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#27500A' }}>Niv. 4</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-3 mb-6">
          {[
            { label: 'Matchs', value: '12' },
            { label: 'Victoires', value: '15' },
            { label: 'ELO', value: '1285' },
          ].map((s) => (
            <View key={s.label} className="flex-1 rounded-2xl border border-border bg-white p-4 items-center">
              <Text style={{ fontFamily: 'Inter-Regular', fontSize: 20, color: '#3B6D11' }}>{s.value}</Text>
              <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#555555' }}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View className="rounded-2xl border border-border bg-white p-5 mb-4">
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#111111', marginBottom: 8 }}>Mon style</Text>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555' }}>
            Attaquant · Main droite · Drive
          </Text>
        </View>

        <Pressable
          onPress={() => router.push('/paywall')}
          className="rounded-2xl border border-green-dark bg-green-light/30 p-5 mb-4"
        >
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#111111' }}>
            👑 Passe Premium
          </Text>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555', marginTop: 4 }}>
            Swipes illimités, stats avancées
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
