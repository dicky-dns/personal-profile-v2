

export default function Contribution() {
    return (
        <div className="container">
            <div className="contribution-heading">
                <img src="/images/contribution.png" alt="Contribution Heading" />    
            </div>
            <div className="row contribution-section">
                <div className="contribution-loading">
                    <img src="/images/loading.gif" alt="Loading" /><br/>
                    <span>fetching contribution data ...</span>
                </div>
            </div>
        </div>
    )
}
