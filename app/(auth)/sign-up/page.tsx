'use client';

import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/inputField";
import SelectedField from "@/components/forms/SelectedField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

const SignUp = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>( {
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data: SignUpFormData)=> {
        try {
            console.log(data);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1 className="form-title">Sign Up & Personalize</h1>
            <FooterLink text="Already have an account?" linkText="Sign in here" href="/sign-in" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{required: 'Full Name is required', minLength: 2 }}
                />

                <InputField
                    name="email"
                    label="Email"
                    placeholder="sampletext@sample.com"
                    register={register}
                    error={errors.email}
                    validation={{required: 'Email is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email is required' }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{required: 'Password is required (min of 8 characters)', minLength: 8 }}
                />

                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />

                <SelectedField
                    name="investimentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment Goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectedField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk tolerance"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectedField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred Industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    { isSubmitting ? 'Creating Account' : 'Start your investing journey' }
                </Button>

            </form>
        </>
    )
}

export default SignUp