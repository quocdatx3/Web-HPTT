anychart.onDocumentReady(function () {
	// add data
	var data = anychart.data.set([
		['Tiêu chuẩn', 34],
		['Cao cấp', 21],
		['Thông thường', 15],
		['Phim lẻ', 11]
	]);

	// create a pie chart with the data
	var chart = anychart.pie(data);

	// set the chart radius making a donut chart
	chart.innerRadius('80%')

	// create a color palette
	var palette = anychart.palettes.distinctColors();

	// set the colors according to the brands
	palette.items([
		{ color: '#1dd05d' },
		{ color: '#000000' },
		{ color: '#00a3da' },
		{ color: '#156ef2' },
		{ color: '#f60000' },
		{ color: '#96a6a6' }
	]);

	// apply the donut chart color palette
	chart.palette(palette);

	// set the position of labels
	chart.labels().format('{%x} — {%y}%').fontSize(16);

	// disable the legend
	chart.legend(true);

	// format the donut chart tooltip
	chart.tooltip().format('Market share: {%PercentValue}%');

	// create a standalone label
	var label = anychart.standalones.label();

	// configure the label settings
	label
		.useHtml(true)
		.text(
			'<span style = "color: #313136; font-size:20px;">  <br/>  </span>' +
			'<br/><br/></br><span style="color:#444857; font-size: 14px;"><i> </i></span>'
		)
		.position('center')
		.anchor('center')
		.hAlign('center')
		.vAlign('middle');

	// set the label as the center content
	chart.center().content(label);

	// set container id for the chart
	chart.container('chart-place');

	// initiate chart drawing
	chart.draw();
});

