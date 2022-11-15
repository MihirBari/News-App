import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from './spinner';




export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }



    capitalizeFLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFLetter(this.props.category)} - NewsMonkey`
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4072274664e842d88681beb3998837b2&page=${this.props.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url)
        let parsdata = await data.json()
        this.setState({
            articles: parsdata.articles,
            totalResults: parsdata.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4072274664e842d88681beb3998837b2&page=${this.props.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url)
        let parsdata = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsdata.articles),
            totalResults: parsdata.totalResults,
            loading: false
        })
    };

    render() {
        return (
            <>
                <h2 className="text-center" style={{ margin: '80px 0px' }}>Latest News -{this.capitalizeFLetter(this.props.category)} </h2>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.totalResults}
                    loader={<spinner />}
                >
                    <div className="container">
                        <div className="row" >
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imgUrl={element.urlToImage}
                                        newUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
