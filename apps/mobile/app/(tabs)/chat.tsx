import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CONVERSATIONS = [
  { id: '1', name: 'Lucas', message: 'Dispo samedi 18h ?', time: '14:32', unread: 2 },
  { id: '2', name: 'Marie', message: 'Super match hier !', time: 'Hier', unread: 0 },
];

export default function ChatScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 py-6">
        <Text style={{ fontFamily: 'Boldonse', fontSize: 32, color: '#111111', letterSpacing: -0.8, marginBottom: 24 }}>
          MESSAGES
        </Text>

        {CONVERSATIONS.map((c) => (
          <Pressable
            key={c.id}
            className="flex-row items-center gap-4 rounded-2xl border border-border bg-white p-4 mb-2"
          >
            <View className="h-12 w-12 rounded-full bg-green-light items-center justify-center">
              <Text style={{ fontFamily: 'Boldonse', fontSize: 18, color: '#3B6D11' }}>
                {c.name[0]}
              </Text>
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#111111' }}>{c.name}</Text>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: '#555555' }}>{c.time}</Text>
              </View>
              <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, color: '#555555' }} numberOfLines={1}>
                {c.message}
              </Text>
            </View>
            {c.unread > 0 && (
              <View className="h-5 w-5 rounded-full bg-green-dark items-center justify-center">
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 11, color: '#FFFFFF' }}>{c.unread}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
