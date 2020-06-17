
`new Client` create an instance
`connect()` -> `createConnection()` -> `new Connection()`
create `Connection` instance
invoke `connect()` -> `_connect()` -> `Deno.connect()` -> `nextPacket()` -> `parseHandshakePacket()` -> `buildAuth()`
`buildAuth()`
if password true, call `auth()`
handle password base on `authPluginName`

```mermaid
sequenceDiagram
    participant client
    participant connection
    participant auth
    client->>connection: new Connection
    connection->>auth: buildAuth
    auth ->> auth: auth
```

## mysql protocol
### for 5.7 and below

plugin name: `mysql_native_passowrd`

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    C ->> S: tcp handshake
    S -->> C: greeting send: version, salt, plugin name
    C ->> S: encrypt password with salt
    S -->> C: return authentication result
```

plugin name: `caching_sha2_password`