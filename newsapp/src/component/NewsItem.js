import React, { Component } from 'react'


export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newUrl, date, author, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <h5 className="card-title">{title} <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '85%', zIndex: '1' }}>{source}</span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newUrl} rel="noreferrer" target="_blank" className="btn btn-sn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
