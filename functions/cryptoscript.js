import crypto from "crypto";

const algorithm = "aes-256-cbc";
const iv = "%^!#Z^e";
const key = "7tFe-oDi,SZlc%5D//8&46um";

function scrypt (num, secret, salt) {
    return new Promise((res, rec) => {
        return crypto.scrypt(secret, salt, num, (err, key) => {
            if (err) return rec(err);

            return res(key);
        });
    });
}

const getIv = (salt) => {
    return scrypt(8, iv, salt).then((response) => response.toString("hex"));
}
const getKey = (salt) => {
    return scrypt(32, key, salt).then((response) => response);
}

const encryptText = async (reportKey, birthDate) => {
    let i, k;
    return getIv(birthDate)
        .then(iv => {
            i = iv;

            return getKey(birthDate)
        }).then(key => {
            k = key;

            const cipher = crypto.createCipheriv(algorithm, k, i);
            const encrypted = cipher.update(reportKey, "utf8", "hex") + cipher.final("hex");

            return encrypted;
        });
}

const decryptText = async (reportKey, birthDate) => {
    let i, k;
    return getIv(birthDate)
        .then((res1) => {
            i = res1;

            return getKey(birthDate)
        })
        .then((ae) => {
            k = ae;

            const decipher = crypto.createDecipheriv(algorithm, k, i);
            const encrypted = decipher.update(reportKey, "hex", "utf8") + decipher.final("utf8");

            return encrypted;
        })
        .catch((err) => {
            console.log("err: ", err);

            throw err;
        });
}

export { encryptText, decryptText };