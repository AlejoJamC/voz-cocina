import React, { useState } from 'react';
import { StyleSheet, View, Modal, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedCircle } from '../components/AnimatedCircle';
import { ActionBar } from '../components/ActionBar';
import { useVoiceSession } from '../hooks/useVoiceSession';
import { useVoiceStore } from '../state/voiceStore';
import { colors, spacing } from '../theme';

/**
 * Main voice session screen
 * Features:
 * - Full-screen black background
 * - Central animated circle reflecting voice state
 * - Bottom action bar with 4 buttons
 */
export const VoiceSessionScreen: React.FC = () => {
  const { state, isVideoOn, onMicPress, toggleVideo } = useVoiceSession();
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);
  const audioLevel = useVoiceStore((state) => state.audioLevel);

  const handleVideoPress = () => {
    toggleVideo();
  };

  const handleMorePress = () => {
    setIsMoreModalVisible(true);
  };

  const handleEndPress = () => {
    Alert.alert('End Session', 'Are you sure you want to end the session?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End',
        style: 'destructive',
        onPress: () => {
          useVoiceStore.getState().reset();
        },
      },
    ]);
  };

  const closeMoreModal = () => {
    setIsMoreModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Central animated circle */}
        <View style={styles.circleContainer}>
          <AnimatedCircle state={state} audioLevel={audioLevel} />
        </View>

        {/* Bottom action bar */}
        <ActionBar
          onMicPress={onMicPress}
          onVideoPress={handleVideoPress}
          onMorePress={handleMorePress}
          onEndPress={handleEndPress}
          isVideoOn={isVideoOn}
        />
      </View>

      {/* More options modal (placeholder) */}
      <Modal
        visible={isMoreModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeMoreModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>More Options</Text>
            <Text style={styles.modalText}>Additional options will be added here.</Text>
            <Text style={styles.modalButton} onPress={closeMoreModal}>
              Close
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  modalText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: spacing.xl,
  },
  modalButton: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    padding: spacing.md,
  },
});

