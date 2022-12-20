# ci-dotenv

Export environment variables from a file.

## Inputs


## Usage

You can now consume the action by referencing the v1 branch

If you have a file `.env` in your project directory.

```
export APP_NAME="example-api"
export APP_VERSION="1.0.1"
```

You can configure the action:

```yaml
id: dotenv
uses: phogolabs/ci-dotenv@v1
with: { path: ".env" }
```

Then you will have the following output variables:

```
${{ dotenv.outputs.variables.app_name }}
${{ dotenv.outputs.variables.app_version }}
```

