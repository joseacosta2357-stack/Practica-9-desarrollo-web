import React from 'react';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: string;
  color: string;
  family: 'FontAwesome5' | 'Ionicons' | 'MaterialCommunityIcons';
}) {
  const { family, ...rest } = props;
  if (family === 'FontAwesome5') {
    return <FontAwesome5 size={24} style={{ marginBottom: -3 }} {...rest as any} />;
  } else if (family === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...rest as any} />;
  }
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...rest as any} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#eee',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff',
        },
        headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon family="Ionicons" name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="entrenar"
        options={{
          title: 'Entrenar',
          tabBarIcon: ({ color }) => <TabBarIcon family="MaterialCommunityIcons" name="weight-lifter" color={color} />,
        }}
      />
      <Tabs.Screen
        name="historial"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <TabBarIcon family="Ionicons" name="time" color={color} />,
        }}
      />
      <Tabs.Screen
        name="descanso"
        options={{
          title: 'Descanso',
          tabBarIcon: ({ color }) => <TabBarIcon family="Ionicons" name="timer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ejercicios"
        options={{
          title: 'Ejercicios',
          tabBarIcon: ({ color }) => <TabBarIcon family="FontAwesome5" name="dumbbell" color={color} />,
        }}
      />
    </Tabs>
  );
}
