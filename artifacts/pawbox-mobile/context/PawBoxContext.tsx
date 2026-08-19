import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

export type PetType = 'dog' | 'cat' | 'rabbit';
export type Pet = { name: string; type: PetType; age: string; allergies: string; breed?: string; weight?: string; activity?: string };
export type Recommendation = { id: string; name: string; subtitle: string; vet: string; price: number; color: string; icon: 'bone' | 'fish' | 'leaf' };
export type Subscription = { id: string; petName: string; foodName: string; plan: string; price: number; nextDelivery: string };
export type CartItem = { id: string; name: string; category: string; price: number; quantity: number; color: string };
export type Reminder = { id: string; title: string; date: string; type: string; done: boolean };
type State = { pet: Pet | null; pets: Pet[]; subscription: Subscription | null; cart: CartItem[]; reminders: Reminder[]; hydrated: boolean; savePet: (pet: Pet) => void; addPet: (pet: Pet) => void; clearPet: () => void; addToCart: (item: Omit<CartItem, 'quantity'>) => void; removeFromCart: (id: string) => void; toggleReminder: (id: string) => void; startSubscription: (food: Recommendation, plan: string) => void; cancelSubscription: () => void };

const STORAGE_KEY = 'pawbox-state-v1';
const Context = createContext<State | null>(null);

export const recommendations: Record<PetType, Recommendation[]> = {
  dog: [
    { id: 'dog-1', name: 'Chicken & Sweet Potato', subtitle: 'Gentle, complete nutrition', vet: 'Dr. Sarah Chen, DVM', price: 34, color: '#F7D6B7', icon: 'bone' },
    { id: 'dog-2', name: 'Salmon & Brown Rice', subtitle: 'For a shiny coat', vet: 'Dr. Mike Rodriguez, DVM', price: 38, color: '#D9E6D0', icon: 'fish' },
  ],
  cat: [
    { id: 'cat-1', name: 'Tuna & Chicken Mix', subtitle: 'High-protein goodness', vet: 'Dr. Emma Wilson, DVM', price: 32, color: '#F5D5CF', icon: 'fish' },
    { id: 'cat-2', name: 'Sensitive Stomach Formula', subtitle: 'Comfort for picky eaters', vet: 'Dr. James Park, DVM', price: 36, color: '#DCE4D5', icon: 'leaf' },
  ],
  rabbit: [
    { id: 'rabbit-1', name: 'Timothy Hay & Herbs', subtitle: 'Fresh, fiber-rich blend', vet: 'Dr. Lisa Thompson, DVM', price: 28, color: '#DDE7C9', icon: 'leaf' },
    { id: 'rabbit-2', name: 'Organic Veggie Medley', subtitle: 'A colorful daily mix', vet: 'Dr. Lisa Thompson, DVM', price: 30, color: '#F2DAB7', icon: 'leaf' },
  ],
};

export function PawBoxProvider({ children }: { children: React.ReactNode }) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 'r1', title: 'Annual vaccination', date: 'Sep 12, 2026', type: 'Vaccination', done: false },
    { id: 'r2', title: 'Food delivery', date: 'Sep 02, 2026', type: 'Delivery', done: false },
  ]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        const value = JSON.parse(raw) as { pet?: Pet; pets?: Pet[]; subscription?: Subscription | null; cart?: CartItem[]; reminders?: Reminder[] };
        setPet(value.pet ?? null);
        setPets(value.pets ?? (value.pet ? [value.pet] : []));
        setSubscription(value.subscription ?? null);
        setCart(value.cart ?? []);
        setReminders(value.reminders ?? []);
      }
      setHydrated(true);
    }).catch(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ pet, pets, subscription, cart, reminders }));
  }, [pet, pets, subscription, cart, reminders, hydrated]);

  const value = useMemo(() => ({
    pet, pets, subscription, cart, reminders, hydrated,
    savePet: (nextPet: Pet) => { setPet(nextPet); setPets((current) => current.length ? [nextPet, ...current.slice(1)] : [nextPet]); },
    addPet: (nextPet: Pet) => setPets((current) => [...current, nextPet]),
    clearPet: () => setPet(null),
    addToCart: (item: Omit<CartItem, 'quantity'>) => setCart((current) => { const existing = current.find((cartItem) => cartItem.id === item.id); return existing ? current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem) : [...current, { ...item, quantity: 1 }]; }),
    removeFromCart: (id: string) => setCart((current) => current.flatMap((item) => item.id === id && item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : item.id === id ? [] : [item])),
    toggleReminder: (id: string) => setReminders((current) => current.map((reminder) => reminder.id === id ? { ...reminder, done: !reminder.done } : reminder)),
    startSubscription: (food: Recommendation, plan: string) => {
      if (!pet) return;
      setSubscription({ id: Date.now().toString(), petName: pet.name, foodName: food.name, plan, price: plan === 'Every 2 weeks' ? food.price + 4 : food.price, nextDelivery: 'Sep 02, 2026' });
      Alert.alert('You are all set', 'Your first PawBox delivery is on its way.');
    },
    cancelSubscription: () => {
      setSubscription(null);
      Alert.alert('Subscription paused', 'You can restart a PawBox plan any time.');
    },
  }), [pet, subscription, hydrated]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function usePawBox() {
  const value = useContext(Context);
  if (!value) throw new Error('usePawBox must be used inside PawBoxProvider');
  return value;
}