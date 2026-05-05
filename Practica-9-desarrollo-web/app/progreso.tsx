import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Text, View, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProgressRecord = {
  id: string;
  date: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  photoUri: string | null;
};

export default function ProgresoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bg = isDark ? '#000000' : '#f2f2f7';
  const cardBg = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#ebebf5' : '#3c3c43';
  const inputBg = isDark ? '#2c2c2e' : '#e5e5ea';
  const borderColor = isDark ? '#38383a' : '#d1d1d6';

  const [records, setRecords] = useState<ProgressRecord[]>([]);
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const stored = await AsyncStorage.getItem('@progress_records');
      if (stored) {
        setRecords(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const saveRecord = async () => {
    if (!weight) {
      Alert.alert('Falta información', 'Por favor ingresa al menos tu peso.');
      return;
    }

    const newRecord: ProgressRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      weight: weight.replace(',', '.'),
      chest,
      waist,
      hips,
      photoUri,
    };

    const newRecords = [newRecord, ...records];
    setRecords(newRecords);
    
    try {
      await AsyncStorage.setItem('@progress_records', JSON.stringify(newRecords));
      setWeight('');
      setChest('');
      setWaist('');
      setHips('');
      setPhotoUri(null);
      Alert.alert('¡Guardado!', 'Tu progreso ha sido registrado correctamente.');
    } catch (e) {
      console.error(e);
    }
  };

  const deleteRecord = async (id: string) => {
    const newRecords = records.filter(r => r.id !== id);
    setRecords(newRecords);
    await AsyncStorage.setItem('@progress_records', JSON.stringify(newRecords));
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const maxWeight = Math.max(...records.map(r => parseFloat(r.weight) || 0), 1);
  const minWeight = Math.min(...records.map(r => parseFloat(r.weight) || 0), maxWeight);
  const graphRecords = [...records].reverse().slice(-7);

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={styles.content}>
      
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <Text style={[styles.cardTitle, { color: textColor }]}>Nuevo Registro</Text>
        
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: subtextColor }]}>Peso (kg)</Text>
            <TextInput style={[styles.input, { backgroundColor: inputBg, color: textColor }]} keyboardType="numeric" value={weight} onChangeText={setWeight} placeholder="Ej. 75.5" placeholderTextColor={subtextColor} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: subtextColor }]}>Cintura (cm)</Text>
            <TextInput style={[styles.input, { backgroundColor: inputBg, color: textColor }]} keyboardType="numeric" value={waist} onChangeText={setWaist} placeholder="Ej. 80" placeholderTextColor={subtextColor} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: subtextColor }]}>Pecho (cm)</Text>
            <TextInput style={[styles.input, { backgroundColor: inputBg, color: textColor }]} keyboardType="numeric" value={chest} onChangeText={setChest} placeholder="Ej. 100" placeholderTextColor={subtextColor} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: subtextColor }]}>Cadera (cm)</Text>
            <TextInput style={[styles.input, { backgroundColor: inputBg, color: textColor }]} keyboardType="numeric" value={hips} onChangeText={setHips} placeholder="Ej. 95" placeholderTextColor={subtextColor} />
          </View>
        </View>

        <TouchableOpacity style={[styles.photoButton, { borderColor: borderColor }]} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera-outline" size={32} color={subtextColor} />
              <Text style={{ color: subtextColor, marginTop: 8 }}>Añadir Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={saveRecord}>
          <Text style={styles.saveButtonText}>Guardar Progreso</Text>
        </TouchableOpacity>
      </View>

      {records.length > 1 && (
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={[styles.cardTitle, { color: textColor }]}>Evolución del Peso</Text>
          <View style={styles.graphContainer}>
            {graphRecords.map((rec) => {
              const val = parseFloat(rec.weight) || 0;
              const range = maxWeight - minWeight === 0 ? 1 : maxWeight - minWeight;
              const heightPct = Math.max(10, ((val - minWeight) / range) * 80 + 20); 
              
              return (
                <View key={rec.id} style={styles.barColumn}>
                  <Text style={[styles.barValue, { color: textColor }]}>{val}</Text>
                  <View style={[styles.bar, { height: `${heightPct}%`, backgroundColor: '#007AFF' }]} />
                  <Text style={[styles.barLabel, { color: subtextColor }]} numberOfLines={1}>
                    {new Date(rec.date).getDate()}/{new Date(rec.date).getMonth()+1}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      <Text style={[styles.sectionTitle, { color: textColor }]}>Historial de Progreso</Text>
      
      {records.length === 0 ? (
        <Text style={{ color: subtextColor, textAlign: 'center', marginTop: 20 }}>No hay registros todavía.</Text>
      ) : (
        records.map((rec) => (
          <View key={rec.id} style={[styles.recordCard, { backgroundColor: cardBg }]}>
            <View style={styles.recordHeader}>
              <Text style={[styles.recordDate, { color: textColor }]}>{formatDate(rec.date)}</Text>
              <TouchableOpacity onPress={() => deleteRecord(rec.id)}>
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.recordBody}>
              {rec.photoUri && (
                <Image source={{ uri: rec.photoUri }} style={styles.recordThumbnail} />
              )}
              <View style={styles.recordDetails}>
                <Text style={[styles.recordDetailText, { color: textColor }]}><Text style={{fontWeight: 'bold'}}>Peso:</Text> {rec.weight} kg</Text>
                {rec.waist ? <Text style={[styles.recordDetailText, { color: subtextColor }]}>Cintura: {rec.waist} cm</Text> : null}
                {rec.chest ? <Text style={[styles.recordDetailText, { color: subtextColor }]}>Pecho: {rec.chest} cm</Text> : null}
                {rec.hips ? <Text style={[styles.recordDetailText, { color: subtextColor }]}>Cadera: {rec.hips} cm</Text> : null}
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  photoButton: {
    height: 150,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  recordCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  recordDate: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  recordBody: {
    flexDirection: 'row',
  },
  recordThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  recordDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  recordDetailText: {
    fontSize: 14,
    marginBottom: 4,
  },
  graphContainer: {
    flexDirection: 'row',
    height: 150,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  barColumn: {
    alignItems: 'center',
    width: 40,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 24,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  barLabel: {
    fontSize: 10,
  },
});
