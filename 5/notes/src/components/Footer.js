import React from 'react'

const Footer = () => {
    const footerStyle = {
        color: 'white',
        fontStyle: 'italic',
        fontSize: 12,
        backgroundColor: 'darkred',
        position: 'relative',
        top: "100px",
        paddingLeft: "10px",
        borderRadius: 4
    }

    return (
        <div style={footerStyle} className='footer'>
            <br />
            <em>Department of Computer Science, University of Helsinki 2019</em>
        </div>
    )
}

export default Footer;