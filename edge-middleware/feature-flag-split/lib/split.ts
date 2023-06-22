import {
  SplitFactory,
  PluggableStorage,
  ErrorLogger,
} from '@splitsoftware/splitio-browserjs'
import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils'

export async function createSplitClient(userKey: string) {
  const client = SplitFactory({
    core: {
      authorizationKey: process.env.NEXT_PUBLIC_SPLIT_SDK_CLIENT_API_KEY!,
      key: userKey,
    },
    mode: 'consumer_partial',
    storage: PluggableStorage({
      wrapper: EdgeConfigWrapper({
        // The Edge Config item where Split stores feature flag definitions, specified in the Split integration step
        edgeConfigKey: 'split_default_855',
      }),
    }),
    // Disable or keep only ERROR log level in production, to minimize performance impact
    debug: ErrorLogger(),
  }).client()

  // Wait to load feature flag definitions from the Edge Config
  await client.ready()

  return client
}
