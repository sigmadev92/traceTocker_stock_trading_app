"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async ({
  email,
  password,
  preferredIndustry,
  fullName,
  country,
  riskTolerance,
  investmentGoals,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.log("Sign up failed", error);
    return {
      success: false,
      error: "Signup failed",
    };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log("Sign out failed", error);
    return {
      success: false,
      message: "Sign out failed",
    };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.log("Sign In failed", error);
    return {
      success: false,
      error: "SignIn failed",
    };
  }
};
