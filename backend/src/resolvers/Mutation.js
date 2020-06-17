const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  },

  async deleteBeer(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the beer
    const beer = await ctx.db.query.beer({ where }, `{id name}`);
    // check if permissions
    //TODO
    // delete
    return ctx.db.mutation.deleteBeer({ where }, info);
  },

  async deleteBrewery(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the beer
    const brewery = await ctx.db.query.brewery({ where }, `{id name}`);
    // check if permissions
    //TODO
    // delete
    return ctx.db.mutation.deleteBrewery({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // has the password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the db with default permissions
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set jwt as a cookie on response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // finally return user to the browser
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // check if there is a user with email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found email ${email}`);
    }
    // check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // return the user
    return user;
  }
};

module.exports = Mutations;
