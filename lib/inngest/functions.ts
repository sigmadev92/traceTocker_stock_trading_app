import { inngest } from "./client";
import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from "./prompt";
import { sendWelcomeEmail } from "../nodemailer";
import { getAllUserDNSForNewsEmail } from "../actions/user,actions";

export const sendSignUpEmail = inngest.createFunction(
  {
    id: "sign-up-email",
  },
  {
    event: "app/user.created",
  },
  async ({ event, step }) => {
    const userProfile = `- Country : ${event.data.country}
                         - Investment Goals : ${event.data.investmentGoals}
                         - Risk Tolerance : ${event.data.riskTolearance}
                         - Preferred Industry : ${event.data.preferredIndustry}
                         
                         `;
    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });
    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0].content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining Tracetocker.";

      // emailsending logic
      const {
        data: { email, name },
      } = event;
      return await sendWelcomeEmail({ email, name, intro: introText });
    });

    return { success: true, message: "Welcome Email Sent successfully" };
  }
);

export const sendDailyNewsSumamry = inngest.createFunction(
  {
    id: "daily-news-summary",
  },
  [{ event: "app/send.daily.news" }, { cron: "0 12 * * *" }],
  async ({ step }) => {
    //get all users
    const users = await step.run("get-all-users", getAllUserDNSForNewsEmail);
    if (!users || users.length === 0) {
      return { success: false, message: "No users found for news email" };
    }

    //st1p -2 Fetch personalised news
    const results = await step.run("prepare-news-per-user", async () => {
      const perUser: Array<{
        user: UserForNewsEmail;
        articles: MarketNewsArticle[];
      }> = [];
      for (const user of users) {
        try {
        } catch (error) {
          console.log(
            "daily-news: error preparing user news",
            user.email,
            error
          );
          perUser.push({
            user: { ...user, id: Number(user._id) ?? 0 },
            articles: [],
          });
        }
      }
      return perUser;
    });

    //step - 3 Summarize news Via AI
    const userNewsSummaries: { user: User; newsContent: string | null }[] = [];
    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
          "{{newsData}}",
          JSON.stringify(articles, null, 2)
        );

        const response = await step.ai.infer(`summarize-news-${user.email}`, {
          model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite" }),
          body: {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          },
        });
        const part = response.candidates?.[0]?.content?.parts[0];
        const newsContent =
          (part && "text" in part ? part.text : null) || "No market news.";
        userNewsSummaries.push({
          user: { ...user, id: String(user.id) },
          newsContent,
        });
      } catch (error) {
        console.log(error);
        userNewsSummaries.push({
          user: { ...user, id: String(user.id) },
          newsContent: null,
        });
      }
    }
    await step.run("send-news-emails", async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return;

          await sendWelcomeEmail({
            email: user.email,
            name: user.name,
            intro: newsContent,
          });
        })
      );
    });
    return {
      success: true,
      message: "Daily news summary emails sent successfully",
    };
  }
);
