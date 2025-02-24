import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { StorageStack } from '../src/StorageStack';

test('Snapshot', () => {
  const app = new App();
  const stack = new StorageStack(app, 'test');

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
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
});
