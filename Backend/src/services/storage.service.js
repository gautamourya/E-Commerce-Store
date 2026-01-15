// const mongoose = require("mongoose");
// var ImageKit = require("imagekit");
// var imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });
// function uploadfile(file) {
//   return new Promise((resolve, reject) => {
//     if (!file || !file.buffer) {
//       return reject(new Error("Invalid file data"));
//     }

//     imagekit.upload(
//       {
//         file: file.buffer,
//         fileName: new mongoose.Types.ObjectId().toString(),
//         folder: "productimage+",
//       },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// }
// module.exports = uploadfile



const mongoose = require("mongoose");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadfile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("Invalid file data"));
    }

    imagekit.upload(
      {
        file: file.buffer, // multer buffer
        fileName: new mongoose.Types.ObjectId().toString(),
        folder: "product_images", // ✅ FIXED
      },
      (error, result) => {
        if (error) {
          console.error("ImageKit Error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

module.exports = uploadfile;
