import { useState, useEffect } from "react";
import { Plus, Minus, Eye, Type, RotateCcw, X, Accessibility } from "lucide-react";
import accessibilityIcon from "@/assets/accessibility-icon.png";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  largeText: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  largeText: false,
};

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("accessibilitySettings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  const applySettings = (s: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${s.fontSize}%`;
    
    // High contrast
    if (s.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    // Grayscale
    if (s.grayscale) {
      root.classList.add("grayscale-mode");
    } else {
      root.classList.remove("grayscale-mode");
    }
    
    // Highlight links
    if (s.highlightLinks) {
      root.classList.add("highlight-links");
    } else {
      root.classList.remove("highlight-links");
    }
    
    // Large text
    if (s.largeText) {
      root.classList.add("large-text");
    } else {
      root.classList.remove("large-text");
    }
  };

  const increaseFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 10, 150)
    }));
  };

  const decreaseFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 10, 80)
    }));
  };

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    if (key === "fontSize") return;
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-24 z-50 w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 rounded-full overflow-hidden"
        aria-label="Accessibility Options"
        title="Accessibility Options"
      >
        <img src={accessibilityIcon} alt="Accessibility" className="w-14 h-14 rounded-full object-cover" />
      </button>

      {/* Widget Panel */}
      {isOpen && (
        <div className="fixed right-4 bottom-44 z-50 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#2563eb] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              <span className="font-semibold">Accessibility</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded p-1 transition-colors"
              aria-label="Close accessibility menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options */}
          <div className="p-4 space-y-4">
            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Text Size ({settings.fontSize}%)
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-1 text-gray-700"
                  aria-label="Decrease text size"
                >
                  <Minus className="w-4 h-4" />
                  <span className="text-sm">A</span>
                </button>
                <button
                  onClick={increaseFontSize}
                  className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-1 text-gray-700"
                  aria-label="Increase text size"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-lg font-bold">A</span>
                </button>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-2">
              <ToggleOption
                label="High Contrast"
                icon={<Eye className="w-4 h-4" />}
                active={settings.highContrast}
                onClick={() => toggleSetting("highContrast")}
              />
              <ToggleOption
                label="Grayscale"
                icon={<Eye className="w-4 h-4" />}
                active={settings.grayscale}
                onClick={() => toggleSetting("grayscale")}
              />
              <ToggleOption
                label="Highlight Links"
                icon={<Type className="w-4 h-4" />}
                active={settings.highlightLinks}
                onClick={() => toggleSetting("highlightLinks")}
              />
              <ToggleOption
                label="Large Text"
                icon={<Type className="w-4 h-4" />}
                active={settings.largeText}
                onClick={() => toggleSetting("largeText")}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-gray-700 text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Settings
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              ADA Compliant Accessibility Tools
            </p>
          </div>
        </div>
      )}
    </>
  );
}

interface ToggleOptionProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function ToggleOption({ label, icon, active, onClick }: ToggleOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 px-3 rounded-lg transition-colors flex items-center gap-3 text-sm font-medium ${
        active
          ? "bg-[#2563eb] text-white"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
      aria-pressed={active}
    >
      {icon}
      {label}
    </button>
  );
}
