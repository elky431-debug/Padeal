import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LEADERBOARD = [
  { rank: 1, prenom: 'Antoine', elo: 1842, ligue: 'Diamond' },
  { rank: 2, prenom: 'Sophie', elo: 1798, ligue: 'Diamond' },
  { rank: 3, prenom: 'Karim', elo: 1654, ligue: 'Platinum' },
  { rank: 4, prenom: 'Toi', elo: 1285, ligue: 'Silver', isMe: true },
];

export default function LigueScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 py-6">
        <Text style={{ fontFamily: 'Boldonse', fontSize: 32, color: '#111111', letterSpacing: -0.8, marginBottom: 24 }}>
          LE CLASSEMENT
        </Text>

        <View className="bg-green-light/30 rounded-2xl border border-border p-5 mb-6">
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#111111', marginBottom: 12 }}>
            Tes stats
          </Text>
          <View className="flex-row justify-around">
            {[
              { label: 'ELO', value: '1285' },
              { label: 'Victoires', value: '15' },
              { label: 'Win rate', value: '60%' },
            ].map((s) => (
              <View key={s.label} className="items-center">
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 24, color: '#3B6D11' }}>{s.value}</Text>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#555555' }}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {LEADERBOARD.map((p) => (
          <View
            key={p.rank}
            className={`flex-row items-center gap-4 rounded-xl border px-4 py-3 mb-2 ${
              p.isMe ? 'bg-green-light/50 border-green-dark' : 'bg-white border-border'
            }`}
          >
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555', width: 24 }}>
              {p.rank}
            </Text>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#111111', flex: 1 }}>
              {p.prenom}{p.isMe ? ' (toi)' : ''}
            </Text>
            <View className="bg-green-light rounded-full px-2 py-0.5">
              <Text style={{ fontFamily: 'Inter-Medium', fontSize: 11, color: '#27500A' }}>{p.ligue}</Text>
            </View>
            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#3B6D11' }}>{p.elo}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
