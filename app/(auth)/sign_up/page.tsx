"use client";
import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full Name is Required", minLength: 2 }}
        />
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
        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolearance"
          placeholder="Select your risk tolerance level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred Industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Start your Investment Journey"}
        </button>
        <FooterLink
          text="Already have an account?"
          linkText="Sign In"
          href="/sign_in"
        />
      </form>
    </>
  );
};

export default SignUpPage;
