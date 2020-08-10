import '/Users/georgexie/workspace/playground/forge/dist/forge.js'

//knowledge
const __dirname = new URL('.', import.meta.url).pathname;

const forge =(self as any).forge; 
const {rsa, publicKeyFromPem, privateKeyFromPem}  = forge.pki;
const publicPem = Deno.readFileSync(`${__dirname}/public.pem`)
const decoded = new TextDecoder().decode(publicPem);
const publicKey = publicKeyFromPem(decoded);

const privatePem = Deno.readFileSync(`${__dirname}/private.pem`)
const decoded_ = new TextDecoder().decode(privatePem);
const privateKey = privateKeyFromPem(decoded_);

const cipher = publicKey.encrypt('000', 'RSA-OAEP')
console.log('cipher: ', cipher, cipher.length);

const tp = cipher.split('').map((item: string) => item.charCodeAt(0));
console.log('tp: ', tp);

//knowledge
// new utf8
// cant use encoder
// const cipher_ = new TextEncoder().encode(cipher);
// console.log('cipher: ', cipher_, cipher_.length);


// const plain = privateKey.decrypt(cipher_);
// console.log('plain: ', plain);

Deno.writeFileSync('cipher', new Uint8Array(tp));