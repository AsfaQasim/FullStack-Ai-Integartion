import * as React from "react";

interface VerificationEmailProps {
  username: string;
  verificationUrl: string;
}

export const VerificationEmail = ({
  username,
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h2>Hello {username},</h2>
      <p>
        Thank you for registering. Please confirm your email address by clicking
        the button below:
      </p>
      <a
        href={verificationUrl}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          display: "inline-block",
        }}
      >
        Verify Email
      </a>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>Thanks,<br />The Team</p>
    </div>
  );
};

export default VerificationEmail;
