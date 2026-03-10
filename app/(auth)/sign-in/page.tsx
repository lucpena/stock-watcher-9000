'use client'

import React from 'react'
import {useForm} from "react-hook-form";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/inputField";
import {Button} from "@/components/ui/button";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>( {
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data: SignInFormData)=> {
        try {
            console.log(data);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1 className="form-title">Welcome back 🚀</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    { isSubmitting ? 'Loading...' : 'Let me in' }
                </Button>

                <FooterLink text="New here?" linkText="Create an account" href="/sign-in" />


            </form>
        </>
    )
}
export default SignIn
