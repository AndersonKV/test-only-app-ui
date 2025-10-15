import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Icon name="logo-apple" size={20} color="#fff" />
        <Text style={styles.cardNumber}>•••• 7845</Text>
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>$8,182.80</Text>
      </View>
      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.name}>Muminul Hoque</Text>
        </View>
        <View>
          <Text style={styles.expDate}>Exp. Date</Text>
          <Text style={styles.expDateValue}>08/26</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#7B61FF',
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 16,
  },
  balanceSection: {
    marginVertical: 20,
  },
  balanceLabel: {
    color: '#ddd',
    fontSize: 14,
  },
  balanceValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  name: {
    color: '#fff',
    fontWeight: '500',
  },
  expDate: {
    color: '#ddd',
    fontSize: 12,
  },
  expDateValue: {
    color: '#fff',
    fontWeight: '500',
  },
});
