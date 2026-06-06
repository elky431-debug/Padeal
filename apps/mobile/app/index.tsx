import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function SplashScreen() {
  const router = useRouter();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );

    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, scale]);

  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Animated.View
        style={[
          ballStyle,
          {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#3B6D11',
            marginBottom: 24,
          },
        ]}
      />
      <Text
        style={{
          fontFamily: 'Boldonse',
          fontSize: 56,
          color: '#111111',
          letterSpacing: -1,
        }}
      >
        PADEAL
      </Text>
      <Text
        style={{
          fontFamily: 'Inter-Medium',
          fontSize: 15,
          color: '#555555',
          marginTop: 8,
        }}
      >
        Trouve ton partenaire padel
      </Text>
    </View>
  );
}
