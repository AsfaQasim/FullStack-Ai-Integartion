import { sendVerificationEmail } from "@/app/helpers/sendverificationemails";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/user";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUserName = await UserModel.findOne({
      username,
      isVerify: true,
    });

    if (existingUserVerifiedByUserName) {
      return Response.json(
        {
          success: false,
          message: "User name is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserbyEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (!existingUserbyEmail) {
      const hashPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
        verifyCode,
        verifycodeExpiry: expiryDate,
        isVerify: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully! Verification email sent.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
