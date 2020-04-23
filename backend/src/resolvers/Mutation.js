const Mutations = {
  async createBeer(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const beer = await ctx.db.mutation.createBeer(
      {
        data: {
          ...args
        }
      },
      info
    );
    return beer;
  },

  async createBrewery(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const brewery = await ctx.db.mutation.createBrewery(
      {
        data: {
          ...args
        }
      },
      info
    );
    return brewery;
  }
};

module.exports = Mutations;
