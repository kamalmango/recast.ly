class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentVideo: null,
      videos: [],
      query: null
    };
  }

  componentDidMount() {
    this.getYouTubeVideos(this.state.query);
  }

  getYouTubeVideos(query) {
    var options = {
      key: this.props.API_KEY,
      query: query
    };

    this.props.searchYouTube(options, (videos) =>
      this.setState({
        videos: videos,
        currentVideo: videos[0]
      })
    );
  }

  handleVideoListEntryClick(video) {
    this.setState({
      currentVideo: video
    });
  }

  handleSearchInput() {
    this.setState({
      query: $('.form-control').val()
    });
    this.getYouTubeVideos(this.state.query);
  }

  render() {
    return (
      <div>
        <Nav handleSearchInput={this.handleSearchInput.bind(this)}/>
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo}/>
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.videos} handleVideoListEntryClick={this.handleVideoListEntryClick.bind(this)}/>
        </div>
      </div>
    );
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
