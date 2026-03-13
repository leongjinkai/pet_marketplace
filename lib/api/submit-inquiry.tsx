export interface InquiryFormData {
  fullName: string;
  email: string;
  message: string;
}

export interface InquiryResponse {
  inquiryId: string;
  receivedAt: string;
}

const INQUIRY_API_URL = "https://pets-intrvw.up.railway.app/inquiries";

export async function submitInquiry(
  formData: InquiryFormData
): Promise<InquiryResponse> {
  const response = await fetch(INQUIRY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit inquiry: ${response.statusText}`);
  }

  const data: InquiryResponse = await response.json();
  return data;
}
