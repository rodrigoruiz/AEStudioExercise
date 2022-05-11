
function LanguagesTable({ languages }) {
    if (Object.keys(languages).length === 0) {
        return <div />;
    }
    
    return <div>
        <p><b>Programming languages:</b></p>
        
        <table className="table table-bordered" style={{ width: "390px" }}>
            <tbody>
                {Object.entries(languages).sort().map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}

export default LanguagesTable;
