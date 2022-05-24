import { model } from 'mongoose';
import { shoppingSchema } from '../schemas/shopping-cart';

const shopping = model('shopping-cart', shoppingSchema);

export class shoppingModel {
    async findByUser(userId) {
        const user = await shopping.findOne({ userId: userId});
        return user;
    }

    async create(data) {
        const createdNewList = await shopping.create(data);
        return createdNewList;
    }

    async findAll() {
        const users = await shopping.find({});
        return users;
    }

    async update({ userId, update }) {
        const filter = { _id: userId };
        const option = { returnOriginal: false };

        const updatedUse = await shopping.findOneAndUpdate(filter, update, option);
        return updatedUse;
    }
}

const shoppingModel = new shoppingModel();

export { shoppingModel };