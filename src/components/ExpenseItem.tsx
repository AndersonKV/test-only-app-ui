import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface ExpenseItemProps {
  icon: string;
  title: string;
  time: string;
  amount: string;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  icon,
  title,
  time,
  amount,
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <Icon name={icon} size={20} color="#333" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    color: '#000',
  },
  time: {
    color: '#999',
    fontSize: 12,
  },
  amount: {
    fontWeight: '600',
  },
});
