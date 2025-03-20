import { Scraper } from "agent-twitter-client";
import { TwitterApi } from "twitter-api-v2";

export interface TwitterScraperConfig {
  twitter_scraper: Scraper;
  twitter_id: string;
  twitter_username: string;
}

export interface TwitterApiConfig {
  twitter_api: string;
  twitter_api_secret: string;
  twitter_access_token: string;
  twitter_access_token_secret: string;
  twitter_api_client: TwitterApi;
}

export class TwitterManager {
  twitterManager: TwitterScraperConfig | TwitterApiConfig | undefined;
  twitter_auth_mode: "API" | "CREDENTIALS";
  constructor() {
    this.twitterManager = undefined;
    this.twitter_auth_mode = "API";
  }

  public async initializeTwitterManager(): Promise<void> {
    if (process.env.TWITTER_AUTH_MODE === "CREDENTIALS") {
      const username = process.env.TWITTER_USERNAME;
      const password = process.env.TWITTER_PASSWORD;
      const email = process.env.TWITTER_EMAIL;

      if (!username || !password) {
        throw new Error(
          "Error when try to initializeTwitterManager in CREDENTIALS twitter_auth_mode check your .env"
        );
      }
      const user_client = new Scraper();

      await user_client.login(username, password, email);
      const account = await user_client.me();
      if (!account) {
        throw new Error("Impossible to get your twitter account information");
      }
      const userClient: TwitterScraperConfig = {
        twitter_scraper: user_client,
        twitter_id: account?.userId as string,
        twitter_username: account?.username as string,
      };
      this.twitterManager = userClient;
      this.twitter_auth_mode = "CREDENTIALS";
    } else if (process.env.TWITTER_AUTH_MODE === "API") {
      const twitter_api = process.env.TWITTER_API;
      const twitter_api_secret = process.env.TWITTER_API_SECRET;
      const twitter_access_token = process.env.TWITTER_ACCESS_TOKEN;
      const twitter_access_token_secret =
        process.env.TWITTER_ACCESS_TOKEN_SECRET;

      if (
        !twitter_api ||
        !twitter_api_secret ||
        !twitter_access_token ||
        !twitter_access_token_secret
      ) {
        throw new Error(
          "Error when try to initializeTwitterManager in API twitter_auth_mode check your .env"
        );
      }

      const userClient = new TwitterApi({
        appKey: twitter_api,
        appSecret: twitter_api_secret,
        accessToken: twitter_access_token,
        accessSecret: twitter_access_token_secret,
      });
      if (!userClient) {
        throw new Error(
          "Error when trying to createn you Twitter API Account check your API Twitter CREDENTIALS"
        );
      }

      const apiConfig: TwitterApiConfig = {
        twitter_api: twitter_api,
        twitter_api_secret: twitter_api_secret,
        twitter_access_token: twitter_access_token,
        twitter_access_token_secret: twitter_access_token_secret,
        twitter_api_client: userClient,
      };
      this.twitterManager = apiConfig;
      this.twitter_auth_mode = "API";
    } else {
      throw new Error(
        "Error when try to initializeTwitterManager check your .env"
      );
    }
  }
  public getTwitterManager(): TwitterScraperConfig | TwitterApiConfig {
    if (!this.twitterManager) {
      throw new Error("Twitter Manager is undefined");
    }
    return this.twitterManager;
  }
  public getTwitterAuthMode(): "API" | "CREDENTIALS" {
    return this.twitter_auth_mode;
  }
}


export interface TwitterTool<P = any> {
  name: string;
  description: string;
  schema?: Zod.AnyZodObject;
  execute: (
    twitter: TwitterManager,
    params: P,
    plugins_manager?: any
  ) => Promise<unknown>;
}
