import React, { Component } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
    progress:0
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  articles=[]
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}- NewsMonkey`;
  }
  async UpdatePage() {
    this.props.setProgress(10);
    // const url = `https://news
    //   api.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd302062e14944dd94a3ed72b0420557&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
     this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResuls: parsedData.totalResuls,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    //   try{
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd302062e14944dd94a3ed72b0420557&page=1&pageSize=${this.props.pageSize}`;
    
//https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=50c19b73a6ff4f3fa552b218d68c1e5e
    // this.setState({loading:true});

    //   let data=await fetch(url);
    //   let parsedData=await data.json();
    //   console.log("Parsed data");
    //   this.setState({
    //     articles:parsedData.
    //     articles,totalResuls:parsedData.totalResuls,
    //     loading:false
    //   })
    //   }
    //   catch(e){
    //       console.log("Something is not working ");
    //   }
    this.UpdatePage();
  }

  // handlePrevClick=async()=>{
  //   // console.log("Previous")
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd302062e14944dd94a3ed72b0420557&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading:true});

  //   // let data=await fetch(url);
  //   // let parsedData=await data.json();
  //   // this.setState({

  //   // page:this.state.page-1,
  //   // articles:parsedData.articles,
  //   // loading:false

  //   // })
  //   this.setState({page:this.state.page-1});
  //   this.UpdatePage();
  // }

  // handleNextClick=async()=>{
  //   //   console.log("next")
  //   // if(!(this.state.page+1>Math.ceil(this.state.totalResuls/this.props.pageSize))){

  //   //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd302062e14944dd94a3ed72b0420557&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loading:true});
  //   //   let data=await fetch(url);
  //   //   let parsedData=await data.json();
  //   //   this.setState({

  //   //   page:this.state.page+1,
  //   //   articles:parsedData.articles,
  //   //   loading:false
  //   //   })
  //   // }
  //   this.setState({page:this.state.page+1});
  //   this.UpdatePage();
  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    console.log(this.articles.length)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("Parsed data");
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResuls: parsedData.totalResuls,
      loading: false,
    });
  };

  //element.title?element.title.slice(0,40):""
  // !this.state.loading
  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="text-center" style={{ margin: "30px 0px" ,marginTop:"80px"}}>
            NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)}{" "}
            Headlines
          </h2>

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResuls}
            loader={<Spinner />}
          >
            {/* {{this.state.loading && <Spinner/>}} */}

            <div className="conatainer">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.content}>
                      <NewItem
                        title={element.title}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="container2 d-flex justify-content-around">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResuls/this.props.pageSize)}className="btn btn-dark" onClick={this.handleNextClick}>Next	&rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;