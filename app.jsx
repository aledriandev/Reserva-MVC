class Model {
  constructor () {
    this.invitedList = [];
    this.invitedConfirm = [];
    this.invited = '';
    this.callback = null;
    this.id = 0;
  }
  
  subscribe(render) {
    this.callback = render;
  }

  addInvited () {

    // if (this.invited != '' || this.invited != undefined) {
    // }
    this.invitedList.push({
      name: this.invited,
      confirm: false,
      id: this.id,
      class: '',
    });
    this.id = this.id + 1;
    this.invited = '';
    this.callback();
  }

  onChange (e) {
    console.log(e.target.value)
    this.invited = e.target.value;
    this.callback();
  }

  onSubmit (e) {
    e.preventDefault();
    this.addInvited();
  }

  cheCk (e, index) {
    // let index = parseInt(e.target.parentNode.id);
    if (this.invitedList[index].confirm) {
      this.invitedList[index].confirm = false;
      this.invitedList[index].class = '';
      this.invitedConfirm.pop();
    } else {
      this.invitedList[index].confirm = true;
      this.invitedList[index].class = 'responded';
      this.invitedConfirm.push(index);
    }
    console.log(this.invitedConfirm.length);
    this.callback();
  }

  remove (e,index) {
    // console.log(e.target.parentNode.id);
    // let index = parseInt(e.target.parentNode.id);
    this.invitedList.splice(index,1);
    if (this.invitedList[index].confirm) {
      this.invitedConfirm.pop();
    }
    this.callback();
  }
  
} 
  

const Rsvp = ({model}) => {
  const getList = () => {
    return model.invitedList.map((invited,index) => {
      return (<li key={index} id={invited.id} className={invited.class}>
                {invited.name}
                <br/>
                <label>Confirmed</label><input type="checkbox" checked={invited.confirm} onChange={e=>{model.cheCk(e,index)}}/><br/>
                <button onClick={e=>{model.remove(e,index)}}>Remove</button>
            </li>);
    });
  }

  const attending = model.invitedConfirm.length;
  const unconfirmed = model.invitedList.length - attending;
  const total = model.invitedList.length;

  return (
    <div>
        <header>
          <h1>RSVP</h1>
          <p> Registration App </p>
          <form id="registrar" onSubmit={e => {model.onSubmit(e)}}>
            <input type="text" name="name" placeholder="Invite Someone"  value={model.invited} onChange={e => {model.onChange(e)}}/>
            <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <h2>Invitees</h2>
          <div className='result'>
            <p>Attending: <b>{attending}</b></p>
            <p>Unconfirmed: <b>{unconfirmed}</b></p>
            <p>Total: <b></b>{total}</p>
          </div>
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