import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { useHaptics } from '../hooks/useHaptics';
import { a11y } from '../utils/accessibility';

interface ActionBarProps {
  onMicPress: () => void;
  onVideoPress: () => void;
  onMorePress: () => void;
  onEndPress: () => void;
  isVideoOn: boolean;
}

/**
 * Bottom action bar with four action buttons
 */
export const ActionBar: React.FC<ActionBarProps> = ({
  onMicPress,
  onVideoPress,
  onMorePress,
  onEndPress,
  isVideoOn: _isVideoOn,
}) => {
  const { impact } = useHaptics();

  const handleMicPress = () => {
    impact('medium');
    onMicPress();
  };

  const handleVideoPress = () => {
    impact('light');
    onVideoPress();
  };

  const handleMorePress = () => {
    impact('light');
    onMorePress();
  };

  const handleEndPress = () => {
    impact('medium');
    onEndPress();
  };

  return (
    <View style={styles.container}>
      <ActionButton
        icon="videocam"
        onPress={handleVideoPress}
        accessibilityLabel={a11y.labels.videoButton}
        accessibilityHint={a11y.hints.videoButton}
      />
      <ActionButton
        icon="mic"
        onPress={handleMicPress}
        accessibilityLabel={a11y.labels.micButton}
        accessibilityHint={a11y.hints.micButton}
      />
      <ActionButton
        icon="ellipsis-horizontal"
        onPress={handleMorePress}
        accessibilityLabel={a11y.labels.moreButton}
        accessibilityHint={a11y.hints.moreButton}
      />
      <ActionButton
        icon="close"
        onPress={handleEndPress}
        accessibilityLabel={a11y.labels.endButton}
        accessibilityHint={a11y.hints.endButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
});

