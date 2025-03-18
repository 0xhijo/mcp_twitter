import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider } from 'starknet';
import {
  StarknetAgentInterface,
  JsonConfig,
  StarknetAgent,
  registerTools,
  StarknetTool,
} from '@starknet-agent-kit/agents'
import path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const server = new McpServer({
  name: 'snak',
  version: '1.0.0',
});

export const RegisterToolInServer = async (allowed_tools: string[]) => {
  const JsonConfig: JsonConfig = {
    name: 'snak',
    interval: 1000,
    chat_id: 'mock_value',
    internal_plugins: allowed_tools,
    mcp: false,
  };
  const agent = new StarknetAgent({
    provider: new RpcProvider({ nodeUrl: process.env.STARKNET_RPC_URL }),
    accountPrivateKey: process.env.STARKNET_PRIVATE_KEY as string,
    accountPublicKey: process.env.STARKNET_PUBLIC_ADDRESS as string,
    aiModel: process.env.AI_MODEL as string,
    aiProvider: process.env.AI_PROVIDER as string,
    aiProviderApiKey: process.env.AI_PROVIDER_API_KEY as string,
    signature: 'key',
    agentMode: 'agent',
    agentconfig: JsonConfig,
  });
  const tools: StarknetTool[] = [];
  await registerTools(agent, allowed_tools, tools);
  for (const tool of tools) {
    if (!tool.schema) {
    } else {
      server.tool(
        tool.name,
        tool.description,
        tool.schema.shape,
        async (params: any, extra : any) => {
          const result = await tool.execute(agent, params);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result),
              },
            ],
          };
        }
      );
    }
  }
};

async function main() {
  const transport = new StdioServerTransport();
  await RegisterToolInServer(process.argv.slice(2));
  await server.connect(transport);
  console.error('Starknet MCP Server running on stdio');
}
main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
