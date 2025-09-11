
export default function Strategies(params: any) {
 const strategyData = params.data || params;
    return (<>
    <h1>Strategies</h1>
    <pre>{JSON.stringify(strategyData, null, 2)}</pre>
    </>)
}