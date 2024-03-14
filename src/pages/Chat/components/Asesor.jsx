export const AsesorAsig = ({asesorname}) => {
    return (
        <div style={{ display: 'flex', width: '100%', borderRadius: '1rem', flexDirection: 'row', border: '1px solid rgb(0, 175, 156)', padding: '0.5rem', margin:'0.5rem' }}>
            <div style={{ width: '50px', height: '50px' }}>
                <img src="https://i.imgur.com/txOeep0.png" style={{ aspectRatio: '6/9', height: '100%', width: '100%', borderRadius: '20px' }} />
            </div>
            <div >
                <h4 className="profile__heading"> Asesor </h4>
                <h3 className="profile__heading" style={{ color: 'rgb(0 85 77)', fontWeight: '900' }}> {asesorname}</h3>
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <button style={{ border: 'none', backgroundColor: '#386d9dd4', color: 'white', padding: '5px', borderRadius: '0.5rem' }}>
                    ASIGNAR
                </button>
            </div>
        </div>
    )
}