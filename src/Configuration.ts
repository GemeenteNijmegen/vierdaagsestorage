import { Statics } from './Statics';

/**
 * Adds a configuration field to another interface
 */
export interface Configurable {
  configuration: Configuration;
}

/**
 * Environment object (required fields)
 */
export interface Environment {
  account: string;
  region: string;
}

/**
 * Basic configuration options per environment
 */
export interface Configuration {
  /**
   * Branch name for the applicible branch (this branch)
   */
  branch: string;

  /**
   * The pipeline will run from this environment
   *
   * Use this environment for your initial manual deploy
   */
  buildEnvironment: Environment;

  /**
   * Environment to deploy the application to
   *
   * The pipeline (which usually runs in the build account) will
   * deploy the application to this environment. This is usually
   * the workload AWS account in our default region.
   */
  deploymentEnvironment: Environment;

}

const EnvironmentConfigurations: {[key:string]: Configuration} = {
  acceptance: {
    branch: 'acceptance',
    buildEnvironment: Statics.gnBuildEnvironment,
    deploymentEnvironment: Statics.gn4DaagseStorageAccpEnvironment,
  },
  production: {
    branch: 'main',
    buildEnvironment: Statics.gnBuildEnvironment,
    deploymentEnvironment: Statics.gn4DaagseStorageProdEnvironment,
  },
};

/**
 * Retrieve a configuration object by passing a branch string
 *
 * **NB**: This retrieves the subobject subobject containing the `branchName` as the value of the `branch` key
 *
 * @param branchName the branch for which to retrieve the environment
 * @returns the configuration object for this branch
 */

export function getEnvironmentConfiguration(branchName: string, configuration?: {[key:string]: Configuration}): Configuration {
  if (!configuration) configuration = EnvironmentConfigurations;
  const configName = Object.keys(configuration).find((configurationName) => {
    const config = configuration[configurationName];
    return config.branch == branchName;
  });
  if (configName) {
    const config = configuration[configName];
    validateConfig(config);
    return configuration[configName];
  }
  throw Error(`No configuration found for branch name ${branchName}`);
}

/**
 * Validation logic for config (for instance, disallowing devmode in prod)
 *
 * @param _config
 * @returns
 */
function validateConfig(_config: Configuration) {
  if (1!=1) {
    throw Error('invalid configuration');
  }
}
