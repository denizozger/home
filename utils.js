'use strict'

const
	_	= require('lodash');

exports.convertRecordsForGoogleCharts = records => {
	return {
		temperature : _.map(records, record => [
			exports.getTimeToDisplayOnChart(record.created_at), parseFloat(record.temperature)
		]),
		pressure : _.map(records, record => [
			exports.getTimeToDisplayOnChart(record.created_at), parseFloat(record.pressure)
		]),
		humidity : _.map(records, record => [
			exports.getTimeToDisplayOnChart(record.created_at), parseFloat(record.humidity)
		])
	};
}

exports.getTimeToDisplayOnChart = epoch => {
	let date = new Date(parseInt(epoch) * 1000)
	return date.getHours() + ':' + date.getMinutes()
}