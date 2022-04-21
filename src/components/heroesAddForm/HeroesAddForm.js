import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {heroCreated} from "../heroesList/heroesSlice";
import { v4 as uuidv4 } from 'uuid';


const HeroesAddForm = () => {
    const [nameHero, setNameHero] = useState('');
    const [elemHero, setElemHero] = useState('');
    const [descrHero, setDescrHero] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitInfo = (e) => {
        e.preventDefault();

            const newHero = {
                id: uuidv4(),
                name: nameHero,
                description: descrHero,
                element: elemHero
        }

        request('http://localhost:3001/heroes', "POST", JSON.stringify(newHero))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log('error'))


        setDescrHero('');
            setElemHero('');
            setNameHero('');
    }


    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitInfo}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={nameHero}
                    onChange={(e) => setNameHero(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={descrHero}
                    onChange={(e) => setDescrHero(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={elemHero}
                    onChange={(e) => setElemHero(e.target.value)}>
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
