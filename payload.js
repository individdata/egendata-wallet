#!/usr/bin/env node

const { Command } = require('commander');
const { exit } = require('process');

const program = new Command();

program.name('payload-gen').description('Utility to generate payload data for egendata wallet.').version('0.1.0');

// providerWebId, purpose, documentType, requestorWebId, returnUrl

program
  .command('build')
  .description('Build a new payload from parameters.')
  .argument('<providerWebId>', 'Entity that can provide data for the request.')
  .argument('<requestorWebId>', 'Entity that requests the data.')
  .option('-p, --purpose <string>', 'Purpose of the request.', 'Testing purposes.')
  .option(
    '-d, --documentType <document type>',
    "Type of document that's requested (link to RDF type).",
    'http://egendata.se/schema/core/v1#UnemploymentCertificate',
  )
  .option('-u, --returnUrl <url>', 'Destination to send user to when complete.', 'https://example.com/some/destination')
  .action((providerWebId, requestorWebId, options) => {
    const { purpose, documentType, returnUrl } = options;

    const data = { providerWebId, requestorWebId, purpose, documentType, returnUrl };
    const payload = Buffer.from(JSON.stringify(data), 'utf-8').toString('base64');
    console.log(payload);
  });

program
  .command('decode')
  .description("Decode a payload. Either from entire URL or on it's own.")
  .argument('<string>', 'URL or string with payload.')
  .option('--no-values', 'Only show keys (hide values)')
  .action((payload, options) => {
    const { values } = options;

    payload = payload.startsWith('http') ? payload.split('?payload=')[1] : payload;
    let data;
    try {
      data = JSON.parse(Buffer.from(decodeURIComponent(payload), 'base64').toString('utf-8'));
    } catch (error) {
      console.error("Couldn't find valid payload");
      exit(1);
    }

    console.log('');
    if (values) {
      const maxKeyLength =
        Math.ceil(Object.keys(data).reduce((prev, value) => (value.length > prev ? value.length : prev), 0) / 4) * 4;

      for (const [key, value] of Object.entries(data)) {
        console.log(`${key.padStart(maxKeyLength)}: ${value}`);
      }
    } else {
      console.log(Object.keys(data).join(', '));
    }
  });

program.parse();
