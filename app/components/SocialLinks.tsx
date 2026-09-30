import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";

const ICONS: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
};

/** Icon-only links to a product's public social profiles. Sits above card-wide stretched links. */
export function SocialLinks({ socials, className = "", size = 13 }: { socials?: { label: string; url: string }[]; className?: string; size?: number }) {
  if (!socials?.length) return null;
  return (
    <span className={`social-icons ${className}`}>
      {socials.map((s) => {
        const Icon = ICONS[s.label.toLowerCase()];
        if (!Icon) return null;
        return (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
            <Icon size={size} />
          </a>
        );
      })}
      <style>{`
        .social-icons { position:relative; z-index:2; display:inline-flex; align-items:center; gap:6px; }
        .social-icons a { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border:1px solid var(--line-strong); color:var(--muted); transition:color .2s, border-color .2s, background .2s; }
        @media (pointer: coarse) { .social-icons a { width:40px; height:40px; } }
        .social-icons a:hover { color:var(--ink); background:var(--accent); border-color:var(--accent); }
      `}</style>
    </span>
  );
}
