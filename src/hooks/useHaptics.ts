import * as Haptics from 'expo-haptics';

/**
 * Custom hook for consistent haptic feedback across the app
 */
export const useHaptics = () => {
  const triggerImpact = (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (style === 'light') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (style === 'heavy') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const triggerSelection = () => {
    Haptics.selectionAsync();
  };

  const triggerNotification = (type: 'success' | 'warning' | 'error' = 'success') => {
    switch (type) {
      case 'success':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  };

  return {
    impact: triggerImpact,
    selection: triggerSelection,
    notification: triggerNotification,
  };
};

