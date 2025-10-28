# Voz-Cocina 🍳🎙️

A hands-free voice cooking assistant for Spanish speakers. Real-time voice control while you cook.

**React Native + TypeScript + Expo**

## Overview

Voz-Cocina replicates the ChatGPT Voice interface with a focus on:
- **Maintainability**: Clean separation of concerns
- **Industry standards**: TypeScript strict mode, ESLint, Prettier
- **Accessibility**: Full VoiceOver support, haptics
- **Production-ready**: Solid architecture ready for backend integration

## State Machine

The voice session follows a predictable state machine:

```
┌─────────────────────────────────────────────┐
│                  IDLE                        │
│         (breathing animation)                │
└────────────────┬────────────────────────────┘
                 │
                 │ tap Mic
                 ▼
┌─────────────────────────────────────────────┐
│              LISTENING                       │
│           (pulse in animation)               │
│                                             │
│  After 2s timeout                           │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│               THINKING                       │
│          (wobble/glow animation)             │
│          Duration: 600ms                     │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│                SPEAKING                      │
│      (pulse out synced to audio level)       │
│          Duration: 2500ms                    │
└────────────────┬────────────────────────────┘
                 │
                 │ tap Mic (interrupt)
                 ▼
┌─────────────────────────────────────────────┐
│              LISTENING                       │
│          (barge-in within 150ms)             │
└─────────────────────────────────────────────┘
```

### States

- **idle**: Subtle breathing animation
- **listening**: Radial pulse in (shrinks and expands)
- **thinking**: Gentle wobble with slow glow
- **speaking**: Pulse out synced to mock audio level (0-1)

## Getting Started

### Prerequisites

- Node.js 18+
- iOS Simulator (for iOS testing)
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev:ios

# Or for development
npm start
```

### Available Scripts

```bash
npm run dev:ios      # Run on iOS simulator
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run typecheck    # Check TypeScript types
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
```

## Project Structure

```
src/
├── app/
│   └── App.tsx                    # Root app component
├── screens/
│   └── VoiceSessionScreen.tsx     # Main voice session screen
├── components/
│   ├── AnimatedCircle.tsx         # Voice state circle animation
│   ├── ActionBar.tsx              # Bottom action bar
│   └── ActionButton.tsx           # Reusable icon button
├── hooks/
│   ├── useVoiceSession.ts         # State machine orchestration
│   └── useHaptics.ts              # Haptic feedback wrapper
├── state/
│   ├── voiceStore.ts              # Zustand store + state machine
│   └── __tests__/
│       └── voiceStore.test.ts     # State machine unit tests
├── theme/
│   └── index.ts                   # Design system (colors, spacing)
└── utils/
    ├── time.ts                    # Time utilities
    └── accessibility.ts           # Accessibility helpers
```

## Architecture

### State Management

- **Zustand**: Minimal, predictable state store
- **Pure state machine**: `transitionState()` function with no side effects
- **Orchestration**: `useVoiceSession` hook manages timers and transitions

### Animations

- **Reanimated 3**: High-performance animations
- **State-driven**: Pure presentational components driven by props
- **60fps**: Smooth animations on iPhone simulator

### Accessibility

- VoiceOver labels for all interactive elements
- Sufficient contrast ratios
- Haptic feedback on button presses
- Dynamic type support

## Testing

Unit tests for the state machine logic:

```bash
npm run test
```

All state transitions are covered in `src/state/__tests__/voiceStore.test.ts`.

## Future Integration Points

The codebase is structured to easily integrate:

- **WebRTC**: Replace mock audio levels in `useVoiceSession`
- **STT (Speech-to-Text)**: Add listeners in the `listening` state
- **TTS (Text-to-Speech)**: Drive the `speaking` state from actual audio
- **LLM**: Connect to your language model from the `thinking` state

## License

GNU GENERAL PUBLIC LICENSE v3 (see `LICENSE` file for details)
