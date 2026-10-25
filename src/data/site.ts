// Site-wide business configuration for Starttrips
// Values are sourced from environment variables where configurable; secrets are never placed here.

const rawWhatsApp = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim() || "";
let validWhatsApp = "";

if (rawWhatsApp) {
  const digitsOnly = rawWhatsApp.replace(/\D/g, "");
  if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
    validWhatsApp = digitsOnly;
  } else if (import.meta.env.DEV) {
    console.warn(
      `[Starttrips] VITE_WHATSAPP_NUMBER ("${rawWhatsApp}") is invalid. Expected 10-15 digits including country code (e.g. 919876543210). WhatsApp link disabled.`
    );
  }
}

export const site = {
  name: "Starttrips",
  url: "https://starttrips.vercel.app",
  instagramUrl: "https://www.instagram.com/starttrips_/",
  instagramHandle: "@starttrips_",
  whatsappNumber: validWhatsApp,
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || "",
  enquiryEndpoint: (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined)?.trim() || "",
  // Optional URL or local path to Starttrips official logo. If empty, a neutral typography mark is rendered.
  logoSrc: "",
  // When true, displays explicit "Indicative" tags on sample pricing and package details.
  showSampleLabels: true,
  socials: {
    instagram: "https://www.instagram.com/starttrips_/",
  },
};
