import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pricing } from '@padeal/config/tokens';

const FEATURES = [
  'Swipes illimités',
  'Voir qui t\'a liké',
  'Filtres avancés',
  'Stats ELO détaillées',
  'Badge Premium',
];

export default function PaywallScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 py-8">
        <Pressable onPress={() => router.back()} className="mb-8 min-h-[44px] justify-center">
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#3B6D11' }}>← Retour</Text>
        </Pressable>

        <Text style={{ fontFamily: 'Boldonse', fontSize: 48, color: '#111111', letterSpacing: -1, lineHeight: 52 }}>
          DEVIENS{'\n'}
          <Text style={{ color: '#3B6D11' }}>PREMIUM</Text>
        </Text>

        <View className="mt-8 mb-8 gap-4">
          {FEATURES.map((f) => (
            <View key={f} className="flex-row items-center gap-3">
              <Text style={{ color: '#3B6D11', fontSize: 18 }}>✓</Text>
              <Text style={{ fontFamily: 'Inter-Regular', fontSize: 15, color: '#111111' }}>{f}</Text>
            </View>
          ))}
        </View>

        <View className="rounded-2xl border-2 border-green-dark bg-green-light/20 p-6 items-center mb-6">
          <Text style={{ fontFamily: 'Boldonse', fontSize: 32, color: '#3B6D11' }}>
            {pricing.playerAnnual}€
          </Text>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555' }}>par an · Joueur</Text>
        </View>

        <Pressable className="bg-green-dark rounded-full py-5 items-center min-h-[44px] justify-center">
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 18, color: '#FFFFFF' }}>
            Essai gratuit 1 mois
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
