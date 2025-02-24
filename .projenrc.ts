import { GemeenteNijmegenCdkApp } from '@gemeentenijmegen/projen-project-type';
import { Statics } from './src/Statics';

const project = new GemeenteNijmegenCdkApp({
  cdkVersion: '2.1.0',
  name: Statics.projectName,
  defaultReleaseBranch: 'main',
  deps: [
    '@gemeentenijmegen/aws-constructs',
  ],
  devDeps: [
    '@gemeentenijmegen/projen-project-type',
    'cdk-nag',
  ],
  projenrcTs: true,

  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
