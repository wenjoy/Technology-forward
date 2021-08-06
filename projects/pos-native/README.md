## what is this project
an POS app developed by react native

### tech stack

react@16.7.0  
react-router@4.3.1  
### problem encountered in using react native
1. Android platform need to handle `back` behavior
2. keyboard overlay the content
use `KeyboardAvoidingView`
### Highlights
1. sse
2. offline
3. signature
```
"react-native-signature-capture": "^0.4.9",
 "rn-fetch-blob": "0.10.15",
    <SignatureCapture
          ref={signatureCaptureRef}
          style={styles.signaturePanel}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          showBorder={false}
          onDragEvent={onDragEvent}
          onSaveEvent={onSaveEvent}
          viewMode="landscape"
        />
```
then upload signature file to file server
4. card reader
5. payment related function
PCI?
6. sync offline order
7. use react-native-elements
```
import { Overlay, Button } from 'react-native-elements';
```


### what should have been improved
didn't organize related function in one finder