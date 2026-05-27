import React, { createContext, useReducer, useEffect } from 'react';
import { mockCustomers, mockPackages, mockInvoices } from './mockData';

export const AppContext = createContext();

const STORAGE_KEY = 'cynix_app_data';

const defaultState = {
  packages: mockPackages,
  customers: mockCustomers,
  invoices: mockInvoices,
  currentUser: null,
  notifications: [],
};

// Load persisted state from localStorage, falling back to defaults
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults so any new fields added later are included
      return {
        ...defaultState,
        ...parsed,
      };
    }
  } catch (e) {
    console.warn('Failed to load saved state, using defaults:', e);
  }
  return defaultState;
}

// Save state to localStorage
function saveState(state) {
  try {
    // Save everything except currentUser (force re-login after refresh for security)
    const toSave = {
      packages: state.packages,
      customers: state.customers,
      invoices: state.invoices,
      notifications: state.notifications,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'SCAN_PACKAGE_IN':
      return { ...state, packages: [action.payload, ...state.packages] };
    case 'UPDATE_PACKAGE_STATUS': {
      const updatedPackages = state.packages.map(p => {
        if (p.id === action.payload.packageId) {
          const newStatus = action.payload.status;
          return {
            ...p,
            status: newStatus,
            timeline: [
              ...p.timeline,
              { status: newStatus, timestamp: new Date().toISOString() }
            ]
          };
        }
        return p;
      });
      return { ...state, packages: updatedPackages };
    }
    case 'SIMULATE_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'ASSIGN_TO_DRIVER': {
      const updated = state.packages.map(p => p.id === action.payload.packageId ? { ...p, driverId: action.payload.driverId } : p);
      return { ...state, packages: updated };
    }
    case 'MARK_DELIVERED': {
       const updated = state.packages.map(p => {
          if (p.id === action.payload.packageId) {
             return {
                ...p,
                status: 'Delivered',
                pod: action.payload.podData, // base64 image or signature
                timeline: [
                   ...p.timeline,
                   { status: 'Delivered', timestamp: new Date().toISOString() }
                ]
             }
          }
          return p;
       });
       return { ...state, packages: updated };
    }
    case 'PAY_INVOICE': {
      const updatedInvoices = state.invoices.map(inv => {
        if (inv.id === action.payload.invoiceId) {
          return { ...inv, status: 'Paid', paymentDate: new Date().toISOString() };
        }
        return inv;
      });
      return { ...state, invoices: updatedInvoices };
    }
    case 'RESET_DATA':
      localStorage.removeItem(STORAGE_KEY);
      return { ...defaultState, currentUser: state.currentUser };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, loadState);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
