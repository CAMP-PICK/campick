import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      address1: {
        type: String,
        required: false,
      },
      address2: {
        type: String,
        required: false,
      },
      address3: {
        type: String,
        required: false,
      },
    },
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { UserSchema };
