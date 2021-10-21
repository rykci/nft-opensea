const chalk = require('chalk')
const { network, ethers } = require('hardhat')

const ITEM_CID = 'QmaeWyR9f1A2ehBEehtNFwXvJaRkZWzE7QfgrXAapDVkb8'

async function main() {
  const [owner] = await ethers.getSigners()
  const Minter = await ethers.getContractFactory('ItemMinter')
  const minter = network.config.contract
    ? await Minter.attach(network.config.contract)
    : await Minter.deploy('Datasets', 'DATA')

  console.log('Contract deployed at: ' + chalk.green(minter.address))

  console.log(chalk.blue('Minting...'))
  await minter
    .mintItem(owner.address, `https://ipfs.io/ipfs/${ITEM_CID}`)
    .then(console.log(chalk.blue('Minted')))
    .catch((error) => console.log(error))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
