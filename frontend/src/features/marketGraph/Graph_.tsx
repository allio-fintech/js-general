import { FC } from 'react';
import { Chart, Line, Tooltip, Legend } from 'bizcharts';
import { css } from '@emotion/react';
import rem from 'utils/styles/rem';

interface GraphProps {
  data: any[];
  show: number[];
  dataName: string[];
}

const graphStyles = css`
  margin: ${rem(20)} auto;
  width: 100%;
  max-width: ${rem(800)};
  height: ${rem(600)};
`;

const colors = [
  'red',
  'aqua',
  'blue',
  'orange',
  'green',
  'grey',
  'black',
  'navy',
];

const Graph: FC<GraphProps> = ({ data, dataName, show }) => (
  <div css={graphStyles}>
    <Chart data={data} autoFit interactions={['element-active']}>
      <Legend name="try" position="bottom" />
      <Tooltip shared showCrosshairs />
      {show.map((dataSwitch) => (
        <Line
          key={dataName[dataSwitch]}
          shape="line"
          position={`date*${dataSwitch}-scaled`}
          tooltip={{
            fields: [`${dataSwitch}-actual`],
            callback: (actualPrice) => {
              return {
                name: dataName[dataSwitch],
                value: actualPrice.toFixed(2),
              };
            },
          }}
          color={colors[dataSwitch]}
          name={dataName[dataSwitch]}
        />
      ))}
    </Chart>
  </div>
);

export default Graph;
