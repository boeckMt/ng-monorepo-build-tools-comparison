# NgWorkspaceTest

This is a test monorepo that builds [angular libraries](https://angular.io/guide/libraries) with different tools like [turbo.build](https://turbo.build/repo/docs/getting-started/existing-monorepo), [Nx](https://nx.dev/recipes/adopting-nx/adding-to-monorepo) and [wireit](https://github.com/google/wireit).

There are the following branches to check the differences:
- [main]() the normal `angular CLI` workspace

and adjustments to build and test apps and libraries
- [test-turbo](https://github.com/boeckMt/ng-monorepo-build-tools-comparison/tree/test-turbo)
- [test-wireit](https://github.com/boeckMt/ng-monorepo-build-tools-comparison/tree/test-wireit)
- [test-nx](https://github.com/boeckMt/ng-monorepo-build-tools-comparison/tree/test-nx)

### Commands to create this repo

- `ng new ng-workspace-test --create-application=false`
- `ng g application test-app1 --project-root=projects/apps/test-app1 --prefix=app`
- `ng g application test-app2 --project-root=projects/apps/test-app2 --prefix=app`
- `ng g library lib1 --project-root=projects/libs/lib1 --prefix=lib`
- `ng g library lib2 --project-root=projects/libs/lib2 --prefix=lib`
- `ng g library lib3 --project-root=projects/libs/lib3 --prefix=lib`

### Adjustments

- make apps depend on libs to test cross-dependencies
- make lib2 and lib3 depend on lib1
- add package.json files to apps
- and declare cross-dependencies for libraries and apps
- set paths in tsconfig.json for development for ng serve and ng test
- set `main` in libs package.json src/public-api so the path mapping from tsconfig.json is working correctly

To get TypeScript import libs in development mode (ng serve or ng test) set paths to the source files in main tsconfig.json.
```json
// tsconfig.json
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      "@libs/*": [
        "projects/libs/*",
      ]
    },
    ...
  },
  ...
}
```

Unfortunately, this cannot be used to build libraries. 
- https://github.com/ng-packagr/ng-packagr/issues/1264
- https://github.com/angular/angular-cli/issues/19831
- https://github.com/angular/angular-cli/issues/11002


- override paths for libs in prod config to build with paths to dist

To build them we have to reference the dist folder and pre built each lib in the correct order!!!
use projects/libs/**/tsconfig.lib.prod.json to override the path's


```json
// tsconfig.lib.prod.json
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      "@libs/*": [
        "dist/*"
      ]
    }
  },
  ...
}
```



### Sync version and dependency versions across workspaces
To share the same version for all library packages npm's [pkg](https://docs.npmjs.com/cli/v9/commands/npm-pkg) or [version](https://docs.npmjs.com/cli/v9/commands/npm-version) command can be used.

To run them for all workspaces and the root package use the `--workspaces --include-workspace-root`
E.g. set a new version in your workspace `npm version <newversion> -m "<message>" --workspaces --include-workspace-root`
If you accidentally already set the version in the root package but not in workspace packages use `npm pkg version=<newversion> --workspaces`


To sync dependency versions the package [syncpack](https://github.com/JamieMason/syncpack) could be helpful.
That way you can make sure e.g. the same version of `rxjs` (declared in root package) is also used in the other packages. Or packages that depend on some of your own libraries use their current version.



### Other Resources

Creating Libraries
- https://angular.io/guide/creating-libraries

---
Enterprise Angular Monorepo Patterns:
- https://docs.google.com/presentation/d/1onEJciG3Yxb5PoOxl9ZyYCcdc-FykPEoDl4utx4k7WU/edit#slide=id.ga667a598fe_0_0

- https://kgotgit.medium.com/monorepo-pattern-setting-up-angular-workspace-for-multiple-applications-in-one-single-repository-4e14bc0d0cc0


Is there a better way to build an Angular monorepo app with libraries:
- https://stackoverflow.com/questions/57170936/is-there-a-better-way-to-build-an-angular-monorepo-app-with-libraries


Add flag for running NPM commands in transitive dependencies:
- https://github.com/npm/rfcs/issues/548




---


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
