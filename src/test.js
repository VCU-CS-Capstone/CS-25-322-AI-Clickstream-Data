async function runReport() {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${process.env.GA_PROPERTY_ID}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'activeUsers' }],
    });

    console.log('Report Result:', response);
}

runReport().catch(console.error);
