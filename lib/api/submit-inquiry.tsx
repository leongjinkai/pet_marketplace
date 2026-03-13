export interface InquiryFormData {
  petId: string;
  fullName: string;
  email: string;
  message: string;
}

export interface InquiryResponse {
  ok: boolean;
  inquiryId: string;
  receivedAt: string;
  petId: string;
  petName: string;
  imageUrl: string;
}

export async function submitInquiry(
  formData: InquiryFormData
): Promise<InquiryResponse> {
  try {
    // Use Next.js API route to avoid CORS issues
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: response.statusText,
      }));
      throw new Error(
        errorData.error ||
          `Failed to submit inquiry: ${response.status} ${response.statusText}`
      );
    }

    const data: InquiryResponse = await response.json();
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        "Network error: Unable to reach the server. Please check your internet connection or try again later."
      );
    }
    // Re-throw other errors
    throw error;
  }
}
