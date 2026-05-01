import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Colors = {
  primary: '#E63946',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textMuted: '#999999',
};

export default function HomeScreen() {
  const router = useRouter();

  const SummaryCard = ({ title, value, icon, subtitle, onPress }: any) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon} size={24} color={Colors.primary} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, Atleta</Text>
        <Text style={styles.date}>Hoy es un buen día para entrenar</Text>
      </View>

      <View style={styles.grid}>
        <SummaryCard
          title="Último Entrenamiento"
          value="Pecho y Tríceps"
          subtitle="Hace 2 días • 1h 15m"
          icon="barbell-outline"
          onPress={() => router.push('/historial')}
        />
        <SummaryCard
          title="Esta Semana"
          value="3 Sesiones"
          subtitle="Objetivo: 5 sesiones"
          icon="calendar-outline"
          onPress={() => router.push('/historial')}
        />
        <SummaryCard
          title="Estado de Descanso"
          value="Recuperado"
          subtitle="Listo para la acción"
          icon="battery-charging-outline"
          onPress={() => router.push('/descanso')}
        />
        <SummaryCard
          title="Ejercicios Recientes"
          value="Press Banca"
          subtitle="Último récord: 80kg"
          icon="trending-up-outline"
          onPress={() => router.push('/ejercicios')}
        />
      </View>

      <TouchableOpacity 
        style={styles.mainActionBtn} 
        activeOpacity={0.8}
        onPress={() => router.push('/entrenar')}
      >
        <Ionicons name="play" size={24} color="#FFF" />
        <Text style={styles.mainActionText}>INICIAR ENTRENAMIENTO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  date: {
    fontSize: 16,
    color: Colors.textMuted,
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    width: '47%',
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  cardValue: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  mainActionBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 30,
    marginTop: 20,
    gap: 10,
  },
  mainActionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
