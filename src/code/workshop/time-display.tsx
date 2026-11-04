"use client";

// Text override that displays the current time, with a toggle to switch between local time and a user-selected location
import { useEffect, useState, startTransition } from "react";
import { addPropertyControls, ControlType } from "@/deframer";

interface TimeTextProps {
  useCustomLocation?: boolean;
  location?: string;
  customLocation?: string;
  font?: any;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * TimeDisplay
 *
 */
function TimeDisplay(
  props: TimeTextProps & {
    [
      ControlDefaultKey in "useCustomLocation" | "location" | "customLocation" | "color"
    ]-?: TimeTextProps[ControlDefaultKey] extends infer ControlDefaultValue
      ? ControlDefaultValue extends undefined
        ? never
        : ControlDefaultValue
      : never;
  },
) {
  const { useCustomLocation, location, customLocation, font, color, style } = props;
  const [time, setTime] = useState("");

  // List of supported IANA time zones for dropdown

  useEffect(() => {
    let timer: number;
    function updateTime() {
      if (useCustomLocation) {
        if (location === "Custom") {
          startTransition(() => setTime("Custom not supported"));
          return;
        }
        try {
          const now = new Date();
          const formatted = new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: location,
          }).format(now);
          startTransition(() => setTime(formatted));
        } catch {
          startTransition(() => setTime("Invalid location"));
        }
      } else {
        const now = new Date();
        startTransition(() => setTime(now.toLocaleTimeString()));
      }
    }
    updateTime();
    timer = window.setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [useCustomLocation, location]);

  // Map location to city label
  const cityLabels: Record<string, string> = {
    "Europe/London": "LON",
    "America/New_York": "NY",
    "America/Los_Angeles": "LA",
    "Europe/Paris": "PAR",
    "Asia/Tokyo": "TYO",
    "Australia/Sydney": "SYD",
    "Asia/Kolkata": "CCU",
    "Europe/Berlin": "BER",
    "America/Chicago": "CHI",
    "America/Sao_Paulo": "SAO",
    "Africa/Johannesburg": "JNB",
    "Pacific/Auckland": "AKL",
  };
  let cityLabel = "";
  if (useCustomLocation) {
    if (location === "Custom") {
      cityLabel = customLocation || "Custom";
    } else {
      cityLabel = cityLabels[location] || location;
    }
  }

  return (
    <span
      style={{
        ...font,
        color,
        ...style,
        width: "max-content",
        minWidth: "max-content",
        display: "inline-block",
      }}
    >
      {time} {useCustomLocation ? cityLabel : ""}
    </span>
  );
}
declare namespace TimeDisplay {
  type ControlDefaultCheck<
    T extends {
      [
        ControlDefaultKey in "useCustomLocation" | "location" | "customLocation" | "color"
      ]-?: TimeTextProps[ControlDefaultKey] extends infer ControlDefaultValue
        ? ControlDefaultValue extends undefined
          ? never
          : ControlDefaultValue
        : never;
    },
  > = T;
  type ControlDefaultValues = ControlDefaultCheck<{
    useCustomLocation: false;
    location: "Europe/London";
    customLocation: "Europe/Lisbon";
    color: "#000000";
  }>;
  let defaultProps: {
    [
      ControlDefaultKey in "useCustomLocation" | "location" | "customLocation" | "color"
    ]-?: TimeTextProps[ControlDefaultKey] extends infer ControlDefaultValue
      ? ControlDefaultValue extends undefined
        ? never
        : ControlDefaultValue
      : never;
  };
}
export { TimeDisplay as default };

addPropertyControls(TimeDisplay, {
  useCustomLocation: {
    type: ControlType.Boolean,
    title: "Custom Location",
    defaultValue: false,
    enabledTitle: "On",
    disabledTitle: "Local",
  },
  location: {
    type: ControlType.Enum,
    title: "Location",
    options: [
      "Europe/London",
      "America/New_York",
      "America/Los_Angeles",
      "Europe/Paris",
      "Asia/Tokyo",
      "Australia/Sydney",
      "Asia/Kolkata",
      "Europe/Berlin",
      "America/Chicago",
      "America/Sao_Paulo",
      "Africa/Johannesburg",
      "Pacific/Auckland",
      "Custom",
    ],
    optionTitles: [
      "London",
      "New York",
      "Los Angeles",
      "Paris",
      "Tokyo",
      "Sydney",
      "Kolkata",
      "Berlin",
      "Chicago",
      "Sao Paulo",
      "Johannesburg",
      "Auckland",
      "Custom...",
    ],
    defaultValue: "Europe/London",
    hidden: ({ useCustomLocation }: any) => !useCustomLocation,
  },
  customLocation: {
    type: ControlType.String,
    title: "Custom Location",
    placeholder: "e.g. Europe/Lisbon",
    defaultValue: "Europe/Lisbon",
    hidden: ({ useCustomLocation, location }: any) => !useCustomLocation || location !== "Custom",
  },
  font: {
    type: ControlType.Font,
    title: "Font",
    controls: "extended",
    defaultFontType: "sans-serif",
    defaultValue: {
      fontSize: "32px",
      variant: "Light",
      letterSpacing: "-0.03em",
      lineHeight: "1em",
    },
  },
  color: {
    type: ControlType.Color,
    title: "Color",
    defaultValue: "#000000",
  },
});
