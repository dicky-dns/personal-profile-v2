"use client";

import { useEffect, useState } from "react";

type BatteryManagerLike = {
  level: number;
  addEventListener: (event: "levelchange", listener: () => void) => void;
  removeEventListener: (event: "levelchange", listener: () => void) => void;
};

declare global {
  interface Navigator {
    getBattery?: () => Promise<BatteryManagerLike>;
  }
}

const LOW_BATTERY_THRESHOLD = 0.1;

export default function BatteryModal() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let battery: BatteryManagerLike | null = null;
    let mounted = true;

    const handleLevelChange = () => {
      if (!battery || !mounted) return;
      const nextLevel = battery.level;
      setBatteryLevel(nextLevel);
      if (nextLevel >= LOW_BATTERY_THRESHOLD) {
        setIsDismissed(false);
      }
    };

    const initBattery = async () => {
      if (typeof navigator === "undefined" || !navigator.getBattery) return;
      try {
        battery = await navigator.getBattery();
        if (!mounted) return;
        setBatteryLevel(battery.level);
        if (battery.level >= LOW_BATTERY_THRESHOLD) {
          setIsDismissed(false);
        }
        battery.addEventListener("levelchange", handleLevelChange);
      } catch {
        // Battery API not available or blocked.
      }
    };

    initBattery();

    return () => {
      mounted = false;
      if (battery) {
        battery.removeEventListener("levelchange", handleLevelChange);
      }
    };
  }, []);

  const shouldShow =
    batteryLevel !== null &&
    batteryLevel < LOW_BATTERY_THRESHOLD &&
    !isDismissed;

  if (!shouldShow) return null;

  const percentage = Math.round(batteryLevel * 100);

  return (
    <div className="battery-modal" role="dialog" aria-live="polite">
      <div className="battery-modal__card">
        <button
          type="button"
          className="battery-modal__close"
          aria-label="Close"
          onClick={() => setIsDismissed(true)}
        >
          ✕
        </button>
        <div className="battery-modal__title">
          <span className="material-icons battery-modal__icon" aria-hidden>
            bolt
          </span>
          Low Battery
        </div>
        <div className="battery-modal__message">
          Your device battery is at {percentage}%. Consider charging soon.
        </div>
        <div className="battery-modal__progress" aria-hidden>
          <span style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
}
