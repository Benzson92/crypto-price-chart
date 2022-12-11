import React, { useEffect, useRef, memo } from 'react';
import { createChart, OhlcData } from 'lightweight-charts';

import { priceFormatter } from '../../../utils/priceFormatter';

type Props = {
	data: OhlcData[];
	isLoading: boolean;
};

const CoinPriceChart: React.FunctionComponent<Props> = ({
	data,
	isLoading,
}) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const hasNoData = !isLoading && (!data || data.length < 1);

		const handleResize = () => {
			chart.applyOptions({ width: chartContainerRef.current.clientWidth });
		};

		const chart = createChart(chartContainerRef.current, {
			layout: {
				fontFamily: 'Roboto, sans-serif',
			},
			watermark: {
				visible: hasNoData,
				fontSize: 24,
				horzAlign: 'center',
				vertAlign: 'center',
				color: '#d63a95',
				text: 'No Available Data',
			},
			localization: {
				priceFormatter,
			},
			rightPriceScale: {
				borderColor: '#D6DCDE',
				entireTextOnly: true,
			},
			timeScale: {
				borderColor: '#D6DCDE',
				timeVisible: true,
			},
			width: chartContainerRef.current.clientWidth,
			height: 300,
		});
		chart.timeScale().fitContent();

		const candlestickSeries = chart.addCandlestickSeries({
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderVisible: false,
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350',
		});
		candlestickSeries.setData(data);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chart.remove();
		};
	}, [data, isLoading]);

	return <div ref={chartContainerRef} />;
};

export default memo(CoinPriceChart);
