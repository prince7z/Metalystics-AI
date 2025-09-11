
export default function Comparison(params: any) {
    const comparisonData = params.data || params;

    return (
        <div>
            <h1>Project Comparison</h1>
            <pre>{JSON.stringify(comparisonData, null, 2)}</pre>
        </div>
    );
}
