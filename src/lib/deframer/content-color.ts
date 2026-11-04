// The original runtime's `Color` utility (used by code components: Color("#09f").toValue(),
// Color.toRgbString, Color.mix, ...) and clampRGB (display-p3 → sRGB string).
// Colors are plain objects {r,g,b,h,s,l,a,roundA,format,initialValue}, exactly
// the shape the original runtime hands to code components, so Color.isColorObject accepts them.

export interface ColorObject {
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
  a: number;
  roundA: number;
  format: string;
  initialValue?: string;
  isValid?: boolean;
  mix: typeof Color.mix;
  toValue: () => string;
}

type RGBA = { r: number; g: number; b: number; a: number };
type Parsed = { format: string; a: number } & ({ r: number; g: number; b: number } | { h: number; s: number; l: number } | { h: number; s: number; v: number });

// ---------------------------------------------------------------------------
// CSS named colors (hex without #)

const NAMED = Object.fromEntries(
  ("aliceblue:f0f8ff antiquewhite:faebd7 aqua:0ff aquamarine:7fffd4 azure:f0ffff beige:f5f5dc bisque:ffe4c4 black:000 " +
    "blanchedalmond:ffebcd blue:00f blueviolet:8a2be2 brown:a52a2a burlywood:deb887 burntsienna:ea7e5d cadetblue:5f9ea0 " +
    "chartreuse:7fff00 chocolate:d2691e coral:ff7f50 cornflowerblue:6495ed cornsilk:fff8dc crimson:dc143c cyan:0ff " +
    "darkblue:00008b darkcyan:008b8b darkgoldenrod:b8860b darkgray:a9a9a9 darkgreen:006400 darkgrey:a9a9a9 darkkhaki:bdb76b " +
    "darkmagenta:8b008b darkolivegreen:556b2f darkorange:ff8c00 darkorchid:9932cc darkred:8b0000 darksalmon:e9967a " +
    "darkseagreen:8fbc8f darkslateblue:483d8b darkslategray:2f4f4f darkslategrey:2f4f4f darkturquoise:00ced1 darkviolet:9400d3 " +
    "deeppink:ff1493 deepskyblue:00bfff dimgray:696969 dimgrey:696969 dodgerblue:1e90ff firebrick:b22222 floralwhite:fffaf0 " +
    "forestgreen:228b22 fuchsia:f0f gainsboro:dcdcdc ghostwhite:f8f8ff gold:ffd700 goldenrod:daa520 gray:808080 green:008000 " +
    "greenyellow:adff2f grey:808080 honeydew:f0fff0 hotpink:ff69b4 indianred:cd5c5c indigo:4b0082 ivory:fffff0 khaki:f0e68c " +
    "lavender:e6e6fa lavenderblush:fff0f5 lawngreen:7cfc00 lemonchiffon:fffacd lightblue:add8e6 lightcoral:f08080 " +
    "lightcyan:e0ffff lightgoldenrodyellow:fafad2 lightgray:d3d3d3 lightgreen:90ee90 lightgrey:d3d3d3 lightpink:ffb6c1 " +
    "lightsalmon:ffa07a lightseagreen:20b2aa lightskyblue:87cefa lightslategray:789 lightslategrey:789 lightsteelblue:b0c4de " +
    "lightyellow:ffffe0 lime:0f0 limegreen:32cd32 linen:faf0e6 magenta:f0f maroon:800000 mediumaquamarine:66cdaa " +
    "mediumblue:0000cd mediumorchid:ba55d3 mediumpurple:9370db mediumseagreen:3cb371 mediumslateblue:7b68ee " +
    "mediumspringgreen:00fa9a mediumturquoise:48d1cc mediumvioletred:c71585 midnightblue:191970 mintcream:f5fffa " +
    "mistyrose:ffe4e1 moccasin:ffe4b5 navajowhite:ffdead navy:000080 oldlace:fdf5e6 olive:808000 olivedrab:6b8e23 " +
    "orange:ffa500 orangered:ff4500 orchid:da70d6 palegoldenrod:eee8aa palegreen:98fb98 paleturquoise:afeeee " +
    "palevioletred:db7093 papayawhip:ffefd5 peachpuff:ffdab9 peru:cd853f pink:ffc0cb plum:dda0dd powderblue:b0e0e6 " +
    "purple:800080 rebeccapurple:663399 red:f00 rosybrown:bc8f8f royalblue:4169e1 saddlebrown:8b4513 salmon:fa8072 " +
    "sandybrown:f4a460 seagreen:2e8b57 seashell:fff5ee sienna:a0522d silver:c0c0c0 skyblue:87ceeb slateblue:6a5acd " +
    "slategray:708090 slategrey:708090 snow:fffafa springgreen:00ff7f steelblue:4682b4 tan:d2b48c teal:008080 " +
    "thistle:d8bfd8 tomato:ff6347 turquoise:40e0d0 violet:ee82ee wheat:f5deb3 white:fff whitesmoke:f5f5f5 yellow:ff0 " +
    "yellowgreen:9acd32")
    .split(" ")
    .map((pair) => pair.split(":") as [string, string]),
);

// ---------------------------------------------------------------------------
// Parsing

const unit = "([-+]?(?:\\d*\\.\\d+|\\d+)%?)";
const fn = (name: string, count: number) =>
  new RegExp(`^${name}[\\s(]+${Array(count).fill(unit).join("[,\\s/]+")}\\s*\\)?$`);
const matchers = {
  rgb: fn("rgb", 3), rgba: fn("rgba?", 4),
  hsl: fn("hsl", 3), hsla: fn("hsla?", 4),
  hsv: fn("hsv", 3), hsva: fn("hsva?", 4),
};
const p3Matcher = /^color\(display-p3\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/;

const fraction = (value: string) => (value.endsWith("%") ? parseFloat(value) / 100 : parseFloat(value));
const channel = (value: string) => (value.endsWith("%") ? (parseFloat(value) / 100) * 255 : parseFloat(value));
const hexByte = (hex: string) => parseInt(hex.length === 1 ? hex + hex : hex, 16);

function parseColorString(input: string): Parsed | false {
  if (input.includes("gradient(") || input.includes("var(")) return false;
  let color = input.replace(/^[\s,#]+/, "").trimEnd().toLowerCase();
  const named = NAMED[color];
  if (named) color = named;
  if (color === "transparent") return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  let m: RegExpExecArray | null;
  if ((m = matchers.rgb.exec(color))) return { r: channel(m[1]), g: channel(m[2]), b: channel(m[3]), a: 1, format: "rgb" };
  if ((m = matchers.rgba.exec(color))) return { r: channel(m[1]), g: channel(m[2]), b: channel(m[3]), a: fraction(m[4]), format: "rgb" };
  if ((m = matchers.hsl.exec(color))) return { h: parseFloat(m[1]), s: fraction(m[2]), l: fraction(m[3]), a: 1, format: "hsl" };
  if ((m = matchers.hsla.exec(color))) return { h: parseFloat(m[1]), s: fraction(m[2]), l: fraction(m[3]), a: fraction(m[4]), format: "hsl" };
  if ((m = matchers.hsv.exec(color))) return { h: parseFloat(m[1]), s: fraction(m[2]), v: fraction(m[3]), a: 1, format: "hsv" };
  if ((m = matchers.hsva.exec(color))) return { h: parseFloat(m[1]), s: fraction(m[2]), v: fraction(m[3]), a: fraction(m[4]), format: "hsv" };
  if ((m = p3Matcher.exec(color))) {
    const rgb = p3ToSRGB({ r: +m[1], g: +m[2], b: +m[3], a: m[4] ? +m[4] : 1 });
    return { r: rgb.r * 255, g: rgb.g * 255, b: rgb.b * 255, a: rgb.a, format: "rgb" };
  }
  if (/^[\da-f]+$/.test(color) && [3, 4, 6, 8].includes(color.length)) {
    const size = color.length <= 4 ? 1 : 2;
    const part = (i: number) => hexByte(color.slice(i * size, i * size + size));
    const format = named ? "name" : "hex";
    return { r: part(0), g: part(1), b: part(2), a: color.length % 4 === 0 ? part(3) / 255 : 1, format };
  }
  return false;
}

// ---------------------------------------------------------------------------
// Conversions (channels 0..255, h in degrees, s/l/v 0..1)

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const correctAlpha = (a: number) => (Number.isFinite(a) ? clamp(a, 0, 1) : 1);

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: h * 60, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 };
}

function hsvToRgb(h: number, s: number, v: number) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return { r: f(5) * 255, g: f(3) * 255, b: f(1) * 255 };
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) h = (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4) / 6;
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

const toHex2 = (value: number) => Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0");

function rgbToHex(r: number, g: number, b: number, allow3Char: boolean): string {
  const hex = [toHex2(r), toHex2(g), toHex2(b)];
  if (allow3Char && hex.every((part) => part[0] === part[1])) return hex.map((part) => part[0]).join("");
  return hex.join("");
}

// display-p3 <-> sRGB, via linear light and XYZ (D65).
const toLinear = (c: number) => (Math.abs(c) <= 0.04045 ? c / 12.92 : (Math.sign(c) || 1) * ((Math.abs(c) + 0.055) / 1.055) ** 2.4);
const fromLinear = (c: number) => (Math.abs(c) > 0.0031308 ? (Math.sign(c) || 1) * (1.055 * Math.abs(c) ** (1 / 2.4) - 0.055) : c * 12.92);

function p3ToSRGB({ r, g, b, a }: RGBA): RGBA {
  const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)];
  const x = 0.486570948648216 * lr + 0.265667693169093 * lg + 0.1982172852343625 * lb;
  const y = 0.2289745640697487 * lr + 0.6917385218365062 * lg + 0.079286914093745 * lb;
  const z = 0.0451133818589026 * lg + 1.043944368900976 * lb;
  return {
    r: fromLinear(x * 3.2409699419045226 - y * 1.537383177570094 - 0.4986107602930034 * z),
    g: fromLinear(x * -0.9692436362808796 + y * 1.8759675015077204 + 0.0415550574071756 * z),
    b: fromLinear(x * 0.0556300796969936 - y * 0.2039769588889765 + 1.0569715142428784 * z),
    a,
  };
}

/** Converts a `color(display-p3 …)` string to an `rgb()/rgba()` string; other values pass through. */
export function clampRGB<T>(color: T): T | string {
  if (typeof color !== "string") return color;
  const m = p3Matcher.exec(color.trim());
  if (!m) return color;
  const rgb = p3ToSRGB({ r: +m[1], g: +m[2], b: +m[3], a: m[4] ? +m[4] : 1 });
  const ch = (v: number) => (Math.round(clamp(v, 0, 1) * 100) / 100) * 255;
  return rgb.a === 1 ? `rgb(${ch(rgb.r)}, ${ch(rgb.g)}, ${ch(rgb.b)})` : `rgba(${ch(rgb.r)}, ${ch(rgb.g)}, ${ch(rgb.b)}, ${rgb.a})`;
}

// ---------------------------------------------------------------------------
// Color objects

function completeFromParsed(parsed: Parsed): Omit<ColorObject, "mix" | "toValue" | "roundA" | "initialValue"> {
  let rgb: { r: number; g: number; b: number };
  if ("v" in parsed) rgb = hsvToRgb(parsed.h, parsed.s, parsed.v);
  else if ("l" in parsed) rgb = hslToRgb(((parsed.h % 360) + 360) % 360, clamp(parsed.s, 0, 1), clamp(parsed.l, 0, 1));
  else rgb = parsed;
  const r = clamp(rgb.r, 0, 255), g = clamp(rgb.g, 0, 255), b = clamp(rgb.b, 0, 255);
  const hsl = "l" in parsed ? { h: ((parsed.h % 360) + 360) % 360, s: parsed.s, l: parsed.l } : rgbToHsl(r, g, b);
  const format = parsed.format === "hsv" ? "rgb" : parsed.format;
  return { r, g, b, ...hsl, a: correctAlpha(parsed.a), format };
}

function parseInput(input: unknown, g?: number, b?: number, a?: number): Parsed | false {
  if (typeof input === "number" && typeof g === "number" && typeof b === "number") return { r: input, g, b, a: a ?? 1, format: "rgb" };
  if (typeof input === "string") return parseColorString(input);
  if (input && typeof input === "object") {
    const o = input as any;
    if ("r" in o && "g" in o && "b" in o) return { r: +o.r, g: +o.g, b: +o.b, a: o.a ?? 1, format: "rgb" };
    if ("h" in o) return { h: +o.h || 0, s: o.s ?? 1, l: o.l ?? 0.5, a: o.a ?? 1, format: "hsl" };
  }
  return false;
}

const cache = new Map<string, ColorObject>();

function createColor(input: unknown, g?: number, b?: number, a?: number): ColorObject | undefined {
  if (input === "") return undefined;
  const parsed = parseInput(input, g, b, a);
  if (!parsed) return undefined;
  const complete = completeFromParsed(parsed);
  const color: ColorObject = {
    ...complete,
    initialValue: typeof input === "string" && parsed.format !== "hsv" ? input : undefined,
    roundA: Math.round(100 * complete.a) / 100,
    mix: Color.mix,
    toValue: () => Color.toRgbString(color),
  };
  return color;
}

const modulate = (t: number, from: number, to: number, limit: boolean) => {
  const value = from + (to - from) * t;
  return limit ? clamp(value, Math.min(from, to), Math.max(from, to)) : value;
};

/** Framer's \`Color\` is called (\`Color("#fff")\`) or constructed (\`new Color("#fff")\`, which returns the same object). */
type ColorFunction = { (color: unknown, g?: number, b?: number, a?: number): ColorObject; new (color: unknown, g?: number, b?: number, a?: number): ColorObject };

/** `Color(value)` parses any CSS color (or {r,g,b,a} / {h,s,l,a}); invalid input yields black with isValid: false. */
export const Color = Object.assign(
  function Color(color: unknown, g?: number, b?: number, a?: number): ColorObject {
    if (typeof color === "string") {
      const cached = cache.get(color);
      if (cached) return cached;
      const created = createColor(color);
      if (!created) return { ...Color("black"), isValid: false };
      cache.set(color, created);
      return created;
    }
    return createColor(color, g, b, a) ?? { ...Color("black"), isValid: false };
  } as ColorFunction,
  {
    isColor: (value: unknown): boolean => (typeof value === "string" ? Color.isColorString(value) : Color.isColorObject(value)),
    isColorString: (value: unknown): boolean => typeof value === "string" && parseColorString(value) !== false,
    isColorObject: (value: unknown): value is ColorObject => {
      const c = value as any;
      return !!c && typeof c === "object" && ["r", "g", "b", "h", "s", "l", "a", "roundA"].every((k) => typeof c[k] === "number") && typeof c.format === "string";
    },
    isP3String: (value: unknown): boolean => typeof value === "string" && value.startsWith("color(display-p3"),
    inspect: (c: ColorObject, initialValue?: string) =>
      c.format === "hsl" ? `<Color h:${c.h} s:${c.s} l:${c.l} a:${c.a}>`
        : c.format === "hex" || c.format === "name" ? `<Color "${initialValue}">`
          : `<Color r:${c.r} g:${c.g} b:${c.b} a:${c.a}>`,
    toString: (c: ColorObject) => Color.toRgbString(c),
    toRgbString: (c: ColorObject) => {
      const [r, g, b] = [c.r, c.g, c.b].map(Math.round);
      return c.a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${c.roundA ?? Math.round(c.a * 100) / 100})`;
    },
    toHex: (c: ColorObject, allow3Char = false) => rgbToHex(c.r, c.g, c.b, allow3Char),
    toHexString: (c: ColorObject, allow3Char = false) => `#${rgbToHex(c.r, c.g, c.b, allow3Char)}`,
    toHsl: (c: ColorObject) => ({ h: Math.round(c.h), s: c.s, l: c.l, a: c.a }),
    toHslString: (c: ColorObject) => {
      const h = Math.round(c.h), s = Math.round(c.s * 100), l = Math.round(c.l * 100);
      return c.a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${c.roundA})`;
    },
    toHsv: (c: ColorObject) => {
      const hsv = rgbToHsv(c.r, c.g, c.b);
      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: c.a };
    },
    toHsvString: (c: ColorObject) => {
      const hsv = rgbToHsv(c.r, c.g, c.b);
      const h = Math.round(hsv.h * 360), s = Math.round(hsv.s * 100), v = Math.round(hsv.v * 100);
      return c.a === 1 ? `hsv(${h}, ${s}%, ${v}%)` : `hsva(${h}, ${s}%, ${v}%, ${c.roundA})`;
    },
    /** HSLuv is approximated with HSL. */
    toHusl: (c: ColorObject) => ({ h: c.h, s: c.s, l: c.l, a: c.roundA }),
    toName: (c: ColorObject): string | false => {
      if (c.a === 0) return "transparent";
      if (c.a < 1) return false;
      const short = rgbToHex(c.r, c.g, c.b, true), long = rgbToHex(c.r, c.g, c.b, false);
      return Object.keys(NAMED).find((name) => NAMED[name] === short || NAMED[name] === long) ?? false;
    },
    toRgb: (c: ColorObject) => ({ r: Math.round(c.r), g: Math.round(c.g), b: Math.round(c.b), a: c.a }),
    brighten: (c: ColorObject, amount = 10) => {
      const shift = Math.round(255 * (amount / 100));
      const rgb = Color.toRgb(c);
      return Color({ r: clamp(rgb.r + shift, 0, 255), g: clamp(rgb.g + shift, 0, 255), b: clamp(rgb.b + shift, 0, 255), a: rgb.a });
    },
    lighten: (c: ColorObject, amount = 10) => Color({ ...Color.toHsl(c), l: clamp(c.l + amount / 100, 0, 1) }),
    darken: (c: ColorObject, amount = 10) => Color({ ...Color.toHsl(c), l: clamp(c.l - amount / 100, 0, 1) }),
    saturate: (c: ColorObject, amount = 10) => Color({ ...Color.toHsl(c), s: clamp(c.s + amount / 100, 0, 1) }),
    desaturate: (c: ColorObject, amount = 10) => Color({ ...Color.toHsl(c), s: clamp(c.s - amount / 100, 0, 1) }),
    grayscale: (c: ColorObject) => Color.desaturate(c, 100),
    hueRotate: (c: ColorObject, angle: number) => {
      const hsl = Color.toHsl(c);
      const h = hsl.h + angle;
      return Color({ ...hsl, h: h > 360 ? h - 360 : h });
    },
    alpha: (c: ColorObject, a = 1) => Color({ r: c.r, g: c.g, b: c.b, a }),
    transparent: (c: ColorObject) => Color.alpha(c, 0),
    multiplyAlpha: (c: ColorObject, alpha = 1) => Color({ r: c.r, g: c.g, b: c.b, a: c.a * alpha }),
    interpolate: (from: ColorObject, to: ColorObject, model = "rgb") => {
      if (!Color.isColorObject(from) || !Color.isColorObject(to)) throw new TypeError("Both arguments for Color.interpolate must be Color objects");
      return (progress: number) => Color.mixAsColor(from, to, progress, false, model);
    },
    mix: (from: ColorObject | string, to: ColorObject, { model = "rgb" }: { model?: string } = {}) => {
      const mixer = Color.interpolate(typeof from === "string" ? Color(from) : from, to, model);
      return (progress: number) => Color.toRgbString(mixer(progress));
    },
    mixAsColor: (a: ColorObject, b: ColorObject, t = 0.5, limit = false, model = "rgb"): ColorObject => {
      if (model === "rgb" || model === "rgba") {
        return Color({ r: modulate(t, a.r, b.r, limit), g: modulate(t, a.g, b.g, limit), b: modulate(t, a.b, b.b, limit), a: modulate(t, a.a, b.a, limit) });
      }
      // Hue-based mix: take the shortest way around the colour wheel.
      const from = Color.toHsl(a), to = Color.toHsl(b);
      if (from.s === 0) from.h = to.h;
      else if (to.s === 0) to.h = from.h;
      let delta = to.h - from.h;
      if (delta > 180) delta -= 360;
      else if (delta < -180) delta += 360;
      return Color({ h: modulate(t, from.h, from.h + delta, limit), s: modulate(t, from.s, to.s, limit), l: modulate(t, from.l, to.l, limit), a: modulate(t, a.a, b.a, limit) });
    },
    random: (alpha = 1) => {
      const gen = () => Math.floor(Math.random() * 255);
      return Color(`rgba(${gen()}, ${gen()}, ${gen()}, ${alpha})`);
    },
    grey: (amount = 0.5, alpha = 1) => {
      const v = Math.floor(amount * 255);
      return Color(`rgba(${v}, ${v}, ${v}, ${alpha})`);
    },
    gray: (amount = 0.5, alpha = 1) => Color.grey(amount, alpha),
    rgbToHsl: (r: number, g: number, b: number) => rgbToHsl(r, g, b),
    isValidColorProperty: (name: string, value: unknown) =>
      (name.toLowerCase().endsWith("color") || name === "fill" || name === "stroke") && typeof value === "string" && Color.isColorString(value),
    difference: (a: ColorObject, b: ColorObject) => {
      const meanR = (a.r + b.r) / 2;
      const dr = a.r - b.r, dg = a.g - b.g, db = a.b - b.b;
      return Math.sqrt(2 * dr * dr + 4 * dg * dg + 3 * db * db + (meanR * (dr * dr - db * db)) / 256);
    },
    equal: (a: ColorObject, b: ColorObject, tolerance = 0.1) =>
      Math.abs(a.r - b.r) < tolerance && Math.abs(a.g - b.g) < tolerance && Math.abs(a.b - b.b) < tolerance && Math.abs(a.a - b.a) * 256 < tolerance,
    luminance: (c: ColorObject) => {
      const { r, g, b } = Color.toRgb(c);
      return 0.2126 * toLinear(r / 255) + 0.7152 * toLinear(g / 255) + 0.0722 * toLinear(b / 255);
    },
    contrast: (a: ColorObject, b: ColorObject) => {
      const la = Color.luminance(a), lb = Color.luminance(b);
      return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
    },
  },
);
