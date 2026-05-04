import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function HistorialScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1e1e1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#aaaaaa' : '#666666';
  const accentColor = isDark ? '#333333' : '#f0f0f0';

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const mockHistory = [
    {
      id: 1,
      date: 'Hoy, 10:00 AM',
      name: 'Pecho y Tríceps',
      duration: '1h 15m',
      volume: '4,500 kg',
      records: 2,
      exercises: ['Press de Banca', 'Press Inclinado', 'Aperturas', 'Extensión de Tríceps']
    },
    {
      id: 2,
      date: 'Ayer, 06:30 PM',
      name: 'Espalda y Bíceps',
      duration: '1h 05m',
      volume: '5,200 kg',
      records: 0,
      exercises: ['Dominadas', 'Remo con Barra', 'Jalón al Pecho', 'Curl de Bíceps']
    },
    {
      id: 3,
      date: 'Hace 3 días',
      name: 'Pierna Completa',
      duration: '1h 30m',
      volume: '8,100 kg',
      records: 1,
      exercises: ['Sentadilla', 'Prensa', 'Extensión de Cuádriceps', 'Curl Femoral', 'Gemelos']
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {mockHistory.map((workout) => {
          const isExpanded = expandedId === workout.id;
          return (
            <TouchableOpacity 
              key={workout.id} 
              style={[styles.card, { backgroundColor: cardBg }]}
              onPress={() => toggleExpand(workout.id)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={[styles.workoutName, { color: textColor }]}>{workout.name}</Text>
                  <Text style={[styles.workoutDate, { color: subtextColor }]}>{workout.date}</Text>
                </View>
                <Ionicons 
                  name={isExpanded ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color={subtextColor} 
                />
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={16} color={subtextColor} style={styles.statIcon} />
                  <Text style={[styles.statText, { color: subtextColor }]}>{workout.duration}</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="barbell-outline" size={16} color={subtextColor} style={styles.statIcon} />
                  <Text style={[styles.statText, { color: subtextColor }]}>{workout.volume}</Text>
                </View>
                {workout.records > 0 && (
                  <View style={styles.statItem}>
                    <Ionicons name="trophy-outline" size={16} color="#FFD700" style={styles.statIcon} />
                    <Text style={[styles.statText, { color: '#FFD700' }]}>{workout.records} PRs</Text>
                  </View>
                )}
              </View>

              {isExpanded && (
                <View style={[styles.expandedContent, { borderTopColor: accentColor }]}>
                  <Text style={[styles.detailTitle, { color: textColor }]}>Ejercicios:</Text>
                  {workout.exercises.map((ex, idx) => (
                    <View key={idx} style={styles.exerciseRow}>
                      <Text style={{ color: subtextColor }}>•</Text>
                      <Text style={[styles.exerciseText, { color: textColor }]}>{ex}</Text>
                    </View>
                  ))}
                  <TouchableOpacity style={styles.detailButton}>
                    <Text style={styles.detailButtonText}>Ver detalle completo</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statIcon: {
    marginRight: 4,
  },
  statText: {
    fontSize: 13,
    fontWeight: '500',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 8,
  },
  exerciseText: {
    marginLeft: 8,
    fontSize: 14,
  },
  detailButton: {
    marginTop: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  }
});
