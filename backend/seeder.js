import mongoose from "mongoose";
import users from "./src/data/users.js";
import products from "./src/data/products.js";
import User from "./src/models/userModel.js";
import Product from "./src/models/productModel.js";
import Order from "./src/models/orderModel.js";
import { connectDB } from "./src/config/db.js";

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);

    const adminUser = createUsers[0]._id;

    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleData);

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
