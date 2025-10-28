import { create } from 'zustand';

/**
 * Voice session states
 */
export type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface VoiceStore {
  state: VoiceState;
  audioLevel: number;
  isVideoOn: boolean;

  // Actions
  setState: (state: VoiceState) => void;
  setAudioLevel: (level: number) => void;
  toggleVideo: () => void;
  reset: () => void;
}

/**
 * Zustand store for voice session state
 * Business logic kept minimal here; orchestration happens in useVoiceSession
 */
export const useVoiceStore = create<VoiceStore>((set) => ({
  state: 'idle',
  audioLevel: 0,
  isVideoOn: false,

  setState: (state: VoiceState) => set({ state }),
  setAudioLevel: (level: number) => set({ audioLevel: level }),
  toggleVideo: () => set((prev) => ({ isVideoOn: !prev.isVideoOn })),
  reset: () => set({ state: 'idle', audioLevel: 0 }),
}));

/**
 * Pure state machine transition function
 * Returns the next state based on current state and action
 */
export const transitionState = (currentState: VoiceState, action: string): VoiceState => {
  switch (action) {
    case 'TOGGLE_MIC':
      if (currentState === 'idle') return 'listening';
      if (currentState === 'listening') return 'idle';
      return currentState;

    case 'START_LISTENING':
      return currentState === 'idle' ? 'listening' : currentState;

    case 'STOP_LISTENING':
      return currentState === 'listening' ? 'idle' : currentState;

    case 'START_THINKING':
      return currentState === 'listening' ? 'thinking' : currentState;

    case 'START_SPEAKING':
      return currentState === 'thinking' ? 'speaking' : currentState;

    case 'STOP_SPEAKING':
      return currentState === 'speaking' ? 'idle' : currentState;

    case 'INTERRUPT':
      // Barge-in: jump from speaking to listening
      if (currentState === 'speaking') return 'listening';
      return currentState;

    case 'RESET':
      return 'idle';

    default:
      return currentState;
  }
};

