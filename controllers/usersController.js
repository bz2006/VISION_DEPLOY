import Product from "../models/productModel.js";
import User from "../models/userModel.js";



// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg',
//     'video/mp4': 'mp4'
// }

// export const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const isValid = FILE_TYPE_MAP[file.mimetype];
//         let uploadError = new Error('invalid image type');

//         if (isValid) {
//             uploadError = null
//         }
//         cb(uploadError, 'C:/Users/EPHREM B/VISION/client/public/uploads')
//     },
//     filename: function (req, file, cb) {
//         const newfile = file.originalname.split(" ").join("_")
//         cb(null, newfile)
//     }
// })




export const updateuseraddress = async (req, res) => {
    const userId = req.params.id; 
    const addressId = req.body.adrsid; 
    const updatedAddressData = req.body.selectedaddress;

    try {
        
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send('User not found');
        }
    
       
        const addressIndex = user.addresses.findIndex(
          (address) => address._id.toString() === addressId
        );
        if (addressIndex === -1) {
          return res.status(400).send('Invalid address ID');
        }
    
        
        const updatedUser = await User.updateOne(
          { _id: userId, "addresses._id": Object(addressId) }, 
          { $set: { "addresses.$": updatedAddressData } } 
        );
    
        if (updatedUser.modifiedCount === 0) {
          return res.status(404).send('Address not found');
        }
    
        res.status(200).send('Address updated successfully');
      } catch (error) {
      }
    }

export const useraddress = async (req, res) => {
    const userId = req.params.id; 
    const addresses = req.body; 

    try {
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

     
        addresses.forEach(({ name, address, city, state, country, pin, phone }) => {
            user.addresses.push({ name, address, city, state, country, pin, phone });
        });

        await user.save();

        res.json({ message: 'Addresses added successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


export const getalladdress = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        const Alladdres = user.addresses
        const defadrs = user.defaddress
        return res.status(200).json({ Alladdres, defadrs });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const setDefaultadrs = async (req, res) => {
    try {
        const userId = req.params.id;
        const defadrs = Object.keys(req.body)[0];

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        user.defaddress = defadrs;

        await user.save();
        return res.status(200).json({ message: "Something went wrong" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const usersList = await User.find({});
        if (!usersList) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        return res.status(200).json({ usersList });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const updateUserOrdersno = async (req, res) => {
  const userId = req.params.id;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.ordersNo = user.ordersNo+1;
      await user.save();
      return res.status(200).json({ success: true, message: 'Number of orders updated successfully' });
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
};



export const deleteuseraddress = async (req, res) => {
    const userId = req.params.id; 
    const addressId = Object.keys(req.body)[0]; 
    

    try {
        
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send('User not found');
        }
    
       
        const addressIndex = user.addresses.findIndex(
          (address) => address._id.toString() === addressId
        );
        if (addressIndex === -1) {
          return res.status(400).send('Invalid address ID');
        }
    
        
        const deleteadrs = await User.updateOne(
            { _id: userId },
            { $pull: { "addresses": { _id: Object(addressId) } } }
          );
          if (!deleteadrs) {
            return res.status(404).json({ success: false, message: 'Address not found' });
          }
          res.status(200).send('Address deleted successfully');
        } catch (error) {
        }
      };