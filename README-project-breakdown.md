# Step 1

## Parse respondents' data into usable format

-   read data from file
-   split data per line
-   split line per ',' to obtain data by category
-   save data in object in the format of, 1 entry with multiple key + value pairs

# Step 2

## Match respondents parsed data to project requirements

-   match industries' (there are 'x' industries listed in the project requirements --> keep count of number of industries a respondent matches with the requirements, use # of matches as matching score factor)
-   match job title
-   calculate distance of respondents to different cities in requirements (include distance as a matching score factor)
-   filter out any respondent whose distance to cities is larger than 100km

# Step 3

## Output results ordered by matching score

-   develop matching score algorithm (3 factors - of same priority?)
-   order results
-   output

# Step 4

## Write tests

-   calculate distance function

    -   test for valid coordinates input
    -   checks distance calculation
    -   check degrees to radian conversion

-   return correct parsed data from csv file test

    -   test input file is .csv format
    -   test number of lines in input file against number of entries in result obj
    -   test parsed data quality

-   matching function

    -   test edge cases
    -   cover all errors

-   matchScore function

    -   test score calculation

-   sortingAlgorithm function
    -   test input values are correctly sorted
    -   test edge cases
