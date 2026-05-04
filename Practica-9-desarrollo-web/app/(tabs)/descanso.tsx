import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DescansoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#ebebf5' : '#3c3c43';
  const pageBg = isDark ? '#000000' : '#f2f2f7';

  const [isActive, setIsActive] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: pageBg }]}>
      <View style={styles.timerContainer}>
        <View style={[styles.timerCircle, { borderColor: isActive ? '#007AFF' : cardBg, backgroundColor: cardBg }]}>
          <Text style={[styles.timeText, { color: textColor }]}>01:30</Text>
          <Text style={[styles.subtitleText, { color: subtextColor }]}>Siguiente: Press de Banca</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={[styles.controlButton, { backgroundColor: cardBg }]}>
          <Text style={[styles.controlButtonText, { color: textColor }]}>-30s</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainButton, { backgroundColor: isActive ? '#FF3B30' : '#007AFF' }]}
          onPress={() => setIsActive(!isActive)}
        >
          <Ionicons 
            name={isActive ? "stop" : "play"} 
            size={32} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, { backgroundColor: cardBg }]}>
          <Text style={[styles.controlButtonText, { color: textColor }]}>+30s</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.presetsContainer, { backgroundColor: cardBg }]}>
        <Text style={[styles.presetsTitle, { color: textColor }]}>Descansos Rápidos</Text>
        <View style={styles.presetsGrid}>
          {['1:00', '1:30', '2:00', '3:00'].map((time) => (
            <TouchableOpacity key={time} style={styles.presetButton}>
              <Text style={styles.presetButtonText}>{time}</Text>
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
    padding: 24,
    justifyContent: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeText: {
    fontSize: 64,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  subtitleText: {
    fontSize: 16,
    marginTop: 8,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16,
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  presetsContainer: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  presetsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  presetsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  presetButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  presetButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
