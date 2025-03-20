import { NextRequest, NextResponse } from "next/server";
import Email from "@/utils/email";

export const POST = async (req: NextRequest) => {
  if (req.method === "POST") {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      await new Email(name, email, message).sendEmailToCompany();
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error sending email" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 400 }
    );
  }
};
