# MCP Twitter

## Description
MCP Twitter is a server based on the Model Context Protocol that allows direct interaction with Twitter/X. It exposes various Twitter API functionalities through a standardized set of tools, enabling AI models and applications to perform actions on Twitter.

## Features

This MCP server provides the following actions:

- **`create_twitter_post`**: Create a new X/Twitter post
- **`reply_twitter_tweet`**: Reply to a specific X/Twitter post by ID
- **`get_last_tweet`**: Get the most recent post from a specified X/Twitter account
- **`get_last_tweets_options`**: Get a specified number of posts matching a search query
- **`create_and_post_twitter_thread`**: Create and publish an X/Twitter thread
- **`follow_twitter_from_username`**: Follow an X/Twitter user by username
- **`get_twitter_profile_from_username`**: Get complete X/Twitter profile data by username
- **`get_twitter_user_id_from_username`**: Get X/Twitter user ID from username
- **`get_last_tweet_and_replies_from_user`**: Get recent X/Twitter posts and replies from a user
- **`get_last_tweet_from_user`**: Get recent X/Twitter posts from a user
- **`get_own_twitter_account_info`**: Get current account profile data

## Installation and Usage

### Local Installation

```bash
# Clone the repository
git clone https://github.com/0xhijo/mcp_twitter.git

# Install dependencies and build the project
pnpm build

# Launch the server
node ./build/index.js
```
### Installation via NPX
```bash
npx mcp_twitter
```

## Configuration 

### Configuration via Twitter Scraper

1. Configure the .env file:

```sh
TWITTER_AUTH_MODE = "CREDENTIALS" # Credentials mode

# Your Twitter credentials

TWITTER_USERNAME="YOUR_TWITTER_USERNAME"
TWITTER_PASSWORD="YOUR_TWITTER_PASSWORD"
TWITTER_EMAIL="YOUR_TWITTER_EMAIL"
```

You need to configure Twitter authentication by creating a `.env` file or directly adding the variables to your environment.

### Configuration via Twitter API

1. Create a Developer Account:

Make sure you have a Twitter account
Visit the Developer Platform
Get your API credentials
Follow this guide if you need help creating your developer account

2. Configure the .env file

```sh
TWITTER_AUTH_MODE = "API" # API mode

# Your CREDENTIALS obtained from the Developer Platform

TWITTER_API="YOUR_TWITTER_API"
TWITTER_API_SECRET="YOUR_TWITTER_API_SECRET"
TWITTER_ACCESS_TOKEN="YOUR_TWITTER_ACCESS_TOKEN"
TWITTER_ACCESS_TOKEN_SECRET="YOUR_TWITTER_ACCESS_TOKEN_SECRET"
```
## Integrating with Claude
To use MCP Twitter with Claude, you need to add it to your `claude_mcp_config.json` file. This will allow Claude to interact with Twitter through the MCP server.

### Adding to Claude's MCP Configuration
Add the following entry to your `claude_mcp_config.json` file:

```json
"mcp_twitter": {
  "command": "npx",
  "args": ["mcp_twitter"],
  "env": {
    "TWITTER_AUTH_MODE": "CREDENTIALS",
    "TWITTER_USERNAME": "YOUR_TWITTER_USERNAME",
    "TWITTER_PASSWORD": "YOUR_TWITTER_PASSWORD",
    "TWITTER_EMAIL": "YOUR_TWITTER_EMAIL"
  }
}
```
Replace the placeholder credentials with your actual Twitter account information. This configuration will launch the MCP Twitter server using npx when Claude needs to interact with Twitter.

### Usage with Claude
Once configured, Claude will be able to use all the Twitter functionalities provided by the MCP server, such as creating posts, retrieving tweets, and more. You can simply ask Claude to perform Twitter actions, and it will utilize the MCP server to execute them.




## Important Notes
- Choose the authentication mode (API or CREDENTIALS) based on your needs
- Verify that your credentials are properly configured in the .env file
- Check the official documentation for more details about API limitations





