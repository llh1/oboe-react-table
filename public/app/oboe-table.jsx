class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tmp: []
    };
  }

  componentDidMount() {
    oboe("data").node("employees.*", function(record) {
      var tmp = this.state.tmp;
      tmp.push(record);
      
      if(tmp.length === 100) {
        var data = this.state.data.concat(tmp);
        this.setState({
          data: data,
          tmp: []
        }); 
      } else {
        this.setState({tmp: tmp});
      }
    }.bind(this));
  }

  shouldComponentUpdate(newProps, newState) {
    if(newState.tmp.length === 0) return true;
    return false;
  }

  getTableHeader() {
    var keys = Object.keys(this.state.data[0]); 
    return keys.map(key => {
      return <th>{key}</th>;
    });
  }

  getTableBody() {
    return this.state.data.map(row => {
      var cells = Object.keys(row).map(item => {
        return <td>{row[item]}</td>; 
      }); 

      return <tr>{cells}</tr>;
    });  
  }

  render() {
    if(this.state.data.length === 0) return null;

    return (
      <div>
      <h1>Example Oboe.js table</h1>
      <h2>{this.state.data.length} records</h2>
      <table className="gradienttable">
        <tbody>
        <tr>
        {this.getTableHeader()}
        </tr>
        {this.getTableBody()}
        </tbody>
      </table>
      </div>
    );
  }
}

ReactDOM.render(<Table />, document.getElementById("container"));
