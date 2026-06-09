const getAllUsers = (req,res) => {
    res.json({ status: 'success', message : 'Get all users'});
}

module.exports = {
    getAllUsers
}