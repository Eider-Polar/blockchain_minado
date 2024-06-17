import pkg from "elliptic";
import { v1 as uuidV1 } from "uuid";
import SHA256 from "crypto-js/sha256.js";

const { ec: EC } = pkg;
const ec = new EC("secp256k1");

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidV1();
  }
  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
  }
}

export default ChainUtil;
