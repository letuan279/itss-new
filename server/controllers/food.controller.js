const connection = require('../db')

module.exports = {
    getAll: async (req, res) => {
        const { userId } = req.body
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM food WHERE idUser = ? AND isDeleted = 0`, [userId],
                (error, results, fields) => {
                    if (error) {
                        console.error('Error get food: ', error);
                        reject(error);
                    } else {
                        return res.json({ success: true, data: results })
                    }
                }
            )
        })
    }
}