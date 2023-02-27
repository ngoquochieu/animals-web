import './App.css';

function App(props) {
  return <>
      <section>
        {props.children}
      </section>
    </>
}

export default App;
