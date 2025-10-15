import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: any;
}

const HomeScreen = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<
    'standard' | 'express'
  >('standard');
  const [promoCode, setPromoCode] = useState('TASTE2025');
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Gnocchi with mushroom gravy',
      description: '250g',
      price: 5.6,
      quantity: 1,
      image: require('../../assets/p1.png'),
    },
    {
      id: 2,
      name: 'Wenzel with raspberries and currants',
      description: '170g',
      price: 3.8,
      quantity: 1,
      image: require('../../assets/p2.png'),
    },
    {
      id: 3,
      name: 'Freshly squeezed orange juice',
      description: '350ml',
      price: 2.3,
      quantity: 1,
      image: require('../../assets/p3.png'),
    },
  ]);

  const updateQuantity = (id: number, increment: boolean) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          const newQuantity = increment
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const calculateTotal = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const deliveryFee = selectedDelivery === 'express' ? 2.0 : 0;
    return (subtotal + deliveryFee).toFixed(2);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Cart, <Text style={styles.titleCount}>3 items</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Options */}
        <View style={styles.deliveryContainer}>
          <TouchableOpacity
            style={[
              styles.deliveryOption,
              selectedDelivery === 'standard' && styles.deliverySelected,
            ]}
            onPress={() => setSelectedDelivery('standard')}
          >
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryText}>
                Standard delivery, 40–60 minutes
              </Text>
              <Text style={styles.deliveryPrice}>Free</Text>
            </View>
            <View
              style={[
                styles.radio,
                selectedDelivery === 'standard' && styles.radioSelected,
              ]}
            >
              {selectedDelivery === 'standard' && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deliveryOption]}
            onPress={() => setSelectedDelivery('express')}
          >
            <View style={styles.deliveryInfo}>
              <View style={styles.expressLabelContainer}>
                <Text style={styles.deliveryText}>Express, 15-25 minutes</Text>
                <Text style={styles.expressIcon}>⚡</Text>
              </View>
              <Text style={styles.deliveryPrice}>$2.00</Text>
            </View>
            <View
              style={[
                styles.radio,
                selectedDelivery === 'express' && styles.radioSelected,
              ]}
            >
              {selectedDelivery === 'express' && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <View style={styles.itemsContainer}>
          {items.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemImageContainer}>
                <Image source={item.image} style={styles.itemImage} />
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>
                  {item.name} {', '}
                </Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, false)}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, true)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Promocode"
            placeholderTextColor="#999"
            editable={false}
          />
          <Text style={styles.promoValue}>{promoCode}</Text>
          <Text style={styles.promoCheck}>✓</Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmPrice}>${calculateTotal()}</Text>
          <Text style={styles.confirmText}>Confirm order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 50 : 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 34,
    color: '#000',
    fontFamily: 'Tinos-Regular',
    letterSpacing: -0.5,
  },
  titleCount: {
    color: '#999',
    fontFamily: 'Tinos-Regular',
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    marginRight: -10,
  },
  closeText: {
    fontSize: 32,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  deliveryContainer: {
    gap: 12,
  },
  deliveryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  deliverySelected: {
    backgroundColor: '#FFF',
  },
  deliveryInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  expressLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,

    flex: 1,
  },
  deliveryText: {
    color: '#000',
    fontFamily: 'Tinos-Regular',
    fontSize: 14,
  },

  expressIcon: {
    fontSize: 16,
  },
  deliveryPrice: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Tinos-Bold',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFF',
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#FF9056',
    backgroundColor: '#FF9056',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  itemsContainer: {
    paddingTop: 24,
    gap: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#F5E8DC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Tinos-Regular',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 15,
    color: '#999',
    fontFamily: 'Tinos-Regular',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 17,
    color: '#FF9056',
    fontFamily: 'Tinos-Bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Tinos-Regular',
  },
  quantityText: {
    fontSize: 17,
    color: '#000',
    minWidth: 20,
    textAlign: 'center',
    fontFamily: 'Tinos-Regular',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
  },
  promoInput: {
    flex: 1,
    fontSize: 15,
    color: '#999',
    fontFamily: 'Tinos-Regular',
  },
  promoValue: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Tinos-Bold',
    marginRight: 8,
  },
  promoCheck: {
    fontSize: 18,
    color: '#FF9056',
  },
  bottomSpacing: {
    height: Platform.OS === 'android' ? 100 : 80,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: Platform.OS === 'android' ? 60 : 24,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9056',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 24,
  },
  confirmPrice: {
    fontSize: 20,
    fontFamily: 'Tinos-Bold',
    color: '#FFF',
  },
  confirmText: {
    fontSize: 17,
    fontFamily: 'Tinos-Bold',
    color: '#FFF',
  },
});

export default HomeScreen;
