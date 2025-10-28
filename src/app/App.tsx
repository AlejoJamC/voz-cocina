import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { VoiceSessionScreen } from '../screens/VoiceSessionScreen';

/**
 * Root App component
 * Registers providers and sets up safe area
 */
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <VoiceSessionScreen />
    </>
  );
}

