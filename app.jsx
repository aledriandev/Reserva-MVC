class Model {
  constructor () {
    this.invited = {
      name: '',
      confirm: false,
    };
    this.invitedList = [{
      name: 'Ale',
    }];
    this.callback = null;
  }
  
  subscribe(render) {
    this.callback = render;
  }

}

const Rsvp = ({model}) => {
  const getList = () => {
    return model.invitedList.map((invited,index) => {
      return (<li key={index}>
          {invited.name}
          <label >Confirmed</label>
          <input type="checkbox" name id />
          <button>Remove</button>
      </li>);
    });
  }
  return (
    <div>
        <header>
          <h1>RSVP</h1>
          <p> Registration App </p>
          <form id="registrar">
            <input type="text" name="name" placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <h2>Invitees</h2>
          <ul>{getList()}</ul>
        </div>
      </div>

  );
}

let model = new Model();
let counter = 1;

let render = () => {
  console.log('render times: ', counter++);
  ReactDOM.render(<Rsvp model={model}/>, document.getElementById('app'));

};
model.subscribe(render); 
render(); 