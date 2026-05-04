import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function InicioScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#ebebf5' : '#3c3c43';
  const pageBg = isDark ? '#000000' : '#f2f2f7';

  const cards = [
    {
      title: 'Empezar Entrenamiento',
      subtitle: 'Último: Pecho y Tríceps (hace 2 días)',
      icon: <MaterialCommunityIcons name="weight-lifter" size={32} color="#007AFF" />,
      route: '/entrenar',
    },
    {
      title: 'Historial',
      subtitle: '4 entrenamientos esta semana',
      icon: <Ionicons name="time" size={32} color="#34C759" />,
      route: '/historial',
    },
    {
      title: 'Descanso',
      subtitle: 'Temporizador inactivo',
      icon: <Ionicons name="timer" size={32} color="#FF9500" />,
      route: '/descanso',
    },
    {
      title: 'Ejercicios',
      subtitle: '12 ejercicios recientes',
      icon: <FontAwesome5 name="dumbbell" size={24} color="#AF52DE" />,
      route: '/ejercicios',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: pageBg }]} contentContainerStyle={styles.content}>
      <Text style={[styles.headerTitle, { color: textColor }]}>Resumen Semanal</Text>
      
      <View style={[styles.statsContainer, { backgroundColor: cardBg }]}>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: textColor }]}>4</Text>
          <Text style={[styles.statLabel, { color: subtextColor }]}>Sesiones</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: textColor }]}>5h 20m</Text>
          <Text style={[styles.statLabel, { color: subtextColor }]}>Tiempo</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: textColor }]}>12k</Text>
          <Text style={[styles.statLabel, { color: subtextColor }]}>Volumen (kg)</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Acciones Rápidas</Text>

      {cards.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: cardBg }]}
          onPress={() => router.push(card.route as any)}
        >
          <View style={[styles.cardIconContainer, { backgroundColor: isDark ? '#2c2c2e' : 'rgba(0,0,0,0.05)' }]}>
            {card.icon}
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={[styles.cardTitle, { color: textColor }]}>{card.title}</Text>
            <Text style={[styles.cardSubtitle, { color: subtextColor }]}>{card.subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={subtextColor} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
  },
});
