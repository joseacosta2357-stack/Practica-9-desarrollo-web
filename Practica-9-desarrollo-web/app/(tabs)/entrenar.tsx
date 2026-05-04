import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme, TextInput, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type WorkoutSet = {
  id: string;
  weight: string;
  reps: string;
  completed: boolean;
};

type Exercise = {
  id: string;
  name: string;
  sets: WorkoutSet[];
};

export default function EntrenarScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#ebebf5' : '#3c3c43';
  const inputBg = isDark ? '#2c2c2e' : '#f2f2f7';
  const pageBg = isDark ? '#000000' : '#f2f2f7';
  const placeholderColor = isDark ? '#8e8e93' : '#c7c7cc';

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: [
        { id: Date.now().toString() + '-1', weight: '', reps: '', completed: false }
      ]
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter(e => e.id !== exerciseId));
  };

  const updateExerciseName = (exerciseId: string, name: string) => {
    setExercises(exercises.map(e => e.id === exerciseId ? { ...e, name } : e));
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(e => {
      if (e.id === exerciseId) {
        // Copy the last set's weight and reps if available
        const lastSet = e.sets[e.sets.length - 1];
        const newSet: WorkoutSet = {
          id: Date.now().toString(),
          weight: lastSet ? lastSet.weight : '',
          reps: lastSet ? lastSet.reps : '',
          completed: false,
        };
        return { ...e, sets: [...e.sets, newSet] };
      }
      return e;
    }));
  };

  const updateSet = (exerciseId: string, setId: string, field: 'weight' | 'reps', value: string) => {
    setExercises(exercises.map(e => {
      if (e.id === exerciseId) {
        return {
          ...e,
          sets: e.sets.map(s => s.id === setId ? { ...s, [field]: value } : s)
        };
      }
      return e;
    }));
  };

  const toggleSetCompleted = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(e => {
      if (e.id === exerciseId) {
        return {
          ...e,
          sets: e.sets.map(s => s.id === setId ? { ...s, completed: !s.completed } : s)
        };
      }
      return e;
    }));
  };

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(e => {
      if (e.id === exerciseId) {
        return {
          ...e,
          sets: e.sets.filter(s => s.id !== setId)
        };
      }
      return e;
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: pageBg }]}>
      <View style={[styles.header, { backgroundColor: cardBg }]}>
        <TextInput 
          style={[styles.headerTitleInput, { color: textColor }]} 
          defaultValue="Nueva Sesión"
          placeholder="Nombre del entrenamiento"
          placeholderTextColor={placeholderColor}
        />
        <Text style={[styles.headerSubtitle, { color: subtextColor }]}>Iniciado ahora</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {exercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="barbell-outline" size={48} color={subtextColor} style={{ opacity: 0.5 }} />
            <Text style={[styles.emptyStateText, { color: subtextColor }]}>No hay ejercicios en esta sesión.</Text>
            <Text style={[styles.emptyStateSubtext, { color: subtextColor }]}>Toca "Añadir Ejercicio" para empezar.</Text>
          </View>
        ) : (
          exercises.map((exercise, index) => (
            <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: cardBg }]}>
              <View style={styles.exerciseHeader}>
                <TextInput
                  style={[styles.exerciseNameInput, { color: textColor }]}
                  placeholder="Nombre del ejercicio"
                  placeholderTextColor={placeholderColor}
                  value={exercise.name}
                  onChangeText={(text) => updateExerciseName(exercise.id, text)}
                />
                <TouchableOpacity onPress={() => removeExercise(exercise.id)} style={styles.removeExButton}>
                  <Ionicons name="close" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>

              <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, styles.colSet, { color: subtextColor }]}>Serie</Text>
                <Text style={[styles.columnHeader, styles.colData, { color: subtextColor }]}>kg</Text>
                <Text style={[styles.columnHeader, styles.colData, { color: subtextColor }]}>Reps</Text>
                <Text style={[styles.columnHeader, styles.colAction, { color: subtextColor }]}></Text>
              </View>

              {exercise.sets.map((set, setIndex) => {
                const isCompleted = set.completed;
                const rowOpacity = isCompleted ? 0.6 : 1;
                return (
                  <View key={set.id} style={[styles.row, { opacity: rowOpacity }]}>
                    <View style={styles.colSet}>
                      <TouchableOpacity 
                        style={styles.setNumberBadge}
                        onLongPress={() => removeSet(exercise.id, set.id)}
                      >
                        <Text style={[styles.setNumberText, { color: subtextColor }]}>{setIndex + 1}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.colData}>
                      <TextInput 
                        style={[
                          styles.input, 
                          { backgroundColor: isCompleted ? 'transparent' : inputBg, color: textColor }
                        ]} 
                        value={set.weight}
                        onChangeText={(text) => updateSet(exercise.id, set.id, 'weight', text)}
                        keyboardType="numeric"
                        placeholder="-"
                        placeholderTextColor={placeholderColor}
                        editable={!isCompleted}
                      />
                    </View>
                    <View style={styles.colData}>
                      <TextInput 
                        style={[
                          styles.input, 
                          { backgroundColor: isCompleted ? 'transparent' : inputBg, color: textColor }
                        ]} 
                        value={set.reps}
                        onChangeText={(text) => updateSet(exercise.id, set.id, 'reps', text)}
                        keyboardType="numeric"
                        placeholder="-"
                        placeholderTextColor={placeholderColor}
                        editable={!isCompleted}
                      />
                    </View>
                    <View style={styles.colAction}>
                      <TouchableOpacity 
                        style={[
                          styles.checkButton, 
                          { backgroundColor: isCompleted ? '#34C759' : (isDark ? '#3a3a3c' : '#e5e5ea') }
                        ]}
                        onPress={() => toggleSetCompleted(exercise.id, set.id)}
                      >
                        <Ionicons name="checkmark" size={16} color={isCompleted ? "white" : "transparent"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}

              <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(exercise.id)}>
                <Text style={[styles.addSetText, { color: '#007AFF' }]}>+ Añadir serie</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <TouchableOpacity style={[styles.addExerciseButton, { backgroundColor: cardBg }]} onPress={addExercise}>
          <Ionicons name="add" size={20} color="#007AFF" style={{ marginRight: 4 }} />
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
  headerTitleInput: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 0,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
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
  exerciseNameInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    padding: 0,
  },
  removeExButton: {
    padding: 4,
    marginLeft: 8,
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
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
