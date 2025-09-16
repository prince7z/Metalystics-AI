
export default function Gauge(params: any) {
 const gaugeData = params.data || params;
    return (<>
    <h1>Gauge</h1>
    <pre>{JSON.stringify(gaugeData, null, 2)}</pre>
    </>)
}