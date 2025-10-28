import { useEffect, useRef, useCallback } from 'react';
import { useVoiceStore, transitionState } from '../state/voiceStore';
import { generateMockAudioLevel } from '../utils/time';

/**
 * Timing constants for mock flow
 */
const LISTENING_TIMEOUT = 2000; // 2s before transitioning to thinking
const THINKING_DURATION = 600; // 0.6s thinking
const SPEAKING_DURATION = 2500; // 2.5s speaking
const AUDIO_LEVEL_INTERVAL = 100; // Update audio level every 100ms

/**
 * Custom hook orchestrating the voice session state machine
 * Handles:
 * - Mic toggle (idle ↔ listening)
 * - Automatic transitions (listening → thinking → speaking → idle)
 * - Barge-in (interrupt speaking to go back to listening)
 * - Mock audio level generation during speaking
 */
export const useVoiceSession = () => {
  const { state, setState, setAudioLevel, isVideoOn, toggleVideo } = useVoiceStore();
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const audioLevelTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear all timers
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
    if (audioLevelTimerRef.current) {
      clearInterval(audioLevelTimerRef.current);
      audioLevelTimerRef.current = null;
    }
  }, []);

  // Handle mic press (toggle idle ↔ listening)
  const onMicPress = useCallback(() => {
    clearAllTimers();

    if (state === 'speaking') {
      // Interrupt: speaking → listening (barge-in)
      setState(transitionState(state, 'INTERRUPT'));
      return;
    }

    const newState = transitionState(state, 'TOGGLE_MIC');
    setState(newState);

    // If entering listening, start the automatic flow after timeout
    if (newState === 'listening') {
      const timer = setTimeout(() => {
        const currentState = useVoiceStore.getState().state;
        if (currentState === 'listening') {
          // listening → thinking
          setState(transitionState(currentState, 'START_THINKING'));

          // thinking → speaking after thinking duration
          const timer2 = setTimeout(() => {
            setState(transitionState('thinking', 'START_SPEAKING'));

            // Start mock audio level generation
            audioLevelTimerRef.current = setInterval(() => {
              setAudioLevel(generateMockAudioLevel());
            }, AUDIO_LEVEL_INTERVAL);

            // speaking → idle after speaking duration
            const timer3 = setTimeout(() => {
              clearAllTimers();
              setState(transitionState('speaking', 'STOP_SPEAKING'));
              setAudioLevel(0);
            }, SPEAKING_DURATION);

            timersRef.current.push(timer3);
          }, THINKING_DURATION);

          timersRef.current.push(timer2);
        }
      }, LISTENING_TIMEOUT);

      timersRef.current.push(timer);
    }
  }, [state, setState, setAudioLevel, clearAllTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Get current audio level (used for speaking animation)
  const getAudioLevel = useCallback(() => {
    return useVoiceStore.getState().audioLevel;
  }, []);

  return {
    state,
    isVideoOn,
    onMicPress,
    toggleVideo,
    getAudioLevel,
  };
};

