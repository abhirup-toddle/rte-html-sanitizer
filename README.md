# RTE Data Sanitization

## Description

The purpose of this project is to clean up historical RTE data and ensure that only supported tags and attributes are allowed.

The index.js file contains everything is required to run the clean up. This utilizes sanitize-html along with a custom config object. This function will return the cleaned html string. This has to be run on each existing html string in the database.

## Additional Notes

While the project has the following packages,

    "cheerio": "^1.0.0-rc.12",
    "papaparse": "^5.4.1",
    "sanitize-html": "^2.11.0"

- Only sanitize-html is required for the actual processing
- Cheerio was used to programmatically generate a config file (as an experiment)
- Papaparse was used to test the generated data
