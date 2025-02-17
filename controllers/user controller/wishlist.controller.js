import { User } from "../../models/user.model.js";

const addToWishlist = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("req.users", courseId);

    const user = req.user;

    const AlreadyInWishlist = user.wishList.includes(courseId);

    if (AlreadyInWishlist) {
      await user.updateOne({ $pull: { wishList: courseId } });
      return res
        .status(201)
        .json({ message: "Already in wishList. So Removed It" });
    }

    user.wishList.push(courseId);

    await user.save();

    res.status(201).json({ message: "Added to Wishlist." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const showWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartData = await User.findOne({ _id: userId }).populate("wishList");

    res.status(200).json(cartData.wishList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export { addToWishlist, showWishlist };
