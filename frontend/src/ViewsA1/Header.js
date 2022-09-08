
function Header(props) {

    const token = JSON.parse(sessionStorage.getItem('token')).token

    return(
        <>
            <div className='col-3 header1'>
                 <h1>{props.DataHeader}</h1>
            </div>

            <div className="col-4 header2">
                <h4>{token.username}</h4>
            </div>
        </>
    )
}

export default Header;