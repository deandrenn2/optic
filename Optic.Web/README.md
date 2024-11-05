# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

```
src/
│
├── slices/
│   ├── FeatureOne/
│   │   ├── components/
│   │   │   ├── FeatureOneComponent.jsx
│   │   │   └── FeatureOneList.jsx
│   │   ├── hooks/
│   │   │   └── useFeatureOne.js
│   │   ├── services/
│   │   │   └── featureOneService.js
│   │   ├── store/
│   │   │   ├── featureOneSlice.js   # Redux slice or similar state logic
│   │   │   └── featureOneSelectors.js
│   │   ├── FeatureOnePage.jsx
│   │   └── index.js                 # Re-exports for ease of imports
│   │
│   ├── FeatureTwo/
│   │   ├── components/
│   │   │   ├── FeatureTwoComponent.jsx
│   │   │   └── FeatureTwoList.jsx
│   │   ├── hooks/
│   │   │   └── useFeatureTwo.js
│   │   ├── services/
│   │   │   └── featureTwoService.js
│   │   ├── store/
│   │   │   ├── featureTwoSlice.js
│   │   │   └── featureTwoSelectors.js
│   │   ├── FeatureTwoPage.jsx
│   │   └── index.js
│
├── shared/
│   ├── components/                   # Global reusable components
│   ├── hooks/                        # Global reusable hooks
│   ├── services/                     # Global services
│   ├── utils/                        # Utility functions
│   └── constants/                    # Constants shared across slices
│
├── Layot/                          # Layout component
│   ├── components/                   # Global reusable components
├── App.jsx                           # Main app component
├── main.jsx                          # Entry point for Vite.js
└── routes.jsx                        # Route definitions, importing from each slice

```
