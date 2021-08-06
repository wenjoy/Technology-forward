## what is this project
an POS web app

### tech stack
react@16.7.0  

### Highlights
packages structures
packages
├── citizen-ui
│   └── node_modules
├── components
│   ├── README.md
│   ├── node_modules
│   ├── package.json
│   └── src
├── front-desk
│   ├── README.md
│   ├── build
│   ├── node_modules
│   ├── package.json
│   ├── public
│   └── src
├── hooks
│   ├── README.md
│   ├── node_modules
│   ├── package.json
│   └── src
└── utils
    ├── README.md
    ├── node_modules
    ├── package.json
    └── src


file structures: 
.
├── App.test.tsx
├── App.tsx
├── Fonts.tsx
├── __snapshots__
│   └── App.test.tsx.snap
├── api
│   ├── cartServiceInstance.test.ts
│   ├── cartServiceInstance.ts
│   ├── index.ts
│   ├── instance.test.ts
│   └── instance.ts
├── config
│   ├── config.ts
│   ├── features.ts
│   └── index.ts
├── consts
│   ├── feeTypes.ts
│   └── time.ts
├── i18n
│   ├── I18nProvider.tsx
│   └── locales
├── index.test.tsx
├── index.tsx
├── layout
│   └── index.ts
├── logo.svg
├── modules
│   ├── admin-settings
│   ├── admin-settings.GL-code
│   ├── admin-settings.locations
│   ├── admin-settings.merchant-account
│   ├── admin-settings.org-information
│   ├── admin-settings.payment-setting
│   ├── admin-settings.pinpads
│   ├── admin-settings.terminals
│   ├── admin-settings.user-administration
│   ├── auth
│   ├── check-out
│   ├── front-desk
│   ├── gl-report
│   ├── home
│   ├── image-uploader
│   ├── order-history
│   ├── payment-configuration
│   ├── payment-summary-report
│   ├── remittance-report
│   ├── reports
│   └── select-agency
├── reducers.ts
├── routes
│   ├── config.tsx
│   ├── index.ts
│   ├── routeComponent.tsx
│   ├── routePrompt.test.ts
│   └── routePrompt.ts
├── services
│   ├── momentDateTransform.test.ts
│   ├── momentDateTransform.ts
│   └── timeFormat.ts
├── store
│   ├── configureStore.dev.ts
│   ├── configureStore.prod.ts
│   ├── configureStore.ts
│   ├── history.test.ts
│   ├── history.ts
│   └── persistConfig.ts
└── types
    ├── action.ts
    ├── agency.ts
    ├── agencyDetail.ts
    ├── base.ts
    ├── billPrompt.ts
    ├── index.ts
    ├── location.ts
    ├── merchantAccount.ts
    ├── orderHistory.ts
    ├── paymentItem.ts
    ├── quoteDetail.ts
    └── userAdministrator.ts

modules structures:
modules/
├── admin-settings.GL-code
│   ├── api.test.ts
│   ├── api.ts
│   ├── saga.test.ts
│   ├── saga.ts
│   ├── scenes
│   ├── slice.test.ts
│   └── slice.ts
├── admin-settings.locations
│   ├── api.test.ts
│   ├── api.ts
│   ├── components
│   ├── editApi.test.ts
│   ├── editApi.ts
│   ├── editSaga.test.ts
│   ├── editSaga.ts
│   ├── editSlice.test.ts
│   ├── editSlice.ts
│   ├── newApi.test.ts
│   ├── newApi.ts
│   ├── newSaga.test.ts
│   ├── newSaga.ts
│   ├── newSlice.test.ts
│   ├── newSlice.ts
│   ├── saga.test.ts
│   ├── saga.ts
│   ├── scenes
│   ├── slice.test.ts
│   └── slice.ts
├── front-desk
│   ├── api.test.ts
│   ├── api.ts
│   ├── bill-prompts
│   ├── components
│   ├── saga.test.ts
│   ├── saga.ts
│   ├── scenes
│   ├── select-location
│   ├── selector.ts
│   ├── slice.test.ts
│   └── slice.ts
├── home
│   ├── api.test.ts
│   ├── api.ts
│   ├── components
│   ├── saga.test.ts
│   ├── saga.ts
│   ├── scenes
│   ├── selector.ts
│   ├── slice.test.ts
│   └── slice.ts
├── image-uploader
│   ├── ImageUploader.test.tsx
│   ├── ImageUploader.tsx
│   ├── __snapshots__
│   ├── api.test.ts
│   ├── api.ts
│   ├── index.ts
│   ├── saga.test.ts
│   ├── saga.ts
│   ├── slice.test.ts
│   └── slice.ts
├── order-history
│   ├── api.test.ts
│   ├── api.ts
│   ├── components
│   ├── saga.test.ts
│   ├── saga.ts
│   ├── scenes
│   ├── slice.test.ts
│   └── slice.ts
├── payment-configuration
│   ├── api.test.ts
│   ├── api.ts
│   ├── components
│   ├── saga.test.ts
│   ├── saga.ts
│   ├── scenes
│   ├── slice.test.ts
│   └── slice.ts
├── payment-summary-report
│   ├── components
│   └── scenes
├── remittance-report
│   ├── api.test.ts
│   ├── api.ts
│   └── scenes
├── reports
│   ├── api.ts
│   ├── scenes
│   ├── slice.test.ts
│   └── slice.ts
└── select-agency
    ├── api.test.ts
    ├── api.ts
    ├── components
    ├── saga.test.ts
    ├── saga.ts
    ├── scenes
    ├── slice.test.ts
    └── slice.ts



### what should have been improved
didn't organize related function in one finder