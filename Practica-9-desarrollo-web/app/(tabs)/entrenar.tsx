import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function EntrenarScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1e1e1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#aaaaaa' : '#666666';
  const inputBg = isDark ? '#2c2c2e' : '#f2f2f7';

  const mockExercises = [
    {
      name: 'Press de Banca',
      sets: [
        { id: 1, reps: '10', weight: '60' },
        { id: 2, reps: '8', weight: '65' },
        { id: 3, reps: '6', weight: '70' },
      ]
    },
    {
      name: 'Sentadilla',
      sets: [
        { id: 1, reps: '10', weight: '80' },
        { id: 2, reps: '8', weight: '90' },
        { id: 3, reps: '6', weight: '100' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: cardBg }]}>
        <Text style={styles.headerTitle}>Día 1: Pecho y Pierna</Text>
        <Text style={[styles.headerSubtitle, { color: subtextColor }]}>Duración: 00:15:30</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {mockExercises.map((exercise, index) => (
          <View key={index} style={[styles.exerciseCard, { backgroundColor: cardBg }]}>
            <View style={styles.exerciseHeader}>
              <Text style={[styles.exerciseName, { color: textColor }]}>{exercise.name}</Text>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color={subtextColor} />
              </TouchableOpacity>
            </View>

            <View style={styles.tableHeader}>
              <Text style={[styles.columnHeader, styles.colSet, { color: subtextColor }]}>Serie</Text>
              <Text style={[styles.columnHeader, styles.colData, { color: subtextColor }]}>kg</Text>
              <Text style={[styles.columnHeader, styles.colData, { color: subtextColor }]}>Reps</Text>
              <Text style={[styles.columnHeader, styles.colAction, { color: subtextColor }]}></Text>
            </View>

            {exercise.sets.map((set, setIndex) => (
              <View key={setIndex} style={styles.row}>
                <View style={styles.colSet}>
                  <View style={styles.setNumberBadge}>
                    <Text style={styles.setNumberText}>{set.id}</Text>
                  </View>
                </View>
                <View style={styles.colData}>
                  <TextInput 
                    style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                    defaultValue={set.weight}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.colData}>
                  <TextInput 
                    style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                    defaultValue={set.reps}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.colAction}>
                  <TouchableOpacity style={[styles.checkButton, { backgroundColor: '#34C759' }]}>
                    <Ionicons name="checkmark" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.addSetButton}>
              <Text style={[styles.addSetText, { color: '#007AFF' }]}>+ Añadir serie</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addExerciseButton}>
          <Text style={styles.addExerciseText}>Añadir Ejercicio</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: cardBg, borderTopColor: isDark ? '#333' : '#eee' }]}>
        <TouchableOpacity style={styles.finishButton}>
          <Text style={styles.finishButtonText}>Finalizar Entrenamiento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  exerciseCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  colSet: { width: 40 },
  colData: { flex: 1, marginHorizontal: 4 },
  colAction: { width: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  setNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  setNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  input: {
    height: 36,
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addSetButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 4,
  },
  addSetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addExerciseButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  addExerciseText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  finishButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
