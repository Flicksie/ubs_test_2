import "./gameEntry.css";
import "../buttons/buttons.css";

function gameEntry (props){

    const {dummy, name, cover, release_dates} = props.metadata || {};
    
    if (dummy){
        return (
            <>
                <div className="coverArt isDummy"></div>
                <div className="infoBox">
                    <div className="infoTitle isDummy" ></div>
                    <br/>
                    <div className="infoOther isDummy" ></div>
                </div>
            </>
        )
    }
    
    const firstRelease = release_dates?.sort( (a,b) => a.date - b.date )[0] || [];
    const release94 = release_dates
        ?.sort( (a,b) => a.date - b.date )
        ?.find(rel=> new Date(rel.date * 1000).getFullYear() === 1994);


    const parseDate = (date) => date 
        ? new Date(date*1000).toLocaleString( 'en', {year: "numeric", month: "long", day: "numeric"} )
        : "N/A"


    return (
        <>
            <div className="coverArt"  style={{ 
                backgroundImage: `url("${cover?.url?.replace('t_thumb','t_cover_big')}")` 
                }}
            ></div>
            <div className="infoBox">
                <span className="infoTitle" > {name} </span>
                <span className="infoPlatformName"> { release94?.platform?.name || "N/A" } </span>             
                <br/>
                <span className="infoReleaseDate"> {parseDate(release94?.date)} {
                    release94?.date === firstRelease?.date 
                        && <span className="originalRel">( Original Release: {parseDate(firstRelease.date)})</span>
                } </span>
            </div>
            <button className="info "  > Info </button>
            <button className="secondary outline"  > Data </button>
        </>

    );
  

}

export default gameEntry;