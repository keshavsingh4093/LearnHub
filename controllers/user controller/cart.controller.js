import { User } from "../../models/user.model.js";

const addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;

    const user = req.user;

    const AlreadyPurchased = user.enrolledCourse.includes(courseId);

    if (AlreadyPurchased) {
      return res.status(201).json({ message: "Already Purchased." });
    }

    const AlreadyInCart = user.cartItems.includes(courseId);

    if (AlreadyInCart) {
      return res.status(201).json({ message: "Already present in Cart." });
    }

    user.cartItems.push(courseId);

    await user.save();

    res.status(201).json({ message: "Added to Cart." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const showCartItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartData = await User.findOne({ _id: userId }).populate("cartItems");

    res.status(200).json(cartData.cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export { addToCart, showCartItems };
