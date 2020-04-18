# Concourse Lighthouse
A utility for running a Google Lighthouse test against a website in a concours pipeline. (or anywhere with chrome and node)

## Usage

To run
```CLH_URL=https://google.com yarn start```

The available parameters for configuration are:
* `CLH_URL`: The URL to run the test against. **Required.**
* `CLH_FORM_FACTOR`: The form factor to run the test as [`desktop`, `mobile`] defaults to `desktop`. *Optional*