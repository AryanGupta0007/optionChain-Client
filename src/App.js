import './App.css';
import './components.css';
import './sections.css';
import {InputsState} from './contexts/InputsContext.js'
import {TableState} from './contexts/TableContext.js'
import {Header} from './sections/Header.js'
import {Content} from './sections/Content.js'

function App() {
    return (
        <div className="App">
            <TableState>
                <InputsState>
                    <Header/>
                    <Content/>
                </InputsState>
            </TableState>
        </div>
    );
}

export default App;
