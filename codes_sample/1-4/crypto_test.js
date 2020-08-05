const crypto = require('crypto');
const fs = require('fs');
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5M50nuF7Zb/oNfTsN0Wt
r7m//5diRySGY7jOSktIETmOuyY7tTlVC5Gg/Uh1H12aYmdveO1gQhfVcY5fwbDB
NYN9GGhl4ggsU7Q3AzqGOgfOoEAWzQK5WTaXTGyT+VW6dKJTfrFJZFT5WCJXla5M
bqqNb31+mmHhJD5Y5UxrE89lDzBEsDLupCde5HsWXsJBIxJ1121QbjM8r71FUG9r
37a3m17Lh7puCMg28lRYrjuyR8u+HRuqLMou7esSuwL7Bq8bJT33ihazTFCrTRYb
U9+T4d3mH+2AVb3Q76WPyh8JhExtboy+/Ogj+K4SNVHSO8eOmYBywlcqHgXOcupo
mQIDAQAB
-----END PUBLIC KEY-----`

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA5M50nuF7Zb/oNfTsN0Wtr7m//5diRySGY7jOSktIETmOuyY7
tTlVC5Gg/Uh1H12aYmdveO1gQhfVcY5fwbDBNYN9GGhl4ggsU7Q3AzqGOgfOoEAW
zQK5WTaXTGyT+VW6dKJTfrFJZFT5WCJXla5MbqqNb31+mmHhJD5Y5UxrE89lDzBE
sDLupCde5HsWXsJBIxJ1121QbjM8r71FUG9r37a3m17Lh7puCMg28lRYrjuyR8u+
HRuqLMou7esSuwL7Bq8bJT33ihazTFCrTRYbU9+T4d3mH+2AVb3Q76WPyh8JhExt
boy+/Ogj+K4SNVHSO8eOmYBywlcqHgXOcupomQIDAQABAoIBAGXsehLUiu2WgVCX
3Cn7BhYDfr3Sp9rdMGh3yJ1bz6ysoSJJM8vU0EepBbgOcO4Z+k3fmc6an4iRqWk+
bPWRUWAPRMh8qPX5ghV/cAomJejv1WGZaw7EKeDN6rQGohwtzjNqpBsJypHBMJnM
Iovw6udZXkvN8XnAJFTK2Tq7we8+Wii3WeKMIPaU6r9G5aXzA+g2YwKdTli1iYAQ
p7+B0ztf1Hm3KoSvxFTitAV7YW4SO8mS+9RQIFbwjrRblBjrByF1dJW3mlqXpPNt
Om/kpBc+9V6PFMT/uS3xJnT/ocZmFrb5utlMItUFuZ2imGEcNOO8nsVxCxmqvXxf
0EGkXCECgYEA+JfO9HRYmguAKZOZH8iYjgW3DW2UhcZtzHMqIveGm2dVGD55rJxp
S9rT6nk4MjFeLZDyOamN+d46EMf9gWl2XTvFvfw/0r8ZMfeSFoTd1ix8GEeBBdBW
vArX9WcYxdMhF4ouUgPGd1vrgWcxHfsh2g12CWQUuxYbwDD8lZFoFl0CgYEA65+4
swIDTZwpakdPZCxVbDvD3sAGaquqaSeiGHjZf0/lCPHY3BnuFp3IugxGeo0tr2cv
na1OVhU00Z9biyQQU0CjVbs4wS0dUqdGqJcNP/svHAIl2SwbBKRSC4h/HsKSkZji
RP2Fyr/LxNxEhF+bpuA+hbv5CGAwekLszir4P20CgYEA6dVyWENwbEZRIcqyiFEa
Hs2FaF4hDMyfz2asxgNrXJaQVqO9s/3UlgOavr2TfLMvUVE8Z7zzzYuZtttHvAlF
y2FEGfdC2avjuTqU8hW8zY8+k1//H0bfrzXL+gwmIz77q7bQ51ihwPh3yFsWuorV
RtTOqPq4/VpIdDof/VivPgkCgYAr3p8a5SMMTij/2qsTcZWuAyqizInlTnT6AyER
AV8tbwirs6u2vzUvDM2UpjhxFNwOrl2VM/FD4crlxI/cxigr9/rxOVyFywqMmwxy
0zzqTrAkvNmjJ60YHigQcaeJaJy1cwud4L4KU89ypbg0FUD7vwClEax6PL6J5PAG
KsXxuQKBgH8XEWI/3+Y6iavnt1aSuQDq2h4Yb1/na+IUw3ernWrZFOkIpcNr8Qsn
R/izMQVPH7iDmoBaQH+YVQCGgvQ5qwm3qJ+803B5x2Jhhpp0ZviO5FqksBmHCQxn
oH8q9GoobUD0CLJPy6sF9Dc4UhAbP+eBcMCpM7N6+5dV2gmapSC7
-----END RSA PRIVATE KEY-----`

// const result_ = crypto.publicEncrypt(publicKey, Buffer.from('88888888888888888888'))
// console.log('cipher', result_)

const keyObject = crypto.createPrivateKey(privateKey);
// keyObject.padding = crypto.constants.RSA_PKCS1_PADDING;

const result = fs.readFileSync('./cipher');
console.log('result: ', result);

const plain = crypto.privateDecrypt(keyObject, result)
console.log('plain: ', plain);

