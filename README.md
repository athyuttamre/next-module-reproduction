# next-module-reproduction

A minimal reproduction of a module resolution error I found with Next.js which
shows up when your package's directory name ends with `next`.

Reported here: https://github.com/vercel/next.js/issues/34000

# Steps to reproduce

We have four identical packages in this repository: `next`, `foo`, `foo-next`, and `next-foo`.
The actual package name in `package.json` is unrelated and simply `repro`.

To verify the identicality, from a fresh clone of this repo, we run `diff`. The
lack of output indicates the directories are identical in their contents.

```
$ diff -r next foo
$ diff -r next foo-next
$ diff -r next next-foo
$
```

First, we observe the error in action in `next` and `foo-next`:

1. `cd next` or `cd foo-next`
2. `npm run clean` to remove the `.next`, `node_modules`, and `package-lock.json` files.
3. `npm run dev` to install node modules, compile the package using TypeScript, and run the example.
4. Navigate to `http://localhost:3000/api/hello` and observe the error.

```
error - Error: Cannot find module '../../../dist/server/server.js'
Require stack:
- /Users/athyuttamre/Work/github/next-module-reproduction/next/examples/basic/.next/server/pages/api/hello.js
- /Users/athyuttamre/Work/github/next-module-reproduction/next/examples/basic/node_modules/next/dist/server/next-server.js
- /Users/athyuttamre/Work/github/next-module-reproduction/next/examples/basic/node_modules/next/dist/server/next.js
- /Users/athyuttamre/Work/github/next-module-reproduction/next/examples/basic/node_modules/next/dist/server/lib/start-server.js
- /Users/athyuttamre/Work/github/next-module-reproduction/next/examples/basic/node_modules/next/dist/cli/next-dev.js
- /Users/athyuttamre/Work/github/next-module-reproduction/next/examples/basic/node_modules/next/dist/bin/next
```

Next, we perform the same actions in the other packages whose directory name does not end with `next`:

1. `cd foo` or `cd foo-next`
2. `npm run clean` to remove the `.next`, `node_modules`, and `package-lock.json` files.
3. `npm run dev` to install node modules, compile the package using TypeScript, and run the example.
4. Navigate to `http://localhost:3000/api/hello` and observe that there is no error.
   We successfully return the API response, and log `server` in the console.
