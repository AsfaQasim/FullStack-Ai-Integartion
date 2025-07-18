import { resend } from "@/app/lib/resend";
import VerificationEmail from "../../../../emails/verificationemail";
import { ApiResponse } from "../types/Apiresponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "you@example.com",
      to: email,
      subject: "Mystry message | Verification Code",
      react: VerificationEmail({
        username,
        verificationUrl: verifyCode,
      }),
    });
    return { success: true, message: "Verification email sent successfully!" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
