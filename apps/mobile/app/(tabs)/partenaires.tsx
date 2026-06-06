import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Heart } from 'lucide-react-native';

const PROFILES = [
  { id: '1', prenom: 'Lucas', age: 28, niveau: 4, distance: '2.3 km', style: 'Attaquant', coups: ['Smash', 'Vibora'] },
  { id: '2', prenom: 'Marie', age: 32, niveau: 5, distance: '4.1 km', style: 'Polyvalent', coups: ['Lob', 'Volée'] },
];

export default function PartenairesScreen() {
  const [index, setIndex] = useState(0);
  const profile = PROFILES[index];

  if (!profile) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text style={{ fontFamily: 'Boldonse', fontSize: 28, color: '#111111', textAlign: 'center' }}>
          PLUS DE PROFILS
        </Text>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15, color: '#555555', marginTop: 8, textAlign: 'center' }}>
          Reviens demain !
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 py-6">
        <Text style={{ fontFamily: 'Boldonse', fontSize: 32, color: '#111111', letterSpacing: -0.8, marginBottom: 24 }}>
          DÉCOUVRE
        </Text>

        <View className="rounded-[20px] border border-border bg-white overflow-hidden mb-6"
          style={{ shadowColor: '#3F6D11', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}>
          <View className="aspect-[3/4] bg-green-light items-center justify-center">
            <Text style={{ fontFamily: 'Boldonse', fontSize: 64, color: 'rgba(99,153,34,0.3)' }}>
              {profile.prenom[0]}
            </Text>
          </View>
          <View className="p-5">
            <View className="flex-row items-center gap-3 mb-2">
              <Text style={{ fontFamily: 'Boldonse', fontSize: 24, color: '#111111' }}>
                {profile.prenom}, {profile.age}
              </Text>
              <View className="bg-green-light border border-border rounded-full px-3 py-1">
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#27500A' }}>
                  Niv. {profile.niveau}
                </Text>
              </View>
            </View>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555', marginBottom: 12 }}>
              📍 {profile.distance} · {profile.style}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {profile.coups.map((c) => (
                <View key={c} className="bg-green-light border border-border rounded-full px-3 py-1">
                  <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#27500A' }}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="flex-row justify-center gap-8">
          <Pressable
            onPress={() => setIndex((i) => i + 1)}
            className="h-16 w-16 rounded-full border-2 border-danger bg-white items-center justify-center"
          >
            <X color="#D32F2F" size={32} />
          </Pressable>
          <Pressable
            onPress={() => setIndex((i) => i + 1)}
            className="h-16 w-16 rounded-full bg-green-dark items-center justify-center"
          >
            <Heart color="#FFFFFF" size={32} fill="#FFFFFF" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
