const { Op, HasMany, literal } = require('sequelize');
const models = require('../models');

const db = {};

db.register = async (req, res, next) => {
    console.log(req.body);
    let id = req.body.id;
    let pw = req.body.password;
    let name = req.body.name;
    let birth = req.body.birth;
    let gender = req.body.gender;
    try{
        if(!id){
            console.log("Do not find id");
            res.status(404).send("아이디를 입력해주세요.");
        }else{
            if(!pw){
                console.log("Do not find password");
                res.status(404).send("비밀번호를 입력해주세요.")
            }else{
                await models.user.create({
                    user_id: id,
                    user_password: pw
                }).then(result => {
                    console.log("User Data Added");
                    console.log("_______________________");
                });

                let fkUserId = await models.user.findOne({
                    attributes: ['id'],
                    where: {
                        user_id: id
                    }
                });
                console.log(`value: ${fkUserId}, type: ${typeof(fkUserId)}`);
                await models.user_profile.create({
                    fk_user_id: fkUserId.id,
                    user_name: name ? name : "",
                    birth: birth ? birth : "",
                    gender: gender ? gender : ""
                });

                res.status(200).send("Finished register");
            }
        }
    }catch(e){
        console.log(e);
        res.status(500).send("server error");
    }
}

db.searchUser = async (req, res, next) => {
    let userId = req.query.userid;
    try{
        await models.user.findAll({
            attributes: ['id', 'user_id', 'user_password', 'createdAt'],
            where: {
                user_id: {
                    [Op.like]: `%${userId}%`
                }
            },
            include: [
                {
                    model: models.user_profile,
                    as: 'up',
                    // association: new HasMany(models.user, models.user_profile, {constraints: false}),
                    // on: literal('users.id = user_profiles.fkUserId'),
                    // attributes: ['up.fk_user_id', 'up.user_name']
                    
                }
            ]
        }).then(data => {
            res.status(200).send({data});
        });
    }catch(e){
        res.status(500).send("db.searchUser error");
        next(e);
    }
}

module.exports = db;