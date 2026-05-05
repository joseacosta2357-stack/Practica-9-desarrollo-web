import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme, TextInput, Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EjerciciosScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#ebebf5' : '#3c3c43';
  const inputBg = isDark ? '#2c2c2e' : '#f2f2f7';
  const pageBg = isDark ? '#000000' : '#f2f2f7';
  const placeholderColor = isDark ? '#8e8e93' : '#c7c7cc';

  const filters = ['Todos', 'Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Core'];
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const libraryData = [
    { 
      id: '1', name: 'Press de Banca', muscle: 'Pecho', mainMuscle: 'Pectoral mayor', secondaryMuscles: ['Tríceps', 'Deltoides anterior'], equipment: 'Barra', level: 'Intermedio',
      execution: 'Acuéstate en el banco, agarra la barra con las manos ligeramente más separadas que el ancho de los hombros. Baja la barra de forma controlada hasta el pecho y empuja hacia arriba.',
      benefits: 'Desarrolla fuerza y tamaño en el pecho, hombros y tríceps.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '2', name: 'Flexiones (Push-ups)', muscle: 'Pecho', mainMuscle: 'Pectoral mayor', secondaryMuscles: ['Tríceps', 'Deltoides', 'Core'], equipment: 'Peso Corporal', level: 'Principiante',
      execution: 'Posición de plancha con las manos a la altura de los hombros. Baja el cuerpo flexionando los brazos hasta que el pecho casi toque el suelo y vuelve a subir.',
      benefits: 'Mejora la fuerza funcional del tren superior y fortalece el core de forma secundaria.',
      image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '3', name: 'Aperturas con Mancuernas', muscle: 'Pecho', mainMuscle: 'Pectoral mayor', secondaryMuscles: ['Deltoides anterior'], equipment: 'Mancuernas', level: 'Principiante',
      execution: 'Acostado en el banco, sujeta una mancuerna en cada mano con los brazos extendidos sobre el pecho. Abre los brazos en un amplio arco hasta sentir el estiramiento y vuelve.',
      benefits: 'Aísla el músculo pectoral y mejora la flexibilidad de la caja torácica.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '4', name: 'Dominadas (Pull-ups)', muscle: 'Espalda', mainMuscle: 'Dorsal ancho', secondaryMuscles: ['Bíceps', 'Romboide', 'Core'], equipment: 'Peso Corporal', level: 'Intermedio',
      execution: 'Cuélgate de una barra con agarre prono más ancho que los hombros. Tracciona hasta que tu barbilla pase la barra y desciende controlado.',
      benefits: 'Excelente ejercicio para construir una espalda ancha y fuerza en el tren superior.',
      image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '5', name: 'Remo con Barra', muscle: 'Espalda', mainMuscle: 'Dorsal ancho', secondaryMuscles: ['Bíceps', 'Lumbares', 'Trapecio'], equipment: 'Barra', level: 'Intermedio',
      execution: 'Con las rodillas ligeramente flexionadas e inclinado hacia adelante desde la cadera, tira de la barra hacia tu abdomen, juntando las escápulas.',
      benefits: 'Añade grosor y densidad a la espalda, además de mejorar la postura.',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '6', name: 'Sentadilla', muscle: 'Piernas', mainMuscle: 'Cuádriceps', secondaryMuscles: ['Glúteos', 'Isquiosurales', 'Core'], equipment: 'Barra', level: 'Intermedio',
      execution: 'Con la barra apoyada en los trapecios, desciende flexionando rodillas y cadera como si fueras a sentarte, manteniendo la espalda recta.',
      benefits: 'El ejercicio rey para desarrollar fuerza y masa muscular en toda la pierna.',
      image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '7', name: 'Peso Muerto', muscle: 'Piernas', mainMuscle: 'Isquiosurales', secondaryMuscles: ['Glúteos', 'Lumbares'], equipment: 'Barra', level: 'Avanzado',
      execution: 'Inclinado frente a la barra, agárrala, mantén la espalda recta y levántala extendiendo piernas y cadera simultáneamente.',
      benefits: 'Desarrolla fuerza bruta y masa en toda la cadena posterior del cuerpo.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '8', name: 'Press Militar', muscle: 'Hombros', mainMuscle: 'Deltoides anterior', secondaryMuscles: ['Deltoides medio', 'Tríceps'], equipment: 'Mancuernas', level: 'Intermedio',
      execution: 'Sujeta las mancuernas a la altura de los hombros y empújalas hacia arriba hasta extender los brazos por completo. Baja controladamente.',
      benefits: 'Construye fuerza y masa en los hombros, mejorando el empuje vertical.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '9', name: 'Elevaciones Laterales', muscle: 'Hombros', mainMuscle: 'Deltoides medio', secondaryMuscles: ['Trapecio'], equipment: 'Mancuernas', level: 'Principiante',
      execution: 'De pie, con mancuernas, eleva los brazos lateralmente con ligera flexión de codo hasta que estén paralelos al suelo.',
      benefits: 'Aísla el deltoides medio, aportando amplitud visual a los hombros.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '10', name: 'Curl de Bíceps', muscle: 'Brazos', mainMuscle: 'Bíceps braquial', secondaryMuscles: ['Braquial anterior'], equipment: 'Mancuernas', level: 'Principiante',
      execution: 'De pie, flexiona los codos subiendo el peso hacia los hombros y supina (gira) las muñecas durante el movimiento.',
      benefits: 'El ejercicio clásico y más efectivo para el desarrollo directo de los bíceps.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '11', name: 'Extensión de Tríceps', muscle: 'Brazos', mainMuscle: 'Tríceps braquial', secondaryMuscles: [], equipment: 'Polea', level: 'Principiante',
      execution: 'De pie frente a la polea alta, agarra la cuerda y extiende los codos hacia abajo sin separar los brazos del cuerpo.',
      benefits: 'Aísla y fortalece los tríceps de manera constante en todo el rango de movimiento.',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
    },
    { 
      id: '12', name: 'Plancha Abdominal (Plank)', muscle: 'Core', mainMuscle: 'Recto abdominal', secondaryMuscles: ['Oblicuos', 'Transverso'], equipment: 'Peso Corporal', level: 'Principiante',
      execution: 'Apóyate en el suelo sobre los antebrazos y puntas de los pies. Mantén el cuerpo recto y contrae el abdomen el mayor tiempo posible.',
      benefits: 'Mejora la estabilidad central y la resistencia isométrica de todo el core.',
      image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredExercises = libraryData.filter(ex => {
    const matchesFilter = activeFilter === 'Todos' || ex.muscle === activeFilter;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ex.muscle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={[styles.container, { backgroundColor: pageBg }]}>
      <View style={[styles.header, { backgroundColor: cardBg }]}>
        <View style={[styles.searchContainer, { backgroundColor: inputBg }]}>
          <Ionicons name="search" size={20} color={subtextColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Buscar ejercicios..."
            placeholderTextColor={placeholderColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
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
        {filteredExercises.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="search-outline" size={48} color={subtextColor} style={{ opacity: 0.5 }} />
            <Text style={{ color: subtextColor, marginTop: 16, fontSize: 16 }}>No se encontraron ejercicios</Text>
          </View>
        ) : (
          filteredExercises.map((exercise) => {
            const isExpanded = expandedId === exercise.id;
            return (
              <TouchableOpacity 
                key={exercise.id} 
                style={[styles.exerciseCard, { backgroundColor: cardBg }]}
                onPress={() => toggleExpand(exercise.id)}
                activeOpacity={0.8}
              >
                <View style={styles.exerciseCardInner}>
                  <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
                  <View style={styles.exerciseInfo}>
                    <Text style={[styles.exerciseName, { color: textColor }]}>{exercise.name}</Text>
                    <Text style={[styles.exerciseDetail, { color: subtextColor }]}>
                      {exercise.muscle} • {exercise.equipment}
                    </Text>
                  </View>
                  <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color={subtextColor} />
                </View>

                {isExpanded && (
                  <View style={[styles.expandedContent, { borderTopColor: isDark ? '#38383a' : '#e5e5ea' }]}>
                    <Text style={[styles.detailSectionTitle, { color: textColor }]}>Ejecución</Text>
                    <Text style={[styles.detailText, { color: subtextColor }]}>{exercise.execution}</Text>

                    <Text style={[styles.detailSectionTitle, { color: textColor }]}>Músculos</Text>
                    <Text style={[styles.detailText, { color: subtextColor }]}>
                      <Text style={{ fontWeight: 'bold' }}>Principal:</Text> {exercise.mainMuscle}
                    </Text>
                    <Text style={[styles.detailText, { color: subtextColor }]}>
                      <Text style={{ fontWeight: 'bold' }}>Secundarios:</Text> {exercise.secondaryMuscles.join(', ')}
                    </Text>

                    <Text style={[styles.detailSectionTitle, { color: textColor }]}>Beneficios</Text>
                    <Text style={[styles.detailText, { color: subtextColor }]}>{exercise.benefits}</Text>

                    <View style={styles.badgeRow}>
                      <View style={[styles.badge, { backgroundColor: 'rgba(0, 122, 255, 0.1)' }]}>
                        <Text style={styles.badgeText}>{exercise.level}</Text>
                      </View>
                      <View style={[styles.badge, { backgroundColor: 'rgba(0, 122, 255, 0.1)' }]}>
                        <Text style={styles.badgeText}>{exercise.equipment}</Text>
                      </View>
                    </View>
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
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  exerciseCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
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
  expandedContent: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  detailSectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
