
.pem (privacy-enhanced electronic mail)
1. -----BEGIN CERTIFICATE-----
2. base64 编码
3. 证书文件


## usage of openssl
1. generate private key
  `openssl genrsa -out my.key 2048`
2. extract public key from private key
  `openssl pkey -in my.key  -pubout -out public.key`
3. openssl rsautl -encrypt -pubin -inkey public.pem -in plain -out cipher3 -oaep

## FAQ
1. i thought in RSA, use a public key to encrypt, the result should be same, but every time it return different result in fact. see [this](https://crypto.stackexchange.com/questions/26249/why-are-rsa-ciphertexts-different-for-the-same-plaintext) and [this](https://stackoverflow.com/questions/54193730/nodejs-crypto-module-privateencrypt-always-return-same-result)


2. using [jsencrypt](https://github.com/travist/jsencrypt) to encrypt then using node `crypto` to decrypt, got this error 

    data greater than mod len

it because of jsencrypt return base 64 coded text not buffer, decode it to buffer, this error gone

3. PEM routines:CRYPTO_internal:bad end line
  should be 5 `-----`, copy paste prone to miss some hyphen see [this](https://stackoverflow.com/questions/45048858/pem-routinespem-read-biobad-end-line)
