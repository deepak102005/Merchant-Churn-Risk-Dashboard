import { Merchant, mockMerchants as initialMerchants } from './mock-data';

// Using a global variable ensures data persists across API route hot-reloads in dev
const globalAny = global as any;

if (!globalAny.merchants) {
  globalAny.merchants = [...initialMerchants];
}

export const db = {
  merchants: {
    findMany: () => globalAny.merchants as Merchant[],
    create: (data: Omit<Merchant, 'id'>) => {
      const newMerchant = {
        ...data,
        id: `MCH-${1000 + globalAny.merchants.length + 1}`
      };
      globalAny.merchants = [newMerchant, ...globalAny.merchants];
      return newMerchant;
    }
  },
  notifications: {
    findMany: () => [
      { id: 1, text: "High churn risk detected for CoffeeCo", read: false },
      { id: 2, text: "New merchant joined: TechNova", read: false },
    ],
    markAllRead: () => {
      // In a real DB, update all to read: true
      return { success: true };
    }
  }
};
