import React, { Component } from 'react'
import NewsItem from "./NewsItem"


export class News extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=5e14248b1f41483b89f49ff9cdd8fe2d";
    let data = await fetch(url);
    let parsedData = await data.json(url)
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    console.log(this.articles)
  }

  handlePrevClick = async () => {
    console.log("Previous")
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5e14248b1f41483b89f49ff9cdd8fe2d=${this.state.page - 1}&1pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }

  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5e14248b1f41483b89f49ff9cdd8fe2d=${this.state.page + 1}&1pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsReadme - TopHeadline</h1>
        <div className='row'>
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
export default News;