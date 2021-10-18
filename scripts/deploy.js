const chalk = require('chalk')
const { network } = require('hardhat')

async function main() {
  const Data = await ethers.getContractFactory('Dataset')
  const data = network.config.contract
    ? await Data.attach(network.config.contract)
    : await Data.deploy('Datasets', 'DATA')

  console.log('Contract deployed at: ' + chalk.green(data.address))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
