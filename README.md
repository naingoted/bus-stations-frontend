This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, rename .env.local.example to .env.local

then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Page list

    page
        index - homepage contains movies components

### Components list

    components 
        Header - for global header
        Monitor - for monitor module
        UI  - for layout and UI components

### Contexts

    contexts

### Testing

    integration testing to make sure pagination logic, hooks and context
    __tests__ - for test files
        components - named according to /components structure
            UI

### Styling

    styles - named according to /components structure.

## @todo 

    http service and context reformat.
    remove unecessary components
    refactor codes
    responsive, menu collapse.