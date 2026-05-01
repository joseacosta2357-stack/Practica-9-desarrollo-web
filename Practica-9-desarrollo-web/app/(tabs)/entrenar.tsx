import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
  primary: '#E63946',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textMuted: '#999999',
  border: '#333333'
};

const DUMMY_WORKOUT = [
  { id: '1', name: 'Press de Banca Plano', sets: 4, reps: '8-10', weight: '80 kg' },
  { id: '2', name: 'Aperturas con Mancuernas', sets: 3, reps: '12', weight: '20 kg' },
  { id: '3', name: 'Extensiones de Tríceps', sets: 4, reps: '15', weight: '25 kg' },
];

export default function EntrenarScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Día de Pecho y Tríceps</Text>
        <Text style={styles.subtitle}>En progreso • 00:15:32</Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {DUMMY_WORKOUT.map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseName}>{index + 1}. {exercise.name}</Text>
              <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textMuted} />
            </View>

            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Serie</Text>
              <Text style={styles.tableHeaderText}>Reps</Text>
              <Text style={styles.tableHeaderText}>Peso</Text>
              <Text style={styles.tableHeaderText}>✔</Text>
            </View>

            {[...Array(exercise.sets)].map((_, setIndex) => (
              <View key={setIndex} style={styles.tableRow}>
                <Text style={styles.tableCell}>{setIndex + 1}</Text>
                <Text style={styles.tableCell}>{exercise.reps}</Text>
                <Text style={styles.tableCell}>{exercise.weight}</Text>
                <TouchableOpacity style={styles.checkButton}>
                  <Ionicons name="checkmark" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.addExerciseBtn} activeOpacity={0.8}>
          <Ionicons name="add" size={24} color={Colors.primary} />
          <Text style={styles.addExerciseText}>AÑADIR EJERCICIO</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.finishBtn} activeOpacity={0.8}>
          <Text style={styles.finishBtnText}>FINALIZAR ENTRENAMIENTO</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.primary,
    marginTop: 5,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  exerciseCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tableHeaderText: {
    color: Colors.textMuted,
    fontSize: 12,
    width: 50,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  tableCell: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
    width: 50,
    textAlign: 'center',
  },
  checkButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addExerciseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  addExerciseText: {
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.card,
  },
  finishBtn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  finishBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
