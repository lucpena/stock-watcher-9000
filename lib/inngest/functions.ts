import {inngest} from "@/lib/inngest/client";
import {PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendWelcomeEmail} from "@/lib/nodemailer";
import {getAllUsersForNewsEmail} from "@/lib/actions/user.actions";

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created' },
    async ({ event, step }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk Tolerance: ${event.data.riskTolerance}
            - Preferred Industry ${event.data.preferredIndustry}
        `

        // Create a custom email with AI for the user
        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)
        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite'}),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt}
                        ]
                    }
                ]
            }
        })

        // Got the response from AI
        await step.run('send-welcome-email', async() => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining me at Stock Watch 9000.'

            const { data: {email, name }} = event;

            return await sendWelcomeEmail({ email, name, intro: introText });
        })

        return {
            success: true,
            message: 'Welcome email sent successfully!'
        }
    }
)

// cron: "min hour dayOfMonth month dayOfWeek"
export const sendDailyNewsSummary = inngest.createFunction(
    { id: 'daily-news-summary' },
    [ { event: 'app/send.daily.news'}, { cron: '0 12 * * *' }],
    async ({ step }) => {
        // Get all users for news delivery
        const users = await step.run('get-all-users', getAllUsersForNewsEmail)

        if( !users || !users.length ) return { success: false, message: 'No users found for news email' };

        // Fetch personalized news for each user
        // Summarize news via AI for each user
        // Send emails
    }
)