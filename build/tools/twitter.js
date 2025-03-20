/**
 * Retrieves the latest tweet from a specified user
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {getLastUserXTweetParams} params - Parameters containing the account name to fetch from
 * @returns {Promise<{status: string, post_id?: string, post_text?: string, error?: any}>} The latest tweet information or error
 * @throws {Error} When not in CREDENTIALS mode or client is undefined
 */
export const getLastUserTweet = async (twitter, params) => {
    try {
        console.log("GetLastUserTweet");
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        const lastestTweet = await twitter_client.getLatestTweet(params.account_name);
        if (!lastestTweet) {
            throw new Error("Error trying to get the latest tweet");
        }
        return {
            status: "success",
            post_id: lastestTweet.id,
            post_text: lastestTweet.text,
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Searches tweets based on specific query and maximum tweet count
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {getLastTweetsOptionsParams} params - Parameters containing search query and maximum tweets to fetch
 * @returns {Promise<{status: string, result?: TweetType[], error?: any}>} Collection of matching tweets or error
 * @throws {Error} When not in CREDENTIALS mode or client is undefined
 */
export const getLastTweetsOptions = async (twitter, params) => {
    try {
        console.log("GetLastTweetsOptions");
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        const collectedTweets = [];
        const tweets = twitter_client.searchTweets(params.query, params.maxTeets);
        for await (const tweet of tweets) {
            const tweet_type = {
                id: tweet.id,
                content: tweet.text,
            };
            console.log(tweet.id);
            console.log(tweet.text);
            collectedTweets.push(tweet_type);
        }
        console.log(collectedTweets);
        return {
            status: "success",
            result: collectedTweets,
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Retrieves information about the authenticated Twitter account set in .env
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @returns {Promise<{status: string, my_account_username?: string, error?: any}>} Account information or error
 * @throws {Error} When not in CREDENTIALS mode or client is undefined
 */
export const getOwnTwitterAccountInfo = async (twitter) => {
    try {
        console.log("getOwnTwitterAccountInfo");
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        const my_twitter_account = await twitter_client.me();
        console.log(my_twitter_account);
        return {
            status: "success",
            my_account_username: my_twitter_account,
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Fetches recent tweets from a specified user
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {getLastTweetsFromUserParams} params - Parameters containing username and optional tweet limit
 * @returns {Promise<{status: string, tweets?: TweetType[], error?: any}>} Collection of user's tweets or error
 * @throws {Error} When not in CREDENTIALS mode or client is undefined
 */
export const getLastTweetsFromUser = async (twitter, params) => {
    console.log("getLastTweetsFromUser");
    try {
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        const tweets = params.maxTweets
            ? twitter_client.getTweets(params.username, params.maxTweets)
            : twitter_client.getTweets(params.username);
        const collectedTweets = [];
        for await (const tweet of tweets) {
            const tweet_type = {
                id: tweet.id,
                content: tweet.text,
            };
            collectedTweets.push(tweet_type);
        }
        return {
            status: "success",
            tweets: collectedTweets,
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Retrieves recent tweets and replies from a specified user
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {getLastTweetsAndRepliesFromUserParams} params - Parameters containing username and optional tweet limit
 * @returns {Promise<{status: string, tweets?: TweetType[], error?: any}>} Collection of user's tweets and replies or error
 * @throws {Error} When not in CREDENTIALS mode or client is undefined
 */
export const getLastTweetsAndRepliesFromUser = async (twitter, params) => {
    try {
        console.log("getLastTweetsAndRepliesFromUser");
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        const tweets = params.maxTweets
            ? twitter_client.getTweetsAndReplies(params.username, params.maxTweets)
            : twitter_client.getTweetsAndReplies(params.username);
        const collectedTweets = [];
        for await (const tweet of tweets) {
            const tweet_type = {
                id: tweet.id,
                content: tweet.text,
            };
            collectedTweets.push(tweet_type);
        }
        return {
            status: "success",
            tweets: collectedTweets,
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Gets Twitter user ID from a username
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {getTwitterUserIdFromUsernameParams} params - Parameters containing the username to look up
 * @returns {Promise<{status: string, user_id?: string, error?: any}>} User ID information or error
 * @throws {Error} When not in CREDENTIALS mode or client is undefined
 */
export const getTwitterUserIdFromUsername = async (twitter, params) => {
    try {
        console.log("getTwitterUserIdFromUsername");
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        const userId = await twitter_client.getUserIdByScreenName(params.username);
        return {
            status: "success",
            user_id: userId,
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Retrieves Twitter profile information from a username
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {getTwitterProfileFromUsernameParams} params - Parameters containing the username to fetch profile for
 * @returns {Promise<{status: string, user_id?: any, error?: any}>} Profile information or error
 * @throws {Error} When not in CREDENTIALS mode, client is undefined, or account doesn't exist
 */
export const getTwitterProfileFromUsername = async (twitter, params) => {
    try {
        console.log("geTwitterUserIdFromUsername");
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        const userId = await twitter_client.getProfile(params.username);
        if (!userId) {
            throw new Error(`Account don't exist`);
        }
        return {
            status: "success",
            user_id: userId,
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Creates a new Twitter post using either credentials or API authentication
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {creatTwitterPostParams} params - Parameters containing the post content
 * @returns {Promise<{status: string, result?: any}>} Result object indicating success/failure and optional API response
 * @throws {Error} When neither Twitter API nor Account credentials are set
 */
export const createTwitterpost = async (twitter, params) => {
    try {
        const twitter_auth_mode = twitter.getTwitterAuthMode();
        if (twitter_auth_mode === "CREDENTIALS") {
            console.log("CREDENTIALS");
            const twitter_manager = twitter.getTwitterManager();
            if (!twitter_manager) {
                throw new Error("twitter_client is undefined");
            }
            if (!("twitter_scraper" in twitter_manager)) {
                throw new Error("Invalid twitter client configuration for this operation");
            }
            const twitter_client = twitter_manager.twitter_scraper;
            if (!twitter_client) {
                throw new Error("twitter_client is undefined");
            }
            await twitter_client.sendTweet(params.post);
            return {
                status: "success",
            };
        }
        if (twitter_auth_mode === "API") {
            const twitter_manager = twitter.getTwitterManager();
            if (!twitter_manager) {
                throw new Error("twitter_client is undefined");
            }
            if (!("twitter_api_client" in twitter_manager)) {
                throw new Error("Invalid twitter client configuration for this operation");
            }
            const twitter_client = twitter_manager.twitter_api_client;
            if (!twitter_client) {
                throw new Error("twitter_client is undefined");
            }
            const result = await twitter_client.v2.tweet({
                text: params.post,
            });
            return {
                status: "success",
                result: result,
            };
        }
        else {
            throw new Error(`You don't set Twitter API or Twitter Account`);
        }
    }
    catch (error) {
        console.log(error);
        return {
            status: "failed",
        };
    }
};
/**
 * Replies to a specific tweet using Twitter credentials
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {ReplyTweetParams} params - Parameters containing the tweet ID to reply to and response text
 * @returns {Promise<{status: string, tweet_id?: string, response_text?: string, error?: any}>} Result object with operation status
 * @throws {Error} When not in CREDENTIALS mode or client is undefined
 */
export const ReplyTweet = async (twitter, params) => {
    try {
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        await twitter_client.sendTweet(params.response_text, params.tweet_id);
        return {
            status: "success",
            tweet_id: params.tweet_id,
            response_text: params.response_text,
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Creates and posts a Twitter thread from an array of messages
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {createAndPostTwitterThreadParams} params - Parameters containing array of thread messages
 * @returns {Promise<{status: string, error?: any}>} Result object indicating thread posting status
 * @throws {Error} When thread is empty, not in CREDENTIALS mode, or client is undefined
 */
export const createAndPostTwitterThread = async (twitter, params) => {
    try {
        console.log("CreateTwitterThread");
        const thread_size = params.thread.length;
        if (thread_size <= 0) {
            throw new Error("Your array of thread is empty");
        }
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        for (const [index, thread] of params.thread.entries()) {
            if (index === 0) {
                await twitter_client.sendTweet(thread);
                console.log(`Thread part ${index} = ${thread}`);
                continue;
            }
            let last_tweet_id;
            let conversation_id;
            const tweets = twitter_client.getTweetsAndRepliesByUserId(twitter_manager.twitter_id, 10);
            let i = 0;
            for await (const tweet of tweets) {
                if (i === 0) {
                    last_tweet_id = tweet.id;
                    conversation_id = tweet.conversationId;
                    i = 1;
                    continue;
                }
                if (tweet.conversationId === conversation_id) {
                    last_tweet_id = tweet.id;
                    continue;
                }
            }
            await twitter_client.sendTweet(thread, last_tweet_id);
        }
        return {
            status: "success",
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
/**
 * Follows a Twitter user specified by username
 * @param {TwitterManager} twitter - The Starknet twitter instance containing Twitter authentication
 * @param {FollowXUserFromUsernameParams} params - Parameters containing the username to follow
 * @returns {Promise<{status: string, error?: any}>} Result object indicating follow operation status
 * @throws {Error} When not in CREDENTIALS mode or client is undefined
 */
export const FollowXUserFromUsername = async (twitter, params) => {
    try {
        console.log("getXUserIdFromUsername");
        if (twitter.getTwitterAuthMode() != "CREDENTIALS") {
            throw new Error("You need to be in CREDENTIALS twitter_auth_mode");
        }
        const twitter_manager = twitter.getTwitterManager();
        if (!twitter_manager) {
            throw new Error("twitter_client is undefined");
        }
        if (!("twitter_scraper" in twitter_manager)) {
            throw new Error("Invalid twitter client configuration for this operation");
        }
        const twitter_client = twitter_manager.twitter_scraper;
        if (!twitter_client) {
            throw new Error("twitter_client is undefined");
        }
        await twitter_client.followUser(params.username);
        return {
            status: "success",
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: "failure",
            error: error,
        };
    }
};
