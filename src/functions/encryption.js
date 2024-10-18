import CryptoJS from "crypto-js";

const key = process.env.REACT_APP_SECRET_KEY;
export const HandleEncryptUser = (data) => {
  const textToEncrypt = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(textToEncrypt, key).toString();

  return encryptedData;
};

export const GetEncryptUser = (data) => {
  try {
    const user = localStorage.getItem("user");

    if (!user) {
      console.warn("No user data found in localStorage.");
      return null; // or you can return a default value or throw an error
    }

    const bytes = CryptoJS.AES.decrypt(user, key);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedText) {
      console.warn("Failed to decrypt user data.");
      return null; // or you can return a default value or throw an error
    }

    const decryptedData = JSON.parse(decryptedText);

    return decryptedData;
  } catch (error) {
    console.error("An error occurred while decrypting the user data:", error);
    return null; // or you can handle the error in a different way, such as showing a user-friendly message
  }
};
