# Eslint

1. Parsing error, unexpected token.

    declare global {
      interface Window {myOwnName: string;}
    }

using disable comment to mute it

    /* eslint-disable */

    alert('foo');

    /* eslint-enable */

2. eslint not lint `ts` in vs code

```json
{
  "eslint.validate": ["typescript", "typescriptreact"]
}
```