/**
 * Accessibility utilities for consistent VoiceOver support
 */

export const a11y = {
  roles: {
    button: 'button' as const,
    image: 'image' as const,
    text: 'text' as const,
  },

  labels: {
    micButton: 'Toggle microphone',
    videoButton: 'Toggle video',
    moreButton: 'More options',
    endButton: 'End session',
    voiceCircle: 'Voice status indicator',
    statutoryVoiceIdle: 'Voice is idle',
    statusVoiceListening: 'Voice is listening',
    statusVoiceThinking: 'Voice is processing',
    statusVoiceSpeaking: 'Voice is speaking',
  },

  hints: {
    micButton: 'Double tap to start or stop listening',
    videoButton: 'Double tap to toggle video camera',
    moreButton: 'Double tap to view additional options',
    endButton: 'Double tap to end the current session',
  },
};

export type AccessibilityLabels = typeof a11y.labels;

