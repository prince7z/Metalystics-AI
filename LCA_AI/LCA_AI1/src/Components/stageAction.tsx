export default function StageActions(params: any) {
    const stageData = params.data || params;

    return (
        <div>
            <h1>Stage Actions</h1>
            <pre>{JSON.stringify(stageData, null, 2)}</pre>
        </div>
    );
}