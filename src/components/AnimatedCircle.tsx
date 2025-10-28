import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { VoiceState } from '../state/voiceStore';
import { colors } from '../theme';

interface AnimatedCircleProps {
  state: VoiceState;
  audioLevel?: number;
  style?: ViewStyle;
}

/**
 * Animated circle component representing voice state
 * Pure presentational component driven by props
 */
export const AnimatedCircle: React.FC<AnimatedCircleProps> = ({
  state,
  audioLevel = 0,
  style,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.4);
  const rotation = useSharedValue(0);

  // State-based color
  const getColorForState = (): string => {
    switch (state) {
      case 'idle':
        return colors.voiceIdle;
      case 'listening':
        return colors.voiceListening;
      case 'thinking':
        return colors.voiceThinking;
      case 'speaking':
        return colors.voiceSpeaking;
      default:
        return colors.voiceIdle;
    }
  };

  // Animate based on state
  useEffect(() => {
    switch (state) {
      case 'idle':
        // Subtle breathing animation
        scale.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
        opacity.value = withRepeat(
          withSequence(
            withTiming(0.6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.4, { duration: 2000, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
        break;

      case 'listening':
        // Radial pulse in (shrinks and expands)
        scale.value = withRepeat(
          withSequence(
            withTiming(0.8, { duration: 800, easing: Easing.out(Easing.ease) }),
            withTiming(1.2, { duration: 800, easing: Easing.in(Easing.ease) })
          ),
          -1,
          true
        );
        opacity.value = withRepeat(
          withSequence(
            withTiming(0.8, { duration: 800 }),
            withTiming(0.5, { duration: 800 })
          ),
          -1,
          true
        );
        break;

      case 'thinking':
        // Gentle wobble with slow glow
        scale.value = withRepeat(
          withSequence(
            withTiming(1.15, { duration: 400, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
        rotation.value = withRepeat(
          withSequence(
            withTiming(3, { duration: 400, easing: Easing.inOut(Easing.ease) }),
            withTiming(-3, { duration: 400, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          true
        );
        opacity.value = withRepeat(
          withSequence(
            withTiming(0.7, { duration: 1000 }),
            withTiming(0.5, { duration: 1000 })
          ),
          -1,
          true
        );
        break;

      case 'speaking':
        // Pulse out synced to audio level
        if (audioLevel > 0) {
          const targetScale = 1 + audioLevel * 0.3; // Scale based on audio level
          scale.value = withTiming(targetScale, { duration: 100 });
          opacity.value = interpolate(audioLevel, [0, 1], [0.5, 0.9]);
        } else {
          scale.value = 1;
          opacity.value = 0.5;
        }
        break;

      default:
        scale.value = 1;
        opacity.value = 0.4;
        rotation.value = 0;
    }
  }, [state, audioLevel, scale, opacity, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.circle,
          { backgroundColor: getColorForState() },
          animatedStyle,
        ]}
      />
      {/* Glow effect layer */}
      <Animated.View
        style={[
          styles.glow,
          {
            backgroundColor: getColorForState(),
            opacity: opacity.value * 0.3,
          },
          {
            transform: [{ scale: scale.value * 1.2 }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 9999,
    position: 'absolute',
  },
  glow: {
    width: 200,
    height: 200,
    borderRadius: 9999,
    position: 'absolute',
  },
});

