import csvStringify, { Options } from 'csv-stringify';

const generateCsvUrl = ({
  data,
  columns,
}: {
  data: any[];
  columns: Options['columns'];
}) =>
  new Promise<string>((resolve, reject) => {
    let csvData = '';
    const csvStringifier = csvStringify({
      header: true,
      columns,
    });
    csvStringifier.on('readable', () => {
      let row;
      while ((row = csvStringifier.read())) {
        csvData += row;
      }
    });
    csvStringifier.on('error', (err) => {
      reject(err);
    });
    csvStringifier.on('finish', () => {
      resolve(
        URL.createObjectURL(
          new Blob([csvData], {
            type: 'text/csv;encoding:utf-8',
          })
        )
      );
    });
    data.forEach((datum) => csvStringifier.write(datum));
    csvStringifier.end();
  });

export default generateCsvUrl;
