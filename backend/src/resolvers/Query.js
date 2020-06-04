const { forwardTo } = require('prisma-binding');

const Query = {
  beers: forwardTo('db'),
  beer: forwardTo('db'),
  breweries: forwardTo('db'),
  brewery: forwardTo('db'),
  beersConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check is there is a current userId
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  }
};

module.exports = Query;
