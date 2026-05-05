import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DescansoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1c1c1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#ebebf5' : '#3c3c43';
  const pageBg = isDark ? '#000000' : '#f2f2f7';

  const [timeLeft, setTimeLeft] = useState(90);
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(90);
  const [isEditing, setIsEditing] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [customSeconds, setCustomSeconds] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const addTime = (seconds: number) => {
    setTimeLeft((prev) => prev + seconds);
  };

  const setPreset = (seconds: number) => {
    setIsActive(false);
    setTimeLeft(seconds);
    setInitialTime(seconds);
  };

  const applyCustomTime = () => {
    const m = parseInt(customMinutes || '0', 10);
    const s = parseInt(customSeconds || '0', 10);
    if (!isNaN(m) && !isNaN(s)) {
      const totalSeconds = m * 60 + s;
      if (totalSeconds > 0) {
        setPreset(totalSeconds);
        setIsEditing(false);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: pageBg }]}>
      <View style={styles.timerContainer}>
        <View style={[styles.timerCircle, { borderColor: isActive ? '#007AFF' : cardBg, backgroundColor: cardBg }]}>
          <Text style={[styles.timeText, { color: textColor }]}>{formatTime(timeLeft)}</Text>
          <Text style={[styles.subtitleText, { color: subtextColor }]}>
            {isActive ? 'En curso' : 'Pausado'}
          </Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={[styles.controlButton, { backgroundColor: cardBg }]} onPress={resetTimer}>
          <Ionicons name="refresh" size={24} color={textColor} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mainButton, { backgroundColor: isActive ? '#FF3B30' : '#007AFF' }]}
          onPress={toggleTimer}
        >
          <Ionicons 
            name={isActive ? "pause" : "play"} 
            size={32} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, { backgroundColor: cardBg }]} onPress={() => addTime(30)}>
          <Text style={[styles.controlButtonText, { color: textColor }]}>+30s</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, { backgroundColor: cardBg }]} onPress={() => addTime(60)}>
          <Text style={[styles.controlButtonText, { color: textColor }]}>+1m</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.presetsContainer, { backgroundColor: cardBg }]}>
        <Text style={[styles.presetsTitle, { color: textColor }]}>Descansos Rápidos</Text>
        <View style={styles.presetsGrid}>
          {[
            { label: '30s', value: 30 },
            { label: '60s', value: 60 },
            { label: '90s', value: 90 },
            { label: '2m', value: 120 },
            { label: '3m', value: 180 }
          ].map((preset) => (
            <TouchableOpacity key={preset.label} style={styles.presetButton} onPress={() => setPreset(preset.value)}>
              <Text style={styles.presetButtonText}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={{ marginTop: 16 }} onPress={() => setIsEditing(!isEditing)}>
          <Text style={{ color: '#007AFF', textAlign: 'center', fontWeight: '600' }}>
            {isEditing ? 'Ocultar personalizado' : 'Tiempo personalizado'}
          </Text>
        </TouchableOpacity>

        {isEditing && (
          <View style={styles.customInputRow}>
            <TextInput
              style={[styles.customInput, { color: textColor, backgroundColor: pageBg }]}
              placeholder="Min"
              placeholderTextColor={subtextColor}
              keyboardType="numeric"
              value={customMinutes}
              onChangeText={setCustomMinutes}
              maxLength={2}
            />
            <Text style={{ color: textColor, fontSize: 20, marginHorizontal: 8 }}>:</Text>
            <TextInput
              style={[styles.customInput, { color: textColor, backgroundColor: pageBg }]}
              placeholder="Seg"
              placeholderTextColor={subtextColor}
              keyboardType="numeric"
              value={customSeconds}
              onChangeText={setCustomSeconds}
              maxLength={2}
            />
            <TouchableOpacity style={styles.applyButton} onPress={applyCustomTime}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        )}
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
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 8,
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
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  presetButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  customInput: {
    width: 60,
    height: 40,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 12,
  },
});
