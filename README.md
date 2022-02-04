# next-module-reproduction

A minimal reproduction of a module resolution error I found with Next.js which
shows up when your package's directory is itself named `next`.

# Steps to reproduce

We have to identical packages in this repository, one in a directory named `foo`
and another in a directory named `next`. The actual package name in the
`package.json` file is separate, and simply named `repro`.

To verify the identicality, from a fresh clone of this repo, we run `diff`. The
lack of output indicates the two directories are identical in their contents.

```
$ diff -r foo next
$
```

First, we observe the error in action:

1. `cd next`
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

Next, we perform the same actions in the identical package, with the directory name `foo`:

1. `cd foo`
2. `npm run clean` to remove the `.next`, `node_modules`, and `package-lock.json` files.
3. `npm run dev` to install node modules, compile the package using TypeScript, and run the example.
4. Navigate to `http://localhost:3000/api/hello` and observe that there is no error.
   We successfully return the API response, and log `server` in the console.

# Hypothesis

I think the Next.js compiler is probably getting confused because the parent
directory is itself named `next`.

I ran into this as I was building multiple framework SDKs for my project, and my
naming scheme for each package directory was to name it after the framework
(e.g. `js`, `next`, `express`, etc.).
