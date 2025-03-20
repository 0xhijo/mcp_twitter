import { Scraper } from "agent-twitter-client";
import { TwitterApi } from "twitter-api-v2";
export class TwitterManager {
    twitterManager;
    twitter_auth_mode;
    constructor() {
        this.twitterManager = undefined;
        this.twitter_auth_mode = "API";
    }
    async initializeTwitterManager() {
        if (process.env.TWITTER_AUTH_MODE === "CREDENTIALS") {
            const username = process.env.TWITTER_USERNAME;
            const password = process.env.TWITTER_PASSWORD;
            const email = process.env.TWITTER_EMAIL;
            if (!username || !password) {
                throw new Error("Error when try to initializeTwitterManager in CREDENTIALS twitter_auth_mode check your .env");
            }
            const user_client = new Scraper();
            await user_client.login(username, password, email);
            const account = await user_client.me();
            if (!account) {
                throw new Error("Impossible to get your twitter account information");
            }
            const userClient = {
                twitter_scraper: user_client,
                twitter_id: account?.userId,
                twitter_username: account?.username,
            };
            this.twitterManager = userClient;
            this.twitter_auth_mode = "CREDENTIALS";
        }
        else if (process.env.TWITTER_AUTH_MODE === "API") {
            const twitter_api = process.env.TWITTER_API;
            const twitter_api_secret = process.env.TWITTER_API_SECRET;
            const twitter_access_token = process.env.TWITTER_ACCESS_TOKEN;
            const twitter_access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
            if (!twitter_api ||
                !twitter_api_secret ||
                !twitter_access_token ||
                !twitter_access_token_secret) {
                throw new Error("Error when try to initializeTwitterManager in API twitter_auth_mode check your .env");
            }
            const userClient = new TwitterApi({
                appKey: twitter_api,
                appSecret: twitter_api_secret,
                accessToken: twitter_access_token,
                accessSecret: twitter_access_token_secret,
            });
            if (!userClient) {
                throw new Error("Error when trying to createn you Twitter API Account check your API Twitter CREDENTIALS");
            }
            const apiConfig = {
                twitter_api: twitter_api,
                twitter_api_secret: twitter_api_secret,
                twitter_access_token: twitter_access_token,
                twitter_access_token_secret: twitter_access_token_secret,
                twitter_api_client: userClient,
            };
            this.twitterManager = apiConfig;
            this.twitter_auth_mode = "API";
        }
        else {
            throw new Error("Error when try to initializeTwitterManager check your .env");
        }
    }
    getTwitterManager() {
        if (!this.twitterManager) {
            throw new Error("Twitter Manager is undefined");
        }
        return this.twitterManager;
    }
    getTwitterAuthMode() {
        return this.twitter_auth_mode;
    }
}
