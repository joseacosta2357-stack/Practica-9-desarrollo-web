import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
  primary: '#E63946',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textMuted: '#999999',
  border: '#333333'
};

const DUMMY_EXERCISES = [
  { id: '1', name: 'Press de Banca Plano', muscle: 'Pecho', equipment: 'Barra', image: 'barbell' },
  { id: '2', name: 'Sentadilla Libre', muscle: 'Piernas', equipment: 'Barra', image: 'barbell' },
  { id: '3', name: 'Dominadas', muscle: 'Espalda', equipment: 'Peso Corporal', image: 'body' },
  { id: '4', name: 'Curl de Bíceps', muscle: 'Brazos', equipment: 'Mancuernas', image: 'fitness' },
  { id: '5', name: 'Press Militar', muscle: 'Hombros', equipment: 'Mancuernas', image: 'fitness' },
  { id: '6', name: 'Plancha', muscle: 'Core', equipment: 'Peso Corporal', image: 'body' },
];

export default function EjerciciosScreen() {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.image as any} size={24} color={Colors.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDetails}>{item.muscle} • {item.equipment}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Biblioteca</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textMuted} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar ejercicios..."
            placeholderTextColor={Colors.textMuted}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Core'].map((filter, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.filterChip, index === 0 && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={DUMMY_EXERCISES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: Colors.text,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: 'rgba(230, 57, 70, 0.1)',
    borderColor: Colors.primary,
  },
  filterText: {
    color: Colors.textMuted,
    fontWeight: '600',
  },
  filterTextActive: {
    color: Colors.primary,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(230, 57, 70, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: Colors.textMuted,
  },
});
