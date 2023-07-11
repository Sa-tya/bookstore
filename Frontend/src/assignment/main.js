import { useEffect, useState } from "react";


function Main(props) {
    let y = {
        level: '0',
        value: '',
        Array: []
    }
    let [onselect1, setOnSelect] = useState(y)
    let [flag, setFlag] = useState(true)

    let x = {
        level: 0,
        value: 'and',
        Array: [{
            level: 1,
            value: '',
            Array: []
        },
        {
            level: 1,
            value: '',
            Array: []
        }]
    }

    function calculation(obj) {
        if (obj.value === '') return undefined
        if (obj.value !== 'and' && obj.value !== 'or') {
            if (obj.value == 'true' || obj.value == 'false') return obj.value === 'true';
            else return props.arguments && props.arguments.length>0 && props.arguments[obj.value].value === 'true'
        }
        let temp = obj.Array.map((ele, index) => calculation(ele));
        if (obj.value === 'and')
            return temp.reduce((a, b) => a && b)
        return temp.reduce((a, b) => a || b)
    }

    function setObj(obj, level, indx, index, value) {
        if (level == obj.level && indx === index) {
            let temp = obj;
            temp.value = value
            if (value === 'and' || value === 'or')
                temp.Array = [{
                    level: level + 0,
                    value: '',
                    Array: []
                },
                {
                    level: level + 1,
                    value: '',
                    Array: []
                }]
            return temp;
        }
        else
            obj.Array = obj.Array.map((ele, index) => setObj(ele, level, indx, index, value))
        // if (obj.level === 0) setOnSelect(obj)
        return obj;
    }

    function onCancle(obj, level, indx, index) {
        if (level == obj.level && indx === index) {
            let temp = obj;
            temp.value = ''
            // if (value === 'and' || value === 'or')
            //     temp.Array = [{
            //         level: level + 1,
            //         value: '',
            //         Array: []
            //     },
            //     {
            //         level: level + 1,
            //         value: '',
            //         Array: []
            //     }]
            return temp;
        }
        else
            obj.Array = obj.Array.map((ele, index) => onCancle(ele, level, indx, index))
        // if (obj.level === 0) setOnSelect(obj)
        return obj;
    }

    function addOption(obj, level, indx, index) {
        if (level == obj.level && indx == index) {
            let temp = obj;
            temp.Array.push({
                level: level + temp.Array.length,
                value: '',
                Array: []
            })
            return temp;
        }
        else
            obj.Array = obj.Array.map((ele, index) => addOption(ele, level, indx, index))
        return obj;
    }

    function ui(obj, indx = 0) {
        let onselect = obj.value
        return (<div style={{ padding: "0px 10px" }}>
            <select onChange={(e) => {
                let temp = setObj(onselect1, obj.level, indx, 0, e.target.value)
                setOnSelect(temp)
                setFlag(!flag)
            }}>
                {onselect === '' ?
                    <>
                        <option value={''} disabled={onselect != ''}>select...</option>
                        <option value={0}>Arguments</option>
                        <option value={'false'}>Constant</option>
                        <option value={'and'}>And</option>
                        <option value={'or'}>Or</option>
                    </> :
                    onselect === 'true' || onselect === 'false' ? <>
                        <option selected={'true' === onselect} value={'true'}>true</option>
                        <option selected={'false' === onselect} value={'false'}>false</option>
                    </> :
                        onselect === 'and' || onselect === 'or' ? <>
                            <option selected={'and' === onselect} value={'and'}>And</option>
                            <option selected={'or' === onselect} value={'or'}>Or</option>
                        </>
                            : <>
                                {props.arguments && props.arguments.map((ele, indx) => <option selected={indx === onselect} value={indx}>{ele.name}</option>)}
                            </>
                }
            </select>
            <button onClick={() => {
                let temp = onCancle(onselect1, obj.level, indx, 0)
                setOnSelect(temp)
                setFlag(!flag)
            }}>X</button>
            <br />
            {(obj.value === 'and' || obj.value === 'or') && obj.Array.length !== 0 && obj.Array.map((ele, indx) => ui(ele, indx))}
            {(obj.value === 'and' || obj.value === 'or') && obj.Array.length !== 0 && <button onClick={() => {
                let newData = addOption(onselect1, obj.level, indx, 0)
                setOnSelect(newData)
                setFlag(!flag)
            }}>add +</button>}
        </div>)
    }

    useEffect(() => {
    }, [onselect1])

    return <>
        {/* <select onChange={(e) => { setOnSelect(e.target.value) }}>
            {onselect === '' ?
                <>
                    <option value={''} disabled={onselect != ''}>select...</option>
                    <option value={0}>Arguments</option>
                    <option value={'false'}>Constant</option>
                    <option value={'and'}>And</option>
                    <option value={'or'}>Or</option>
                </> :
                onselect === 'true' || onselect === 'false' ? <>
                    <option selected={'true' === onselect} value={'true'}>true</option>
                    <option selected={'false' === onselect} value={'false'}>false</option>
                </> :
                    onselect === 'and' || onselect === 'or' ? <>
                        <option selected={'and' === onselect} value={'and'}>And</option>
                        <option selected={'or' === onselect} value={'or'}>Or</option>
                    </>
                        : <>
                            {props.arguments && props.arguments.map((ele, indx) => <option selected={indx === onselect} value={indx}>{ele.name}</option>)}
                        </>
            }
        </select>
        <button onClick={() => { setOnSelect('') }}>X</button> */}
        {(flag || !flag) && ui(onselect1)}
        <h1>Calculated value - {(flag || !flag) && calculation(onselect1) ? 'true' : 'false'}</h1>
    </>
}

export default Main;