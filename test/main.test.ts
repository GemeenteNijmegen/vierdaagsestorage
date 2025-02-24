import { App, Aspects } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks } from 'cdk-nag';
import { StorageStack } from '../src/StorageStack';

test('Snapshot', () => {
  const app = new App();
  const stack = new StorageStack(app, 'test');

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('CDK nag', async() => {
  const app = new App();
  const stack = new StorageStack(app, 'test');
  Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));
});

describe('Infrastructure deployed', () => {
  let template: Template;
  beforeAll(() => {
    const app = new App();
    template = Template.fromStack(new StorageStack(app, 'test'));
  });

  test('Stack should contain S3 bucket', async() => {
    template.hasResource('AWS::S3::Bucket', {});
  });

  test('Stack should contain KMS key', async() => {
    template.hasResource('AWS::KMS::Key', {});
  });

  test('Stack should contain IAM user with access key', async() => {
    template.hasResource('AWS::IAM::User', {});
    template.hasResource('AWS::IAM::AccessKey', {});
    template.hasResource('AWS::SecretsManager::Secret', {});
  });
});
