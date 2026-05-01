import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
  primary: '#E63946',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textMuted: '#999999',
  border: '#333333'
};

export default function DescansoScreen() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Temporizador</Text>
        <Text style={styles.subtitle}>Descanso entre series</Text>
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.circle}>
          <Text style={styles.timeText}>01:30</Text>
          <Text style={styles.timeLabel}>Minutos : Segundos</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtnSecondary} activeOpacity={0.7}>
          <Ionicons name="refresh" size={28} color={Colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.controlBtnPrimary} 
          activeOpacity={0.8}
          onPress={() => setIsRunning(!isRunning)}
        >
          <Ionicons name={isRunning ? "pause" : "play"} size={36} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtnSecondary} activeOpacity={0.7}>
          <Ionicons name="add-circle-outline" size={28} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.presets}>
        <Text style={styles.presetsTitle}>Tiempos rápidos</Text>
        <View style={styles.presetButtons}>
          {['00:30', '01:00', '01:30', '02:00'].map((time, i) => (
            <TouchableOpacity key={i} style={styles.presetBtn}>
              <Text style={styles.presetBtnText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textMuted,
    marginTop: 5,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.card,
  },
  timeText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: 2,
  },
  timeLabel: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginBottom: 40,
  },
  controlBtnPrimary: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  controlBtnSecondary: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presets: {
    padding: 20,
    paddingBottom: 40,
  },
  presetsTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  presetBtn: {
    backgroundColor: Colors.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  presetBtnText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
