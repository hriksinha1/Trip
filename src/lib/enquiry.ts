import { site } from "../data/site";

export interface EnquiryPayload {
  name: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  isFlexibleDates?: boolean;
  travellers: number;
  contact?: string; // phone or email when endpoint is set
  notes?: string;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ ok: boolean; error?: string }> {
  if (!site.enquiryEndpoint) {
    return { ok: false, error: "No enquiry endpoint configured." };
  }

  try {
    const response = await fetch(site.enquiryEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        source: "Starttrips Web",
      }),
    });

    if (!response.ok) {
      return { ok: false, error: `Server returned status ${response.status}` };
    }

    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, error: message };
  }
}
