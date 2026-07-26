const Premium = () => {
    return (
        <div className="m-10">
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className="font-bold text-3xl">Silver Membership</h1>
                    <ul>
                        <li>- Chat with other people</li>
                        <li>- 100 connections per request</li>
                        <li>- Blue Tick</li>
                        <li>- 3 months</li>
                    </ul>
                    <button className="btn btn-secondary">Buy Silver Membership</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className="font-bold text-3xl">Gold Membership</h1>
                    <ul>
                        <li>- Chat with other people</li>
                        <li>- Infinite connections per request</li>
                        <li>- Blue Tick</li>
                        <li>- 6 months</li>
                    </ul>
                    <button className="btn btn-primary">Buy Gold Membership</button>
                </div>
            </div>
        </div>
    )
};

export default Premium;