"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";
import CopyButton from "@/components/CopyButton";

interface ColorState {
  hex: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

const defaultColor: ColorState = { hex: "#6ee7b7", r: 110, g: 231, b: 183, h: 156, s: 72, l: 67 };

export default function ColorPage() {
  const [color, setColor] = useState<ColorState>(defaultColor);

  const updateFromHex = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    const [r, g, b] = rgb;
    const [h, s, l] = rgbToHsl(r, g, b);
    setColor({ hex: hex.startsWith("#") ? hex : "#" + hex, r, g, b, h, s, l });
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    const [h, s, l] = rgbToHsl(r, g, b);
    setColor({ hex, r, g, b, h, s, l });
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    const [r, g, b] = hslToRgb(h, s, l);
    const hex = rgbToHex(r, g, b);
    setColor({ hex, r, g, b, h, s, l });
  }, []);

  const hexStr = color.hex.toUpperCase();
  const rgbStr = `rgb(${color.r}, ${color.g}, ${color.b})`;
  const hslStr = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;

  return (
    <ToolLayout slug="color">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview */}
        <div className="lg:col-span-1 space-y-4">
          <div
            className="w-full aspect-square rounded-xl border border-gray-700 shadow-inner"
            style={{ backgroundColor: color.hex }}
          />
          <input
            type="color"
            value={color.hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer bg-transparent border border-gray-700"
          />
        </div>

        {/* Inputs */}
        <div className="lg:col-span-2 space-y-5">
          {/* HEX */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-gray-400">HEX</label>
              <CopyButton text={hexStr} />
            </div>
            <input
              type="text"
              value={color.hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full"
              placeholder="#000000"
            />
          </div>

          {/* RGB */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-gray-400">RGB</label>
              <CopyButton text={rgbStr} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["r", "g", "b"] as const).map((ch) => (
                <div key={ch} className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 uppercase">{ch}</span>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={color[ch]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      updateFromRgb(
                        ch === "r" ? val : color.r,
                        ch === "g" ? val : color.g,
                        ch === "b" ? val : color.b
                      );
                    }}
                    className="w-full pl-8"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* HSL */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-gray-400">HSL</label>
              <CopyButton text={hslStr} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: "h" as const, label: "H", max: 360 },
                { key: "s" as const, label: "S", max: 100 },
                { key: "l" as const, label: "L", max: 100 },
              ]).map(({ key, label, max }) => (
                <div key={key} className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{label}</span>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={color[key]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      updateFromHsl(
                        key === "h" ? val : color.h,
                        key === "s" ? val : color.s,
                        key === "l" ? val : color.l
                      );
                    }}
                    className="w-full pl-8"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
