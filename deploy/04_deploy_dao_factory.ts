import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, ethers} = hre;
  const {deploy, get} = deployments;

  const {deployer} = await getNamedAccounts();

  const kernelBase = await get('Kernel');
  const aclBase = await get('ACL');
  const evmScriptRegistryFactory = await get('EVMScriptRegistryFactory');

  await deploy('DAOFactory', {
    from: deployer,
    args: [
      kernelBase.address,
      aclBase.address,
      process.env.WITHOUT_EVM_SCRIPT_REGISTRY_FACTORY
        ? ethers.constants.AddressZero
        : evmScriptRegistryFactory.address,
    ],
    log: true,
  });
};

export default func;

func.tags = ['DAOFactory'];

func.dependencies = ['ACL', 'EVMScriptRegistryFactory', 'Kernel'];
