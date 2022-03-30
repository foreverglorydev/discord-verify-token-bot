const {Client, Intents, Formatters, MessageActionRow, MessageButton} = require('discord.js');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/a92faac6e14345c0863377643370c015'))
const contract_abi = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"_tokenURI","type":"string"}],"name":"ChangeTokenURI","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_minter","type":"address"}],"name":"changeMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"changeTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contract_address = '0x9bF9a87dA723d38529F485407da7C2EeD9950DAA'
const NFTContract = new web3.eth.Contract(contract_abi, contract_address);
const CHANNEL_ID = "956466966120497204";
const PROCESSING_CHANNEL_ID = "958765708936884254";
const ROLE_ID = "956473192984244264";
const APP_TOKEN = "OTU2NDYzNjIwMzI0MjAwNDU5.YjwmKQ.g81gwYAqn9BRHjiU8x24ARaelrQ";
const GUILD_ID = "956465226423861269";
const USER_ID = "709971735306436649";

const {getUserById, getUserByWallet, saveUser, updateUser} = require('./controller/userController')

// default loading data
// sequelize.sync({ force: true }).then(async () => {
//     console.log("db is ready");
//         const user = {
//             userId: USER_ID,
//             wallet: '0x6f99e915Ee5B592a1Fd2203e15B0ECc157B535c8',
//             balance: 11
//         };
//         await User.create(user);
//     console.log("sample data inserted.");
// });

// const wssProvider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/a92faac6e14345c0863377643370c015', {
//     keepAlive: true,
//     timeout: 30000,
//     clientConfig: {
//         // Useful if requests are large
//         maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
//         maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
//
//         // Useful to keep a connection alive
//         keepalive: true,
//         keepaliveInterval: 60000 // ms
//     },
//
//     // Enable auto reconnection
//     reconnect: {
//         auto: true,
//         delay: 5000, // ms
//         maxAttempts: 5,
//         onTimeout: false
//     }
// });
// const wssWeb3 = new Web3(wssProvider);
// const wssContract = new wssWeb3.eth.Contract(contract_abi, contract_address);

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]});

const prefix = '!verify';

client.once('ready', async () => {
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        // console.log('guilds-----', client.guilds)

        if (!channel || channel.type !== 'GUILD_TEXT')
            return console.log(`Can't send message to this channel`);
        // channel.send("I am back.");
        console.log('Bot ready');

        const guild = await client.guilds.fetch(GUILD_ID);
        // console.log('guild----', guild);
        const username = client.users.cache.get(USER_ID)
        // grantRole(guild, ROLE_ID, USER_ID, channel, username)
    } catch (e) {
        console.log(e)
    }
});

client.on('messageCreate', async message => {
    console.log('message---', message.content);
    if (message.channelId === CHANNEL_ID && !message.author.bot && message.content.startsWith(prefix)) {
        const linkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('http://localhost:3000')
                    .setLabel('Verify Wallet')
                    .setStyle('LINK')
            )
        client.users.cache.get(message.author.id).send({
            content: 'Please navigate to the following link to verify your wallet',
            components: [linkRow]
        });
    }
    if (message.channelId === PROCESSING_CHANNEL_ID && message.author.bot && message.content.startsWith(prefix)) {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            const args = message.content.split(/(\s+)/);
            console.log('args------', args);
            if (args[2] && args[4] && Web3.utils.isAddress(args[4])) {
                const userId = args[2];
                const wallet = args[4];
                const username = client.users.cache.get(userId)

                const userByWallet = await getUserByWallet(wallet);
                if (userByWallet && userByWallet.userId !== userId) {
                    client.users.cache.get(userId).send(` ${username}! Another member is already using the wallet.`);
                    return;
                }
                const balance = await getBalance(wallet);
                const userById = await getUserById(userId);
                if (!userById) {
                    await saveUser(userId, wallet, balance)
                } else {
                    await updateUser(userById.id, userId, wallet, balance);
                }

                parseInt(balance) > 0
                    ? addRole(message.guild, ROLE_ID, userId, channel, username)
                    : removeRole(message.guild, ROLE_ID, userId, channel, username)
            } else {
                // channel.send(` ${username}! Follow the correct format.`);
            }
        } catch (e) {
            console.log(e)
        }
    }

})

const addRole = async (guild, roleId, userId, channel, username) => {
    let role = guild.roles.cache.find(r => r.id === roleId);
    let member = guild.members.cache.get(userId);
    if (member.roles.cache.some(role => role.id === roleId)) {
        client.users.cache.get(userId).send(` ${username}! You already have Verified Member Role.`);
        return;
    }
    member.roles.add(role);
    client.users.cache.get(userId).send(`Congratulations ${username}! You got Verified Member Role.`)
}

const removeRole = async (guild, roleId, userId, channel, username) => {
    let role = guild.roles.cache.find(r => r.id === roleId);
    let member = guild.members.cache.get(userId);
    if (member.roles.cache.some(role => role.id === roleId)) {
        member.roles.remove(role);
        client.users.cache.get(userId).send(` ${username}! You lost Verified Member Role because you don't own NFT in your wallet.`)
    }
}

const grantRoleById = async (guild, roleId, userId, channel, username) => {
    let role = guild.roles.cache.get(roleId);
    let member = guild.members.cache.get(userId);
    if (member.roles.cache.some(role => role.id === roleId)) {
        return;
    }
    member.roles.add(role);
}

const removeRoleById = async (guild, roleId, userId, channel, username) => {
    let role = guild.roles.cache.get(roleId);
    let member = guild.members.cache.get(userId);
    if (member.roles.cache.some(role => role.id === roleId)) {
        member.roles.remove(role)
    }
}

const getBalance = async (address) => {
    try {
        const balance = await NFTContract.methods.balanceOf(address).call();
        console.log('balance -----', balance);
        return balance
    } catch (e) {
        console.log(e)
    }
}

const checkWallet = async (wallet) => {
    const balance = await getBalance(wallet);
    const userByWallet = await getUserByWallet(wallet);
    if (userByWallet) {
        await updateUser(userByWallet.id, userByWallet.userId, wallet, balance);
        const guild = await client.guilds.fetch(GUILD_ID);
        const channel = await client.channels.fetch(CHANNEL_ID);
        const username = client.users.cache.get(userByWallet.userId)
        parseInt(balance) > 0
            ? grantRoleById(guild, ROLE_ID, userByWallet.userId, channel, username)
            : removeRoleById(guild, ROLE_ID, userByWallet.userId, channel, username)
    }
}
// getBalance('0x6f99e915Ee5B592a1Fd2203e15B0ECc157B535c8');

// wssContract.events.Transfer({
//     filter: {
//         // operator: ArbUtils.applyL1ToL2Alias(Config.addresses.l1Staking),
//     }
// }).on('data', async function (event) {
//     console.log('data', event);
//     if (event.returnValues) {
//         const {from, id, operator, to, value} = event.returnValues;
//         console.log(`NFT#${id} transferred from ${from} to ${to}`);
//         Web3.utils.toBN(from).eq(Web3.utils.toBN(0)) || await checkWallet(from);
//         Web3.utils.toBN(to).eq(Web3.utils.toBN(0)) || await checkWallet(to);
//         // const {selectedAccount} = walletLib.getAccountInfo();
//         // if (selectedAccount) {
//         //     if (selectedAccount.toLowerCase() === to.toLowerCase() && Web3.utils.toBN(from).eq(Web3.utils.toBN(0))) {
//         //         alert(`${value} tokens were minted to user ${to}`);
//         //     }
//         // }
//     }
// }).on('connected', function (event) {
//     console.log('connected', event);
// }).on('error', function (error, receipt) {
//     console.log('error', error, receipt);
// });

client.login(APP_TOKEN);
