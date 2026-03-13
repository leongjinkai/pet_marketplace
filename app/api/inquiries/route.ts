import { NextRequest, NextResponse } from "next/server";

const INQUIRY_API_URL = "https://pets-intrvw.up.railway.app/inquiries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(INQUIRY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Failed to submit inquiry: ${response.status} ${response.statusText}. ${errorText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in inquiry API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
