import User from "../models/UserModel.js"

export const Search = async (req, res) => {
    try {
        const searchTerm = req.body.search
        if (searchTerm.length < 3) { 
            return res.status(200).json({message: "Requires minimum 3 characters to search"})
        }

        let searchRegex = new RegExp(searchTerm);
        const searchResult = await User.find({username:{$regex: searchRegex, $options: 'i'}}).exec();
        if (searchResult.length > 0) {
            console.log(searchResult)
            return res.status(200).json({message: "search success", searchResult})
        } else {
            return res.status(201).json({message: "Search empty"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error searching", error})
    }
}