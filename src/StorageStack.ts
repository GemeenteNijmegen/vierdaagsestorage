import { Stack, StackProps } from 'aws-cdk-lib';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Bucket, BucketEncryption, ObjectOwnership } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Configurable } from './Configuration';
import { S3AccessUser } from './S3AccessUser';


interface StorageStackProps extends StackProps, Configurable {}
/**
 * This stack creates an S3 Bucket with a customer managed encryption key,
 * and grants an IAM user access to the bucket.
 */
export class StorageStack extends Stack {
  constructor(scope: Construct, id: string, props?: StorageStackProps) {
    super(scope, id, props);

    const key = new Key(this, 'key', {
      description: 'userdata for this account',
    });

    const bucket = new Bucket(this, 'storage', {
      versioned: true,
      enforceSSL: true,
      encryption: BucketEncryption.KMS,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      encryptionKey: key,
    });

    new S3AccessUser(this, 'app-user', { bucket, key });

  }
}
