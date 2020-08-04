# Cipher

.pem (privacy-enhanced electronic mail)
1. -----BEGIN CERTIFICATE-----
2. base64 编码
3. 证书文件

## Usage of openssl
1. generate private key
  `openssl genrsa -out private.pem 2048` default is pkcs1
  generate pkcs8 respected
  `openssl genpkey -out private.pem -algorithm RSA -pkeyopt rsa_keygen_bits:2048`
2. extract public key from private key
  `openssl pkey -in private.pem  -pubout -out public.pem` default is pkcs8
  extract pkcs1 respected:
  `openssl rsa -in private.pem -pubout -outform PEM -RSAPublicKey_out -out public.ke`
3. use openssl to encrypt
`openssl rsautl -encrypt -pubin -inkey public.pem -in plain -out cipher3 -oaep`
4. use openssl to decrypt
`openssl rsautl -decrypt -in cipher -inkey private.pem -out result`

## refs
1. [An online tool but only support pkcs#8 pem, pkcs#1 not work!!!](https://www.devglan.com/online-tools/rsa-encryption-decryption)

## FAQ
1. i thought in RSA, use a public key to encrypt, the result should be same, but every time it return different result in fact. see [this](https://crypto.stackexchange.com/questions/26249/why-are-rsa-ciphertexts-different-for-the-same-plaintext) and [this](https://stackoverflow.com/questions/54193730/nodejs-crypto-module-privateencrypt-always-return-same-result)


2. using [jsencrypt](https://github.com/travist/jsencrypt) to encrypt then using node `crypto` to decrypt, got this error 

    data greater than mod len

it because of jsencrypt return base 64 coded text not buffer, decode it to buffer, this error gone

3. PEM routines:CRYPTO_internal:bad end line
  shoul d be 5 `-----`, copy paste prone to miss some hyphen see [this](https://stackoverflow.com/questions/45048858/pem-routinespem-read-biobad-end-line)

4.KDF (Key Derived Function)
Including `PBKDF2` `bcrypt` `scrypt` 

5. PBE(Password based Encryption) algorithm
用来生成密钥
口令 vs 密钥，口令往往很简单，就是我们平常说的密码，密钥是通过算法把口令弄得很复杂，用到的就是 KDF

6. Public Key Cryptography (Asymmetrical Cryptography)

- Is not a single algorithm, it's group of algorithms
- Include `RSA`
- PKCS(Public Key Cryptography Standards)
- PKCS#1 describe key pair and encrypt and decrypt
- PKCS#1 has two padding methods:
  - RSAES-PKCS1-V15 (older version)
  - RSAES-OAEP (newer version)

7. JWT JSON Web Token
  - `Header.Payload.Signature` signature 是对header 和 payload 的签名
  - Base64URL 
  - 一般放在 header 里 -> Authorization: Bearer <token>
  see [this](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

8. MAC (Message Authentication Code)

    完整性校验 - hash  
    消息验证，防篡改 - mac 
  - CBC-MAC
  - HMAC

  `openssl dgst -sha1-hmac "mykey" plain.txt` 计算文件的 hmac

9. ParseError { reason: "Incomplete data or
invalid ASN1" }'

Also, header "-----BEGIN RSA PRIVATE KEY-----" means it pkcs1, pkcs8 should have "-----BEGIN PRIVATE KEY-----" header.

ASN.1（Abstract Syntax Notation One) 是一种数据描述语言  
PEM(Privacy Enhanced Mail)： 因为 DER 编码是二进制数据，早期的 Email 不能发送附件，也不方便直接传输二进制数据([原因])，因此密钥文件通常会在 DER 编码基础上进行 Base64 编码，这就是经常看到的密钥文件格式 PEM。PEM 最早是用来增强邮件安全性的，不过没有被广泛接受，最后却是在密码学中得到了发扬光大，如 openssl 和 ssh-keygen 工具生成的公私钥文件默认都采用 PEM 格式。需要注意的是，PEM 本身不是 ASN.1 的编码规则，它只是 Base64-encoded DER;  
see [this](https://www.jianshu.com/p/ce7ab5f3f33a)

10. 使用密钥时注意事项:  
    1.  pem is base64 encoded, need to decode it
    2. not all content in pem is valid base64 encoded, need to remove `-----BEGIN CERTIFICATE` and `\n` manually

11. rust [rsa module](https://docs.rs/rsa/0.3.0/rsa/struct.RSAPublicKey.html) can't recognize public key I extract from private by openssl ` openssl pkey -in private.pem -pubout -out public.key`

    thread '<unnamed>' panicked at 'failed to parse public key: ParseError { reason: "expected asn1 integer: modulus (n)" }', src/rsa_bridge.rs:36:20
  
  see [this](https://tls.mbed.org/kb/cryptography/asn1-key-structures-in-der-and-pem)

`-----BEGIN PUBLIC KEY-----` this is pkcs8 marker
`-----BEGIN RSA PUBLIC KEY-----` this is pkcs1 marker

I got this error because I use `pkcs1` method to parse `pkcs8` key

[Explained pem in details](https://stackoverflow.com/questions/18039401/how-can-i-transform-between-the-two-styles-of-public-key-format-one-begin-rsa)  
DER:Distinguished Encoding Rules  
[DER vs PEM](https://medium.com/@oryxx/rsa%E7%A7%98%E9%92%A5%E4%BB%8B%E7%BB%8D%E5%8F%8Aopenssl%E7%94%9F%E6%88%90%E5%91%BD%E4%BB%A4-d3fcc689513f)
[der and pem](https://tls.mbed.org/kb/cryptography/asn1-key-structures-in-der-and-pem)

