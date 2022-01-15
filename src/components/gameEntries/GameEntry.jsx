import "./gameEntry.css";

function gameEntry (props){

    const {name, cover, release_dates} = props.metadata;

    const firstRelease = release_dates?.sort( (a,b) => a.date - b.date )[0] || [];
    const company = props.involved_companies?.[0].company?.name || "N/A";
    
    return (
        <>
            <div className="coverArt"  style={{ 
                backgroundImage: `url("${cover?.url?.replace('t_thumb','t_logo_med')}")` 
                }}
            ></div>
            <div className="infoBox">
                <span className="title" > {name} </span>
                <span className="year"> {firstRelease.human} </span>
                <span className="company"> { company } </span>
                <div className="platformInfo">
                    <img className="platformLogo" alt="Platform Logo" src={ firstRelease?.platform?.platform_logo?.url?.replace('t_thumb','t_logo_med')?.replace('.jpg','.png') }></img>
                    <span className="platformName"> { firstRelease?.platform?.name || "N/A" } </span>
                </div>
            </div>
        </>

    );
  

}

export default gameEntry;