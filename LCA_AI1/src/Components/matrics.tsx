
export default function Matrics(params: any) {
    const  data = params;

    return (
        <div>
            <h2>Matrics</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
