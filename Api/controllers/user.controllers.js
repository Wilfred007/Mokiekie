import listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler} from '../utils/error.js'

export const test = (req, res) => {
    res.json({
        message: 'Hello World'
    });
}



export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only delete your own account'));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
};
export const getUserListings = async (req, res, next) => {
    try {
        const listings = await listing.find({ userRef: String(req.user.id) });
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};


