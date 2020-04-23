const { forwardTo } = require('prisma-binding');

const Query = {
  beers: forwardTo('db'),
  breweries: forwardTo('db')
  // async beers(parent, args, ctx, info) {
  //   const beers = await ctx.db.query.beers();
  //   return beers;
  // },
  // async breweries(parent, args, ctx, info) {
  //   const breweries = await ctx.db.query.breweries();
  //   return breweries;
  // }
};

module.exports = Query;
