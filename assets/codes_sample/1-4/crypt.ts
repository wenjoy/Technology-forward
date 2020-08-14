// originally I use forge, there are some interesting issue about encode 
import '../lib/forge.js'
const forge = (self as any).forge;
const { publicKeyFromPem } = forge.pki;
function encryptWithPublicKey(key: string, data: Uint8Array):Uint8Array {
  const publicKey = publicKeyFromPem(key);
  // 1. 
  //forge only accept string to encrypt, this is to transform Uint8Array to string.
  // don't use data.toString
  // must use Array.prototype.map, because Uint8Array's `map` method will force convert element to number,
  const result = Array.prototype.map.call(data, i => String.fromCharCode(i)).join('');
  const cipher = publicKey.encrypt(result, 'RSA-OAEP')
  //2.
  // the cipher is binary encoded simply as utf8, so need to convert to binary
  const encryptedData: Uint8Array = cipher.split('').map((item: string) => item.charCodeAt(0));
  return encryptedData
}

export { encryptWithPublicKey };