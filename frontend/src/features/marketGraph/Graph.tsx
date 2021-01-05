import { FC } from 'react';
import { Chart, Line, Tooltip, Legend } from 'bizcharts';
import { css } from '@emotion/react';
import rem from 'utils/styles/rem';

interface GraphProps {
  data: any[];
  colors: Record<string, string>;
}

const graphStyles = css`
  margin: ${rem(20)} auto;
  width: 100%;
  max-width: ${rem(800)};
  height: ${rem(600)};
`;

const Graph: FC<GraphProps> = ({ data, colors }) => (
  <div css={graphStyles}>
    <Chart data={data} autoFit interactions={['element-active']}>
      <Legend name="assetType" position="bottom" />
      <Tooltip shared showCrosshairs />
      <Line
        shape="line"
        position="date*price"
        tooltip={{
          fields: ['assetType', 'price'],
          callback: (assetType, price) => {
            return {
              name: assetType,
              value: price.toFixed(2),
            };
          },
        }}
        color={['assetType', (assetType) => colors[assetType]]}
      />
    </Chart>
  </div>
);

export default Graph;
