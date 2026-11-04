// Visual effects accepted by the original RichText layer. They become CSS
// before the caller's style object is applied, and never become DOM attributes.
export function textLayerEffectStyles(props: Record<string, any>): Record<string, string> {
  const style: Record<string, string> = {};
  if (Number.isFinite(props.backgroundBlur)) {
    style.backdropFilter = style.WebkitBackdropFilter = `blur(${props.backgroundBlur}px)`;
  }
  const filters: string[] = [];
  for (const name of ["brightness", "contrast", "grayscale", "hueRotate", "invert", "saturate", "sepia", "blur"]) {
    const value = props[name];
    if (!Number.isFinite(value)) continue;
    filters.push(name === "blur" ? `blur(${value}px)` : name === "hueRotate" ? `hue-rotate(${value}deg)` : `${name}(${value / 100})`);
  }
  if (Array.isArray(props.dropShadows)) for (const shadow of props.dropShadows) {
    filters.push(`drop-shadow(${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color})`);
  }
  if (filters.length) style.filter = style.WebkitFilter = filters.join(" ");
  if (Array.isArray(props.shadows) && props.shadows.length) {
    style.textShadow = props.shadows.map(shadow => `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`).join(", ");
  }
  return style;
}
