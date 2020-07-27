
.pem (privacy-enhanced electronic mail)
1. -----BEGIN CERTIFICATE-----
2. base64 编码
3. 证书文件


## usage of openssl
1. generate private key
  `openssl genrsa -out my.key 2048`
2. extract public key from private key
  `openssl pkey -in my.key  -pubout -out public.key`

## FAQ
1. 
https://crypto.stackexchange.com/questions/26249/why-are-rsa-ciphertexts-different-for-the-same-plaintext
https://stackoverflow.com/questions/54193730/nodejs-crypto-module-privateencrypt-always-return-same-result

2.
data greater than mod len

3. PEM routines:CRYPTO_internal:bad end line
  5 个 -----
https://stackoverflow.com/questions/45048858/pem-routinespem-read-biobad-end-line