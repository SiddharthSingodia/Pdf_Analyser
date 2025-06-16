import { v } from 'convex/values'
import { mutation,query } from './_generated/server'

export const createUser = mutation({
    args: {
        email: v.string(),
        userName: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        //if user already exists
        const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect();

        //if not exist. then insert new entry
        if (user.length === 0) {
            await ctx.db.insert('users', {
                email: args.email,
                userName: args.userName,
                imageUrl: args.imageUrl,
                upgrade:false,
            });
            return 'inserted new user';
        }
        return 'user already exists';
    }
})

export const userUpgradePlan = mutation({
    args: {
        userEmail:v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.userEmail)).collect();
        if (result.length === 0) {
            return 'user not found';
        }
            await ctx.db.patch(result[0]._id, { upgrade: true });
        return 'user upgraded';
    }
})

export const GetUserInfo=query({
    args:{
        userEmail:v.optional(v.string()),
    },
    handler:async(ctx,args)=>{
        if(!args.userEmail){
            return 'user email is required';
        }
        const result=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args?.userEmail)).collect();
        if(result.length===0){
            return 'user not found';
        }
        return result[0];
    }
})