var ____Class14=React.Component;for(var ____Class14____Key in ____Class14){if(____Class14.hasOwnProperty(____Class14____Key)){Table[____Class14____Key]=____Class14[____Class14____Key];}}var ____SuperProtoOf____Class14=____Class14===null?null:____Class14.prototype;Table.prototype=Object.create(____SuperProtoOf____Class14);Table.prototype.constructor=Table;Table.__superConstructor__=____Class14;
  function Table(props) {"use strict";
    ____Class14.call(this,props);
    this.state = {
      data: [],
      loaded: true,
      tmp: []
    };
  }

  Table.prototype.componentDidMount=function() {"use strict";
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
        this.setState({tmp: tmp, loaded: false});
      }
    }.bind(this)).node("employees", function() {
      this.setState({loaded: true})
    }.bind(this));
  };

  Table.prototype.shouldComponentUpdate=function(newProps, newState) {"use strict";
    if(newState.tmp.length === 0) return true;
    return false;
  };

  Table.prototype.getTableHeader=function() {"use strict";
    var keys = Object.keys(this.state.data[0]); 
    return keys.map(function(key)  {
      return React.createElement("th", null, key);
    });
  };

  Table.prototype.getTableBody=function() {"use strict";
    return this.state.data.map(function(row)  {
      var cells = Object.keys(row).map(function(item)  {
        return React.createElement("td", null, row[item]); 
      }); 

      return React.createElement("tr", null, cells);
    });  
  };

  Table.prototype.render=function() {"use strict";
    if(this.state.data.length === 0) return null;

    return (
      React.createElement("div", null, 
      React.createElement("h1", null, "Example Oboe.js table"), 
      React.createElement("h2", null, 
        this.state.data.length, " records",  
        this.state.loaded ? "" : " (loading...)"
      ), 
      React.createElement("table", {className: "gradienttable"}, 
        React.createElement("tbody", null, 
        React.createElement("tr", null, 
        this.getTableHeader()
        ), 
        this.getTableBody()
        )
      )
      )
    );
  };


ReactDOM.render(React.createElement(Table, null), document.getElementById("container"));
