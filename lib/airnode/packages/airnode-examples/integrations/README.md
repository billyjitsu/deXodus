# Integrations

This folder contains integrations showcasing various features and API integrations, which can be run using a basic
Airnode flow. Each integration is self contained in its own folder. The only exception is the contract of the requester.
All requesters are located in the `../contracts` directory.

Each integration consist of a these files:

- `config.example.json` - An example configuration file for this integration.
- `create-config.ts` - A file that will be called by `create-airnode-config.ts` to create the `config.json` file. See
  the [docs](https://docs.api3.org/reference/airnode/latest/understand/configuring.html#creating-config-json) for
  details.
- `create-secrets.ts` - A file that will be called by `create-airnode-secrets.ts` to create the `secrets.env` file. See
  the [docs](https://docs.api3.org/reference/airnode/latest/understand/configuring.html#creating-secrets-env) for
  details.
- `README.md` - Should explain what the particular integration is about.
- `request-utils.ts` - This file contains functions which are necessary to make the Airnode request.
- `secrets.example.env` - An example file listing the necessary secret values of `secrets.env` file.

## Adding new integration

> This section is intended for developers, if you are only interested in running the examples you can skip this section

First, make sure there is not a similar integration already and consult the team beforehand.

When adding an integration you need to do a few things:

1. Pick a `kebab-case` name for your integration and create such folder in this directory and in `../contracts`
2. Create an `Requester.sol` contract in `../contracts/<your-chosen-name>` - Important part is to handle how to decode
   the data received by the Airnode
3. Create all the necessary files (see the section above) for your integration. Some of the files are explained more in
   depth below
4. After creating the necessary files (generators), you need to generate the example files for configuration and
   secrets. Generate them by running `yarn dev:generate-example-files`
5. Run `yarn build` from the top-level `airnode` directory to build the contract artifacts.
6. Once tested, add a description of the integration to the
   [airnode-examples README](https://github.com/api3dao/airnode/blob/master/packages/airnode-examples/README.md).

It is best to start with an existing integration and just edit the relevant parts. Try to make your integration as
simple and focused as possible and not include unnecessary features.

### README.md

Pay special care to the README file and clearly explain what the integration is about and document any extraneous
features.

### create-config.ts

This script is intended to generate the `config.json` when the user runs the integration flow or `config.example.json`
when invoked from tests or when generating the example file. This file is expected to `export default` a single
function, which can be asynchronous.

Any values or sections that are changing depending on how the example is run should be generated by this script. Other
values should be hardcoded. If the generated snippet will be common for all integrations (e.g. cloud provider section)
it should be implemented in `integrations/config-utils.ts`.

All secret values should be put to `secrets.env` (e.g. airnode wallet mnemonic) and `config.json` should be set to
interpolate from it.

You only need to define a single trigger in `config.json`, because the `../scripts/request-utils.ts` will use the first
trigger that is listed.

### create-secrets.ts

This script is intended to generate the `secrets.env` when the user runs the integration flow or `secrets.example.env`
when invoked from tests or when generating the example file. This file is expected to `export default` a single
function, which can be asynchronous.

Similarly, if the secret is common for all integrations, then the logic for generating it should be implemented in
`integrations/secrets-utils.ts`.

### request-utils.ts

This file is expected to `export const` a pair of functions (both can be asynchronous):

- `getEncodedParameters` - Returns the encoded parameters that are passed to the requester contract when making the
  request.
- `printResponse` - Is a function which outputs the data received by the requester contract (and maybe format it before
  showing it to the user). This function receives a `requestId` as the only parameter.