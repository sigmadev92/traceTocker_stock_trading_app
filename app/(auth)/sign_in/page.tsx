"use client";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      //
      const result = await signInWithEmail(data);
      console.log(result);
      if (result.success) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Sign In failed", {
        description:
          error instanceof Error ? error.message : "Failed to sign in",
      });
    }
  };
  return (
    <>
      <h1 className="form-title">Login to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          register={register}
          error={errors.email}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="enter a strong password"
          register={register}
          error={errors.password}
          validation={{
            required: "Password is Required",
            minLength: 8,
            maxLength: 12,
          }}
        />
        <button type="submit" className="yellow-btn w-full mt-5">
          {isSubmitting ? "logging In..." : "Login"}
        </button>
        <FooterLink
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign_up"
        />
      </form>
    </>
  );
};

export default SignInPage;
