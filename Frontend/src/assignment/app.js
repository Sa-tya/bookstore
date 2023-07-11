import { useState } from "react";
import Main from "./main";

function App() {
    let [argument, setArgument] = useState([])

    return <div>
        {argument.map((ele, indx) => <p key={indx}>
            <input
                type={'text'}
                value={ele.name}
                onChange={(e) => {
                    let x = [...argument];
                    x[indx]['name'] = e.target.value
                    setArgument(x)
                }}
            />
            <select
                value={ele.value}
                onChange={(e) => {
                    let x = [...argument];
                    x[indx]['value'] = e.target.value
                    setArgument(x)
                }}
            >
                <option value={true}>true</option>
                <option value={false}>false</option>
            </select>
        </p>
        )}
        <button
            onClick={() => {
                let x = [...argument];
                x.push({ name: 'arg ' + (x.length + 1), value: false })
                setArgument(x)
            }}
        >
            + Argument
        </button>
        <br />
        <Main arguments={argument} />

    </div>
}

export default App;