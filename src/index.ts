#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { TwitterManager, TwitterTool } from "./interfaces/index.js";
import dotenv from "dotenv";
import {
  createAndPostTwitterThread,
  createTwitterpost,
  FollowXUserFromUsername,
  getLastTweetsAndRepliesFromUser,
  getLastTweetsFromUser,
  getLastTweetsOptions,
  getLastUserTweet,
  getOwnTwitterAccountInfo,
  getTwitterProfileFromUsername,
  getTwitterUserIdFromUsername,
  ReplyTweet,
} from "./tools/twitter.js";
import {
  createAndPostTwitterThreadSchema,
  createTwitterpostSchema,
  FollowXUserFromUsernameSchema,
  getLastTweetsAndRepliesFromUserSchema,
  getLastTweetsFromUserSchema,
  getLastTweetsOptionsSchema,
  getLastUserXTweetSchema,
  getTwitterProfileFromUsernameSchema,
  getTwitterUserIdFromUsernameSchema,
  ReplyTweetSchema,
} from "./schema/index.js";

dotenv.config();

// Create server instance
const server = new McpServer({
  name: "twitter",
  version: "1.0.0",
});

export const registerTools = (TwitterToolRegistry: TwitterTool[]) => {
  TwitterToolRegistry.push({
    name: "create_twitter_post",
    description: "Create new X/Twitter post",
    schema: createTwitterpostSchema,
    execute: createTwitterpost,
  });

  TwitterToolRegistry.push({
    name: "reply_twitter_tweet",
    description: "Reply to specific X/Twitter post by ID",
    schema: ReplyTweetSchema,
    execute: ReplyTweet,
  });

  TwitterToolRegistry.push({
    name: "get_last_tweet",
    description: "Get most recent post from specified X/Twitter account",
    schema: getLastUserXTweetSchema,
    execute: getLastUserTweet,
  });

  TwitterToolRegistry.push({
    name: "get_last_tweets_options",
    description: "Get specified number of posts matching search query",
    schema: getLastTweetsOptionsSchema,
    execute: getLastTweetsOptions,
  });

  TwitterToolRegistry.push({
    name: "create_and_post_twitter_thread",
    description: "Create and publish X/Twitter thread",
    schema: createAndPostTwitterThreadSchema,
    execute: createAndPostTwitterThread,
  });

  TwitterToolRegistry.push({
    name: "follow_twitter_from_username",
    description: "Follow X/Twitter user by username",
    schema: FollowXUserFromUsernameSchema,
    execute: FollowXUserFromUsername,
  });

  TwitterToolRegistry.push({
    name: "get_twitter_profile_from_username",
    description: "Get full X/Twitter profile data by username",
    schema: getTwitterProfileFromUsernameSchema,
    execute: getTwitterProfileFromUsername,
  });

  TwitterToolRegistry.push({
    name: "get_twitter_user_id_from_username",
    description: "Get X/Twitter user ID from username",
    schema: getTwitterUserIdFromUsernameSchema,
    execute: getTwitterUserIdFromUsername,
  });

  TwitterToolRegistry.push({
    name: "get_last_tweet_and_replies_from_user",
    description: "Get recent X/Twitter posts and replies from user",
    schema: getLastTweetsAndRepliesFromUserSchema,
    execute: getLastTweetsAndRepliesFromUser,
  });

  TwitterToolRegistry.push({
    name: "get_last_tweet_from_user",
    description: "Get recent X/Twitter posts from user",
    schema: getLastTweetsFromUserSchema,
    execute: getLastTweetsFromUser,
  });

  TwitterToolRegistry.push({
    name: "get_own_twitter_account_info",
    description: "Get current account profile data",
    execute: getOwnTwitterAccountInfo,
  });
};

export const RegisterToolInServer = async (twitter: TwitterManager) => {
  const tools: TwitterTool[] = [];
  await registerTools(tools);
  for (const tool of tools) {
    if (!tool.schema) {
      server.tool(tool.name, tool.description, async () => {
        const result = await tool.execute(twitter, {});
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      });
    } else {
      server.tool(
        tool.name,
        tool.description,
        tool.schema.shape,
        async (params: any, extra: any) => {
          const result = await tool.execute(twitter, params);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result),
              },
            ],
          };
        }
      );
    }
  }
};

const checkEnv = (auth_mode: string): boolean => {
  let key;
  if (auth_mode === "CREDENTIALS") {
    key = ["TWITTER_USERNAME", "TWITTER_PASSWORD", "TWITTER_EMAIL"];
  } else if (auth_mode === "API") {
    key = [
      "TWITTER_API",
      "TWITTER_API_SECRET",
      "TWITTER_ACCESS_TOKEN",
      "TWITTER_ACCESS_TOKEN_SECRET",
    ];
  } else {
    console.error(`Invalid auth_mode: ${auth_mode}`);
    return false;
  }
  for (const k of key) {
    const value = process.env[k];
    if (!value) {
      console.error(`Missing required environment variable: ${k}`);
      return false;
    }
    return true;
  }
  return true;
};

async function main() {
  const transport = new StdioServerTransport();
  if (!checkEnv(process.env.TWITTER_AUTH_MODE as string)) {
    console.error("Failed to initialize TwitterManager");
    process.exit(1);
  }
  const twitter = new TwitterManager();
  twitter.initializeTwitterManager();
  await RegisterToolInServer(twitter);
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
