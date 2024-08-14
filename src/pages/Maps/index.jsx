const areas = [
  {
    id: 1,
    title: 'Khu vực sân vườn',
  },
  {
    id: 2,
    title: 'Khu vực quầy bar',
  },
  {
    id: 3,
    title: 'Khu vực trong sảnh',
  },
  {
    id: 4,
    title: 'Khu vực cạnh biển',
  },
];
function Maps() {
  return (
    <>
      <div className='header-content'>
        <section id='container-area'>
          {areas.map((value) => {
            return (
              <div key={value.id}>
                <span>{value.title}</span>
              </div>
            );
          })}
        </section>

        <section id='container-status'>
          <div className='note-status'>
            <div className='ellipse'></div>
            <span>Đang được sử dụng</span>
          </div>
          <div className='note-status'>
            <div className='ellipse'></div>
            <span>Chưa được sử dụng</span>
          </div>
        </section>
      </div>
    </>
  );
}

export default Maps;
