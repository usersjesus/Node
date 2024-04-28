/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import  writeFile from 'node:fs';

inquirer
  .prompt([
    {
        message: "Type in your URL",
        name: "URL"

    },
  ])
  .then((answers) => {
    let url = answers.URL;
    let qrpng = qr.image(url);
    qrpng.pipe(fs.createWriteStream('qr-img.png'));

    fs.writeFile("URL.txt", url, function(err) {
        if (err) throw err;
        console.log("file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log("Something went wrong");
    }
  });

