"use client";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";

import { useForm } from "react-hook-form";

const SignInPage = () => {
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
      console.log(data);
    } catch (error) {
      console.log(error);
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
          validation={{
            required: "Email is Required",
            pattern: /^w+@\w\.\w+$/,
            message: "Email address in required",
          }}
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
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
