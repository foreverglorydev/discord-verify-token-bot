const User = require('../model/user');

const getAllUsers = async () => {
    return await User.findAndCountAll()
}

const getUserById = async (userId) => {
    return new Promise((resolve) => {
        User.findOne({where: {userId: userId}}).then(item => {
            if (item) console.log('Get User By Wallet ----', item.id, item.userId, item.wallet, item.balance)
            resolve(item)
        })
    })
}

const getUserByWallet = async (wallet) => {
    return new Promise((resolve) => {
        User.findOne({where: {wallet: wallet}}).then(item => {
            if (item) console.log('Get User By Wallet ----', item.id, item.userId, item.wallet, item.balance)
            resolve(item)
        })
    })
}

const saveUser = async (userId, wallet, balance) => {
    const user = {
        userId,
        wallet,
        balance
    };
    await User.create(user).then(item => {
        console.log('Save User --- ', item.id, item.userId, item.wallet, item.balance)
        return true;
    })
};

const updateUser = async (id, userId, wallet, balance) => {
    await User.findByPk(id).then(item => {
        if (item !== null) {
            item
                .update({
                    userId, wallet, balance
                })
                .then(item => {
                    console.log('Update User ----- ', item.id, item.userId, item.wallet, item.balance)
                    return true
                })
        } else {
            return false;
        }
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByWallet,
    saveUser,
    updateUser
}
