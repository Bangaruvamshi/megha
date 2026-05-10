/**
 * Icons8 — free open-source icon CDN wrapper.
 * Docs: https://icons8.com/icons
 * Usage: <Icon8 name="chili-pepper" style="color" size={48} />
 */
interface Icon8Props {
  name: string;
  style?: "color" | "fluency" | "ios-filled" | "ios" | "material-rounded" | "material-outlined" | "office" | "plasticine" | "external-flat";
  size?: number;
  className?: string;
  alt?: string;
}

const Icon8 = ({ name, style = "color", size = 48, className = "", alt }: Icon8Props) => (
  <img
    src={`https://img.icons8.com/${style}/${size * 2}/${name}.png`}
    alt={alt ?? name}
    width={size}
    height={size}
    loading="lazy"
    className={className}
    style={{ width: size, height: size }}
  />
);

export default Icon8;
