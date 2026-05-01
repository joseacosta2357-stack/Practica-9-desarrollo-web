import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
  primary: '#E63946',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textMuted: '#999999',
  border: '#333333'
};

const HISTORY_DATA = [
  { id: '1', date: 'Hoy', title: 'Espalda y Bíceps', duration: '1h 20m', volume: '12,500 kg', prs: 2 },
  { id: '2', date: 'Hace 2 días', title: 'Pecho y Tríceps', duration: '1h 15m', volume: '9,800 kg', prs: 1 },
  { id: '3', date: 'Hace 4 días', title: 'Pierna Completa', duration: '1h 45m', volume: '18,200 kg', prs: 3 },
  { id: '4', date: 'Hace 6 días', title: 'Hombros y Core', duration: '1h 05m', volume: '7,500 kg', prs: 0 },
];

export default function HistorialScreen() {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={16} color={Colors.textMuted} />
          <Text style={styles.statText}>{item.duration}</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="barbell-outline" size={16} color={Colors.textMuted} />
          <Text style={styles.statText}>{item.volume}</Text>
        </View>
        {item.prs > 0 && (
          <View style={styles.statPr}>
            <Ionicons name="trophy" size={14} color="#FFD700" />
            <Text style={styles.statPrText}>{item.prs} PRs</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tu Progreso</Text>
        <Text style={styles.headerSubtitle}>4 entrenamientos este mes</Text>
      </View>

      <FlatList
        data={HISTORY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 5,
  },
  listContent: {
    padding: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  statPr: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statPrText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
