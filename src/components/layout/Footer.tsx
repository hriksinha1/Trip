import React, { useMemo, useState } from "react";
import { Logo } from "../ui/Logo";
import { SocialIcon } from "../ui/SocialIcon";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";
import { exploreLinks, supportLinks } from "../../data/navigation";
import { site } from "../../data/site";
import { images } from "../../data/images";
import provenanceData from "../../data/provenance.json";

interface FooterProps {
  onOpenLegalDialog: (type: "terms" | "privacy") => void;
  onPlanTripClick: () => void;
}

interface PhotoProvenance {
  subject?: string;
  sourceUrl?: string;
  license?: string;
  licenseUrl?: string;
  author?: string;
  originalTitle?: string;
  commercialUseVerified?: boolean;
}

const provenance = provenanceData as Record<string, PhotoProvenance>;

export const Footer: React.FC<FooterProps> = ({ onOpenLegalDialog, onPlanTripClick }) => {
  const currentYear = new Date().getFullYear();
  const [photoCreditsOpen, setPhotoCreditsOpen] = useState(false);

  const photoCredits = useMemo(() => {
    const seen = new Set<string>();
    return Object.entries(images).flatMap(([id, image]) => {
      const detail = provenance[id];
      if (!detail?.sourceUrl) return [];
      let dedupeKey = detail.sourceUrl;
      try {
        const url = new URL(detail.sourceUrl);
        dedupeKey = url.origin + url.pathname;
      } catch {
        // Keep the recorded source URL as the de-duplication key when it is not absolute.
      }
      if (seen.has(dedupeKey)) return [];
      seen.add(dedupeKey);
      return [{ id, image, detail }];
    });
  }, []);

  return (
    <>
      <footer id="contact" aria-label="Starttrips footer" data-shell className="shell rounded-b-[var(--radius-block)] bg-[#0E0E0E] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-white/10 pb-8 sm:gap-x-8 sm:gap-y-9 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr] lg:gap-10 lg:pb-10">
          <div className="col-span-2 flex flex-col items-start gap-3 lg:col-span-1">
            <a href="#home" aria-label="Starttrips home"><Logo theme="light" /></a>
            <p className="max-w-[34ch] text-[14px] leading-relaxed text-[#B3B3B3]">
              Beach breaks, hill escapes and heritage trips across India.
            </p>
            <div className="flex items-center gap-2.5 pt-1" aria-label="Official channels">
              {site.socials.instagram && <SocialIcon platform="instagram" href={site.socials.instagram} />}
              {site.whatsappNumber && <SocialIcon platform="whatsapp" href={`https://wa.me/${site.whatsappNumber}`} />}
              {site.contactEmail && <SocialIcon platform="email" href={`mailto:${site.contactEmail}`} />}
            </div>
          </div>

          <nav aria-label="Explore" className="min-w-0">
            <h3 className="mb-3 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-white">Explore</h3>
            <ul className="space-y-1.5 text-[14px] text-[#B3B3B3]">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-9 items-center rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support" className="min-w-0">
            <h3 className="mb-3 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-white">Support</h3>
            <ul className="space-y-1.5 text-[14px] text-[#B3B3B3]">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  {item.label === "Terms & Conditions" ? (
                    <button type="button" onClick={() => onOpenLegalDialog("terms")} className="inline-flex min-h-9 items-center rounded-sm text-left transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{item.label}</button>
                  ) : item.label === "Privacy Policy" ? (
                    <button type="button" onClick={() => onOpenLegalDialog("privacy")} className="inline-flex min-h-9 items-center rounded-sm text-left transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{item.label}</button>
                  ) : (
                    <a href={item.href} className="inline-flex min-h-9 items-center rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 lg:col-span-1">
            <h3 className="font-display text-[15px] font-semibold text-white">Plan your trip</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#B3B3B3]">
              Tell us where you’d like to go and we’ll help arrange your itinerary.
            </p>
            <div className="mt-4 grid gap-2.5">
              <Button variant="onPhoto" size="md" onClick={onPlanTripClick} className="w-full font-semibold">Plan my trip</Button>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Message us on Instagram
              </a>
              {site.whatsappNumber && (
                <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-6 text-center text-[13px] text-[#A6A6A6] sm:flex-row sm:justify-between sm:text-left">
          <p>© {currentYear} Starttrips. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button type="button" onClick={() => onOpenLegalDialog("terms")} className="min-h-9 rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Terms</button>
            <button type="button" onClick={() => onOpenLegalDialog("privacy")} className="min-h-9 rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Privacy</button>
            <button type="button" onClick={() => setPhotoCreditsOpen(true)} className="min-h-9 rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Photo credits</button>
          </div>
        </div>
      </footer>

      <Dialog isOpen={photoCreditsOpen} onClose={() => setPhotoCreditsOpen(false)} title="Photo credits" description="Photographs and licences recorded for the images used by Starttrips. Images may be cropped and resized for the layout.">
        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
          {photoCredits.map(({ id, image, detail }) => (
            <article key={id} className="border-b border-neutral-200 pb-3 last:border-b-0">
              <h4 className="font-display text-base font-semibold text-[#151515]">{image.label}</h4>
              {detail.originalTitle && <p className="mt-1 text-sm text-neutral-600">{detail.originalTitle.replace(/^File:/, "")}</p>}
              <p className="mt-1 text-sm text-neutral-600">Photographer / author: {detail.author || "Not recorded"}</p>
              <p className="mt-1 text-sm text-neutral-600">
                Licence: {detail.license && detail.licenseUrl ? <a href={detail.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#151515]">{detail.license}</a> : detail.license || "Not recorded"}
              </p>
              {detail.sourceUrl && <a href={detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-9 items-center text-sm font-medium text-[#151515] underline underline-offset-2">View original source</a>}
            </article>
          ))}
          <p className="text-xs text-neutral-500">Images have been cropped and resized for presentation. Please review the associated source and licence terms before reuse.</p>
        </div>
      </Dialog>
    </>
  );
};
