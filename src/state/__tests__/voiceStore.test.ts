import { describe, it, expect } from 'vitest';
import { transitionState } from '../voiceStore';

describe('Voice Store State Machine', () => {
  describe('TOGGLE_MIC', () => {
    it('should transition from idle to listening', () => {
      expect(transitionState('idle', 'TOGGLE_MIC')).toBe('listening');
    });

    it('should transition from listening to idle', () => {
      expect(transitionState('listening', 'TOGGLE_MIC')).toBe('idle');
    });

    it('should not change state from thinking', () => {
      expect(transitionState('thinking', 'TOGGLE_MIC')).toBe('thinking');
    });

    it('should not change state from speaking', () => {
      expect(transitionState('speaking', 'TOGGLE_MIC')).toBe('speaking');
    });
  });

  describe('START_THINKING', () => {
    it('should transition from listening to thinking', () => {
      expect(transitionState('listening', 'START_THINKING')).toBe('thinking');
    });

    it('should not change state from non-listening', () => {
      expect(transitionState('idle', 'START_THINKING')).toBe('idle');
      expect(transitionState('thinking', 'START_THINKING')).toBe('thinking');
      expect(transitionState('speaking', 'START_THINKING')).toBe('speaking');
    });
  });

  describe('START_SPEAKING', () => {
    it('should transition from thinking to speaking', () => {
      expect(transitionState('thinking', 'START_SPEAKING')).toBe('speaking');
    });

    it('should not change state from non-thinking', () => {
      expect(transitionState('idle', 'START_SPEAKING')).toBe('idle');
      expect(transitionState('listening', 'START_SPEAKING')).toBe('listening');
      expect(transitionState('speaking', 'START_SPEAKING')).toBe('speaking');
    });
  });

  describe('STOP_SPEAKING', () => {
    it('should transition from speaking to idle', () => {
      expect(transitionState('speaking', 'STOP_SPEAKING')).toBe('idle');
    });

    it('should not change state from non-speaking', () => {
      expect(transitionState('idle', 'STOP_SPEAKING')).toBe('idle');
      expect(transitionState('listening', 'STOP_SPEAKING')).toBe('listening');
      expect(transitionState('thinking', 'STOP_SPEAKING')).toBe('thinking');
    });
  });

  describe('INTERRUPT (barge-in)', () => {
    it('should transition from speaking to listening', () => {
      expect(transitionState('speaking', 'INTERRUPT')).toBe('listening');
    });

    it('should not change state from non-speaking', () => {
      expect(transitionState('idle', 'INTERRUPT')).toBe('idle');
      expect(transitionState('listening', 'INTERRUPT')).toBe('listening');
      expect(transitionState('thinking', 'INTERRUPT')).toBe('thinking');
    });
  });

  describe('RESET', () => {
    it('should always reset to idle from any state', () => {
      expect(transitionState('idle', 'RESET')).toBe('idle');
      expect(transitionState('listening', 'RESET')).toBe('idle');
      expect(transitionState('thinking', 'RESET')).toBe('idle');
      expect(transitionState('speaking', 'RESET')).toBe('idle');
    });
  });

  describe('unknown action', () => {
    it('should return current state for unknown actions', () => {
      expect(transitionState('idle', 'UNKNOWN_ACTION')).toBe('idle');
      expect(transitionState('listening', 'UNKNOWN_ACTION')).toBe('listening');
    });
  });
});

