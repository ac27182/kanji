# Notes

## data sources

all data for the kanji has been sourced from the open source [`kanji database`](https://www.kanjidatabase.com/)

with the below query

```sql
select
  `Kanji`                as kanji,
  `Grade`                as grade,
  `Kanji Classification` as classification,
  `JLPT-test`            as jlpt,
  `Strokes`              as strokes,
  `Radical Freq.`        as radical_frequency
from 
  `KanjiTable`
order by
  grade,
  kanji
```

for simplicity the data is postprocessed into json for easy interoperability

- https://www.convertcsv.com/csv-to-json.htm