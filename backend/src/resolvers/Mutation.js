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

  updateBeer(parent, args, ctx, info) {
    // take a copy of the update
    const updates = { ...args };
    // remove the id from the updates
    delete updates.id;
    // run update method
    return ctx.db.mutation.updateBeer(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
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
  },

  updateBrewery(parent, args, ctx, info) {
    // take a copy of the update
    const updates = { ...args };
    // remove the id from the updates
    delete updates.id;
    // run update method
    return ctx.db.mutation.updateBrewery(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = Mutations;
