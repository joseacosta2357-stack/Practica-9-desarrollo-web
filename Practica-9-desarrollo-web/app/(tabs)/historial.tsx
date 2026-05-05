import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutContext } from '../context/WorkoutContext';

export default function HistorialScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#ebebf5' : '#3c3c43';
  const accentColor = isDark ? '#38383a' : '#e5e5ea';
  const pageBg = isDark ? '#000000' : '#f2f2f7';

  const { history } = useContext(WorkoutContext);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: pageBg }]}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={48} color={subtextColor} style={{ opacity: 0.5 }} />
            <Text style={[styles.emptyStateText, { color: textColor }]}>No hay historial todavía</Text>
            <Text style={[styles.emptyStateSubtext, { color: subtextColor }]}>Completa un entrenamiento para verlo aquí</Text>
          </View>
        ) : (
          history.map((workout) => {
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
                    <Text style={[styles.workoutName, { color: textColor }]}>{workout.name || 'Sesión de Entrenamiento'}</Text>
                    <Text style={[styles.workoutDate, { color: subtextColor }]}>{formatDate(workout.date)}</Text>
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
                    <Text style={[styles.statText, { color: subtextColor }]}>{formatDuration(workout.durationMs)}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="barbell-outline" size={16} color={subtextColor} style={styles.statIcon} />
                    <Text style={[styles.statText, { color: subtextColor }]}>{workout.volume.toLocaleString('es-ES')} kg</Text>
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
                      <View key={ex.id || idx} style={styles.exerciseDetailsRow}>
                        <Text style={[styles.exerciseTextBold, { color: textColor }]}>• {ex.name || 'Ejercicio sin nombre'}</Text>
                        {ex.sets.filter(s => s.completed).map((s, sIdx) => (
                          <Text key={s.id || sIdx} style={[styles.setText, { color: subtextColor }]}>
                            Serie {sIdx + 1}: {s.weight || '0'}kg x {s.reps || '0'} reps
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            );
          })
        )}
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
  exerciseDetailsRow: {
    marginBottom: 12,
    paddingLeft: 4,
  },
  exerciseTextBold: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  setText: {
    fontSize: 13,
    marginLeft: 16,
    marginBottom: 2,
    opacity: 0.8,
  },
  exerciseText: {
    marginLeft: 8,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
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
