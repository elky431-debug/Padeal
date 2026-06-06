import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COUPS_GENIE, NIVEAUX } from '@padeal/types';
import type { Sexe, StyleJeu, MainDominante, CotePrefere } from '@padeal/types';

const STEPS = 6;

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [ville, setVille] = useState('');
  const [sexe, setSexe] = useState<Sexe>('homme');
  const [niveau, setNiveau] = useState(3);
  const [style, setStyle] = useState<StyleJeu>('polyvalent');
  const [main, setMain] = useState<MainDominante>('droite');
  const [cote, setCote] = useState<CotePrefere>('indifferent');
  const [coups, setCoups] = useState<string[]>([]);

  function next() {
    if (step < STEPS) setStep(step + 1);
    else router.replace('/(tabs)/partenaires');
  }

  const titles: Record<number, string> = {
    1: 'FAISONS CONNAISSANCE',
    2: 'TON NIVEAU',
    3: 'TON STYLE',
    4: 'MAIN & CÔTÉ',
    5: 'TES COUPS DE GÉNIE',
    6: 'TES PHOTOS',
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 py-6">
        <View className="h-1 bg-green-light rounded-full mb-2 overflow-hidden">
          <View
            className="h-full bg-green-dark rounded-full"
            style={{ width: `${(step / STEPS) * 100}%` }}
          />
        </View>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#555555', marginBottom: 24 }}>
          Étape {step} sur {STEPS}
        </Text>

        <Text style={{ fontFamily: 'Boldonse', fontSize: 28, color: '#111111', letterSpacing: -0.5, marginBottom: 24 }}>
          {titles[step]}
        </Text>

        {step === 1 && (
          <View className="gap-4">
            <TextInput placeholder="Prénom" value={prenom} onChangeText={setPrenom}
              className="h-[52px] border-[1.5px] border-border rounded-xl px-4 bg-white"
              style={{ fontFamily: 'Inter-Regular', fontSize: 16 }} />
            <TextInput placeholder="Nom" value={nom} onChangeText={setNom}
              className="h-[52px] border-[1.5px] border-border rounded-xl px-4 bg-white"
              style={{ fontFamily: 'Inter-Regular', fontSize: 16 }} />
            <TextInput placeholder="Ville" value={ville} onChangeText={setVille}
              className="h-[52px] border-[1.5px] border-border rounded-xl px-4 bg-white"
              style={{ fontFamily: 'Inter-Regular', fontSize: 16 }} />
            <View className="flex-row gap-2">
              {(['homme', 'femme', 'autre'] as Sexe[]).map((s) => (
                <Pressable key={s} onPress={() => setSexe(s)}
                  className={`rounded-full px-4 py-2 min-h-[44px] justify-center border ${sexe === s ? 'bg-green-dark border-green-dark' : 'bg-green-light border-border'}`}>
                  <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: sexe === s ? '#FFFFFF' : '#27500A' }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View className="flex-row flex-wrap justify-center gap-3">
            {NIVEAUX.map((n) => (
              <Pressable key={n} onPress={() => setNiveau(n)}
                className={`h-14 w-14 rounded-full items-center justify-center border-2 ${niveau === n ? 'bg-green-dark border-green-dark' : 'bg-green-light border-border'}`}>
                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: niveau === n ? '#FFFFFF' : '#27500A' }}>{n}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {step === 3 && (
          <View className="gap-3">
            {(['attaquant', 'defenseur', 'polyvalent'] as StyleJeu[]).map((s) => (
              <Pressable key={s} onPress={() => setStyle(s)}
                className={`rounded-full py-3 items-center border min-h-[44px] justify-center ${style === s ? 'bg-green-dark border-green-dark' : 'bg-green-light border-border'}`}>
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, color: style === s ? '#FFFFFF' : '#27500A' }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {step === 4 && (
          <View className="gap-4">
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#111111' }}>Main dominante</Text>
            <View className="flex-row gap-2">
              {(['droite', 'gauche'] as MainDominante[]).map((m) => (
                <Pressable key={m} onPress={() => setMain(m)}
                  className={`rounded-full px-4 py-2 border min-h-[44px] justify-center ${main === m ? 'bg-green-dark border-green-dark' : 'bg-green-light border-border'}`}>
                  <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: main === m ? '#FFFFFF' : '#27500A' }}>{m}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#111111', marginTop: 8 }}>Côté préféré</Text>
            <View className="flex-row flex-wrap gap-2">
              {(['revers', 'drive', 'indifferent'] as CotePrefere[]).map((c) => (
                <Pressable key={c} onPress={() => setCote(c)}
                  className={`rounded-full px-4 py-2 border min-h-[44px] justify-center ${cote === c ? 'bg-green-dark border-green-dark' : 'bg-green-light border-border'}`}>
                  <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: cote === c ? '#FFFFFF' : '#27500A' }}>{c}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {step === 5 && (
          <View className="flex-row flex-wrap gap-2">
            {COUPS_GENIE.map((c) => (
              <Pressable key={c}
                onPress={() => setCoups(coups.includes(c) ? coups.filter((x) => x !== c) : [...coups, c])}
                className={`rounded-full px-4 py-2 border min-h-[44px] justify-center ${coups.includes(c) ? 'bg-green-dark border-green-dark' : 'bg-green-light border-border'}`}>
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 13, color: coups.includes(c) ? '#FFFFFF' : '#27500A' }}>{c}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {step === 6 && (
          <View>
            <View className="flex-row flex-wrap gap-3 mb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <View key={i} className="w-[30%] aspect-square rounded-xl border-2 border-dashed border-border bg-green-light/30 items-center justify-center">
                  <Text style={{ fontFamily: 'Inter-Regular', fontSize: 24, color: '#639922' }}>+</Text>
                </View>
              ))}
            </View>
            <TextInput placeholder="Palmarès (optionnel)"
              className="h-[52px] border-[1.5px] border-border rounded-xl px-4 bg-white"
              style={{ fontFamily: 'Inter-Regular', fontSize: 16 }} />
          </View>
        )}

        <View className="flex-row gap-3 mt-10">
          {step > 1 && (
            <Pressable onPress={() => setStep(step - 1)}
              className="flex-1 rounded-full py-3.5 border-2 border-green-dark items-center min-h-[44px] justify-center">
              <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#3B6D11' }}>Retour</Text>
            </Pressable>
          )}
          <Pressable onPress={next}
            className="flex-1 rounded-full py-3.5 bg-green-dark items-center min-h-[44px] justify-center">
            <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#FFFFFF' }}>
              {step === STEPS ? 'Terminer →' : 'Continuer →'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
