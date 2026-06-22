import React, { useCallback, useEffect, useState } from "react";
import "./PwaInstallPrompt.css";

const DISMISS_KEY = "calvary-prema-pwa-install-dismissed-at";
const INSTALLED_KEY = "calvary-prema-pwa-installed";
const DISMISS_COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000;

function isStandaloneDisplay() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function wasDismissedRecently() {
  try {
    const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
    return dismissedAt > 0 && Date.now() - dismissedAt < DISMISS_COOLDOWN_MS;
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    // Ignore storage restrictions; the prompt still remains user-controlled.
  }
}

function wasInstalledRemembered() {
  try {
    return window.localStorage.getItem(INSTALLED_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberInstalled() {
  try {
    window.localStorage.setItem(INSTALLED_KEY, "true");
  } catch {
    // The appinstalled event is enough for the current session.
  }
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const alreadyInstalled = isStandaloneDisplay() || wasInstalledRemembered();
    setInstalled(alreadyInstalled);

    const handleBeforeInstallPrompt = (event) => {
      if (isStandaloneDisplay()) return;

      event.preventDefault();
      setDeferredPrompt(event);
      setBannerVisible(!wasDismissedRecently());
    };

    const handleAppInstalled = () => {
      rememberInstalled();
      setInstalled(true);
      setBannerVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    setBannerVisible(false);
    deferredPrompt.prompt();

    try {
      const choice = await deferredPrompt.userChoice;
      if (choice?.outcome === "accepted") {
        rememberInstalled();
        setInstalled(true);
      } else {
        rememberDismissal();
      }
    } finally {
      setDeferredPrompt(null);
    }
  }, [deferredPrompt]);

  const dismissBanner = useCallback(() => {
    rememberDismissal();
    setBannerVisible(false);
  }, []);

  if (!deferredPrompt || installed) return null;

  return (
    <>
      {bannerVisible ? (
        <aside className="pwa-install-banner" aria-label="Install app">
          <button
            type="button"
            className="pwa-install-banner__close"
            onClick={dismissBanner}
            aria-label="Dismiss install app prompt"
          >
            X
          </button>
          <div className="pwa-install-banner__copy">
            <strong>Install App</strong>
            <span>Calvary Prema Ministries</span>
          </div>
          <div className="pwa-install-banner__actions">
            <button type="button" className="pwa-install-banner__install" onClick={promptInstall}>
              Install
            </button>
            <button type="button" className="pwa-install-banner__later" onClick={dismissBanner}>
              Later
            </button>
          </div>
        </aside>
      ) : (
        <button type="button" className="pwa-install-fab" onClick={promptInstall}>
          Install App
        </button>
      )}
    </>
  );
}
