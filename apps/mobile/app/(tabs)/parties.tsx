import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PARTIES = [
  { id: '1', titre: 'Double mixte Paris 15', lieu: 'Padel Horizon', date: 'Sam. 8 juin · 18h', niveau: '3-5', joueurs: '2/4' },
  { id: '2', titre: 'Session Versailles', lieu: 'Forest Hill', date: 'Dim. 9 juin · 10h', niveau: '4-6', joueurs: '3/4' },
];

export default function PartiesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 py-6 gap-4">
        <Text style={{ fontFamily: 'Boldonse', fontSize: 32, color: '#111111', letterSpacing: -0.8, marginBottom: 24 }}>
          TROUVE UN MATCH
        </Text>

        {PARTIES.map((p) => (
          <View key={p.id} className="rounded-2xl border border-border bg-white p-5 border-l-[3px] border-l-green-dark">
            <Text style={{ fontFamily: 'Boldonse', fontSize: 18, color: '#111111', marginBottom: 8 }}>
              {p.titre.toUpperCase()}
            </Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555', marginBottom: 4 }}>
              📍 {p.lieu}
            </Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555', marginBottom: 4 }}>
              🕐 {p.date}
            </Text>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555', marginBottom: 16 }}>
              👥 {p.joueurs} · Niv. {p.niveau}
            </Text>
            <Pressable className="bg-green-dark rounded-full py-3 items-center min-h-[44px] justify-center">
              <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#FFFFFF' }}>
                REJOINDRE
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
