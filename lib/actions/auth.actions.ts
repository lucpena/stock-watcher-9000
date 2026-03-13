// Run only on server
'use server';

import { auth } from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";

export const signUpWithEmail = async ({ email, password, fullName, investmentGoals, preferredIndustry, riskTolerance, country }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })

        if(response) {
            await inngest.send({
                name:'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }
            })
        }

        return { success: true, data: response };

     } catch (e) {
        console.error('Sign Up failer', e);
        return { success: false, error: 'Sign Up failed' };
    }
}