const SubscribedModalModule = require('./SubscribedModal');

module.exports = {
  create: (data) => {
    return SubscribedModalModule.create(data);
  },
  findByEmail:(email) =>{
    return SubscribedModalModule.findOne({email : email})
  }
}
