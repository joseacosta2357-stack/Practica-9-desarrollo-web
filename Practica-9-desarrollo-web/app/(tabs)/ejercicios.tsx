import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme, TextInput, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function EjerciciosScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1e1e1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#aaaaaa' : '#666666';
  const inputBg = isDark ? '#2c2c2e' : '#f2f2f7';

  const filters = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Core'];
  const [activeFilter, setActiveFilter] = useState('Todos');

  const mockExercises = [
    { id: 1, name: 'Press de Banca', muscle: 'Pecho', equipment: 'Barra', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Sentadilla', muscle: 'Piernas', equipment: 'Barra', image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Dominadas', muscle: 'Espalda', equipment: 'Peso Corporal', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Curl de Bíceps', muscle: 'Brazos', equipment: 'Mancuernas', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Press Militar', muscle: 'Hombros', equipment: 'Mancuernas', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: cardBg }]}>
        <View style={[styles.searchContainer, { backgroundColor: inputBg }]}>
          <Ionicons name="search" size={20} color={subtextColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Buscar ejercicios..."
            placeholderTextColor={subtextColor}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter ? styles.activeFilterChip : { backgroundColor: inputBg }
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter ? styles.activeFilterText : { color: textColor }
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {mockExercises.map((exercise) => (
          <TouchableOpacity key={exercise.id} style={[styles.exerciseCard, { backgroundColor: cardBg }]}>
            <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
            <View style={styles.exerciseInfo}>
              <Text style={[styles.exerciseName, { color: textColor }]}>{exercise.name}</Text>
              <Text style={[styles.exerciseDetail, { color: subtextColor }]}>
                {exercise.muscle} • {exercise.equipment}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={subtextColor} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontWeight: '600',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#e1e4e8',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseDetail: {
    fontSize: 14,
  },
});
