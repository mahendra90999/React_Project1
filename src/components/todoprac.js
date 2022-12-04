import React, { useState, useEffect } from 'react'

const getLocalData =  () => {
    const lists = localStorage.getItem("mytodoList");

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
};

const Todoprac = () => {
    const[inputData, setInputData] = useState("");
    const[items, setItems] = useState(getLocalData());
    const[isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    // add the itemss
    const addItem = () => {
        if(!inputData) {
            alert("plz fill the data");
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem) {
                        return{...curElem,name : inputData};
                    }
                    return curElem;
                })
            )
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData])
            setInputData("");
        }
    }
// edit item
    const editItem = (index) => {
        const item_todo_edit = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edit.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    // to delete items
    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !==index;
        });
        setItems(updatedItem)
    }

    const Removeall = () => {
        setItems([]);
    };

    useEffect(() => {
        localStorage.setItem("mytodoList",JSON.stringify(items))
    },[items]);

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src='https://img.icons8.com/carbon-copy/2x/todo-list.png' alt='logo'/>
                    <figcaption>add your list here✌</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" placeholder="add Item" className="form-control" value={inputData} onChange={(event) => setInputData(event.target.value) }></input>
                    {toggleButton ? 
                    (<i class="far fa-edit add-btn" onClick={addItem}></i>) : (<i class="far fa fa-plus add-btn" onClick={addItem}></i>)}
                </div>
                {/* show our items */}
                <div className='showItems'>
                        {items.map((curElem) => {
                            return(
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)  }></i>
                                    </div>
                                </div>
                            )
                        })
                            
                        }
                    
                </div>

                {/* remove All buttons */}
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove all" onClick={Removeall}>
                        <span>CHECK here</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todoprac
