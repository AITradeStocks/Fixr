"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "@/lib/auth";
import { api } from "@/lib/api";
import { usePathname } from "next/navigation";

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

interface CookieConsentContextType {
  consent: CookieConsent | null;
  hasChoice: boolean;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  acceptAll: () => Promise<void>;
  rejectOptional: () => Promise<void>;
  saveCustomConsent: (analytics: boolean, marketing: boolean) => Promise<void>;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "fxr_cookie_consent";

const defaultConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString(),
};

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasChoice, setHasChoice] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Load initial consent from localStorage or DB
  useEffect(() => {
    const loadConsent = async () => {
      // 1. Check local storage
      const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
      let localChoice: CookieConsent | null = null;
      if (localRaw) {
        try {
          localChoice = JSON.parse(localRaw);
        } catch (e) {
          console.error("Failed to parse local cookie consent", e);
        }
      }

      // 2. Check active user session
      const session = getSession();
      if (session && session.token) {
        try {
          // Fetch from database user me
          let dbConsent: any = null;
          if (session.role === "contractor") {
            const contractor = (await api.getContractorMe()) as any;
            dbConsent = contractor?.cookieConsent;
          } else {
            const customer = (await api.me()) as any;
            dbConsent = customer?.cookieConsent;
          }

          if (dbConsent) {
            // DB consent wins if it exists
            setConsent(dbConsent);
            setHasChoice(true);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dbConsent));
            return;
          }
        } catch (error) {
          console.error("Failed to sync cookie consent with DB on mount", error);
        }
      }

      if (localChoice) {
        setConsent(localChoice);
        setHasChoice(true);
      } else {
        // No choice made yet
        setConsent(defaultConsent);
        setHasChoice(false);
      }
    };

    loadConsent();
  }, []);

  // Sync state if user registers or logs in (session state changes)
  useEffect(() => {
    const syncWithBackend = async () => {
      const session = getSession();
      if (!session || !session.token || !consent || !hasChoice) return;

      try {
        // Post the local choice to the backend DB to keep them in sync
        await api.updateCookieConsent(consent);
        console.log("Successfully synced cookie consent with backend database.");
      } catch (error) {
        console.error("Failed to sync cookie consent with backend database", error);
      }
    };

    // Minor delay to let credentials settle
    const timer = setTimeout(() => {
      syncWithBackend();
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, hasChoice]); // Checks on path navigation changes (login/onboarding completions)

  // Side-effect: Act on cookie consent (e.g. init/destroy analytics)
  useEffect(() => {
    if (!consent || !hasChoice) return;

    if (consent.analytics) {
      console.log("[CookieConsent] Loading Analytics scripts (e.g. Google Analytics)...");
      // Mock tracking scripts setup
      (window as any).gaTrackingEnabled = true;
    } else {
      console.log("[CookieConsent] Disabling Analytics scripts.");
      (window as any).gaTrackingEnabled = false;
    }

    if (consent.marketing) {
      console.log("[CookieConsent] Loading Marketing/Ads scripts (e.g. Meta Pixel)...");
      (window as any).metaPixelEnabled = true;
    } else {
      console.log("[CookieConsent] Disabling Marketing/Ads scripts.");
      (window as any).metaPixelEnabled = false;
    }
  }, [consent, hasChoice]);

  const saveConsentState = async (newConsent: CookieConsent) => {
    setConsent(newConsent);
    setHasChoice(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConsent));

    // Try to update DB if authenticated
    const session = getSession();
    if (session && session.token) {
      try {
        await api.updateCookieConsent(newConsent);
      } catch (error) {
        console.error("Error updating cookie consent in database", error);
      }
    }
  };

  const acceptAll = async () => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      updatedAt: new Date().toISOString(),
    };
    await saveConsentState(newConsent);
  };

  const rejectOptional = async () => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString(),
    };
    await saveConsentState(newConsent);
  };

  const saveCustomConsent = async (analytics: boolean, marketing: boolean) => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics,
      marketing,
      updatedAt: new Date().toISOString(),
    };
    await saveConsentState(newConsent);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasChoice,
        isModalOpen,
        setModalOpen,
        acceptAll,
        rejectOptional,
        saveCustomConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
