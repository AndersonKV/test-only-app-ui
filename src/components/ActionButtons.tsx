import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const actions = [
  { icon: 'arrow-up-right', label: 'Send' },
  { icon: 'arrow-down-left', label: 'Request' },
  { icon: 'credit-card', label: 'TopUp' },
  { icon: 'more-horizontal', label: 'More' },
];

export const ActionButtons = () => {
  return (
    <View style={styles.container}>
      {actions.map((item, idx) => (
        <TouchableOpacity key={idx} style={styles.action}>
          <Icon name={item.icon} size={20} color="#000" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  action: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
});
