import { model } from 'mongoose';
import { purchaseHistorySchema } from '../schemas/purchase-history';

const History = model('purchase-histories', purchaseHistorySchema);

export class UserModel {
  async findByEmail(userId) {
    const user = await History.findOne({ userId: userId });
    return user;
  }

  async create(data) {
    const createdNewList = await History.create(data);
    return createdNewList;
  }

  async findAll() {
    const users = await History.find({});
    return users;
  }
}

const HistoryModel = new HistoryModel();

export { HistoryModel };
