import "./gameEntry.css";
import "../buttons/buttons.css";

function gameEntry({ metadata, modalRef }) {
  // eslint-disable-next-line camelcase
  const { dummy, name, cover, release_dates, id } = metadata || {};

  if (!id || dummy) return (
      <>
          <div className="coverArt isDummy" />
          <div className="infoBox">
              <div className="infoTitle isDummy" />
              <br/>
              <div className="infoOther isDummy" />
          </div>
      </>
  );

  let errored = false;
  let gData = {};

  // eslint-disable-next-line camelcase
  const firstRelease = release_dates?.sort((a, b) => a.date - b.date)[0] || [];
  // eslint-disable-next-line camelcase
  const release94 = release_dates
    ?.sort((a, b) => a.date - b.date)
    ?.find((rel) => new Date(rel.date * 1000).getFullYear() === 1994);

  const setModal = (title, body) => {
    modalRef.setModalData({ title, body });
    modalRef.setModalOpen(true);
  };

  const loadGameData = () => fetch(`/api/games/${id}`)
    .then((res) => res.json())
    .then((resItem) => {
      console.log(resItem);
      if (!resItem.length) errored = true;
      gData = resItem;
    })
    .catch(() => {
      errored = true;
    });

  if (errored) return setModal("Error","Could not fetch list of titles.");

  const parseDate = (date) => (date
    ? new Date(date * 1000).toLocaleString("en", { year: "numeric", month: "long", day: "numeric" })
    : "N/A");

  return (
      <>
          <div className="coverArt" style={{
            backgroundImage: `url("${cover?.url?.replace("t_thumb", "t_cover_big")}")`,
          }}
          />
          <div className="infoBox">
              <span className="infoTitle" > {name} </span>
              <span className="infoPlatformName"> { release94?.platform?.name || "N/A" } </span>
              <br/>
              <span className="infoReleaseDate"> {parseDate(release94?.date)} {
                    release94?.date === firstRelease?.date
                        && <span className="originalRel">( Original Release: {parseDate(firstRelease.date)})</span>
                } </span>
          </div>
          <button onClick={async () => {
            await loadGameData();
            setModal(name, <div>
                <p>{ gData[0].summary || "No summary for this title" }</p>
                <br />
                { gData[0]?.screenshots.length
                && <div className="screenshots">
                    { gData[0]?.screenshots.map((ss) => <img src={ss.url} />) }
                </div>
                }

            </div>);
          }} className="info " > Info </button>

          <button onClick={ async () => {
            await loadGameData();
            setModal(name, <pre>{ JSON.stringify(gData, 0, 2) }</pre>);
          }} className="secondary outline" > Data </button>
      </>

  );
}

export default gameEntry;
