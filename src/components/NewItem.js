import React, { Component } from "react";

export class NewItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date,source } = this.props;

    return (
      <div className="my-3">
        {/* width as key and 18 rem as string */}
        <div className="card mx-5">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"2",left:"90%"}}>
            {source}
            <span class="visually-hidden">unread messages</span>
          </span>
          <img src={!imageUrl?"https://wallpapers.com/images/high/astronaut-art-cool-picture-tpr7tdngfm9t47i0.webp":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-truncate">{title}</h5>
            <span class="badge text-bg-success">New</span>
            <p className="card-text ">{description}...</p>
            <p className="card-text">
              <small class="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewItem;