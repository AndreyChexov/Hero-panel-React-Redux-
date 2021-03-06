import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createSelector} from "reselect";
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import {heroDeleted, fetchHeroes} from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import heroList from './heroList.scss'


const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if(filter === 'all') {
                return heroes
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback(id => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log('error'))
        // eslint-disable-next-line
    },[request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero"
                >
                    <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }



    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component='ul'>
            {elements}
        </TransitionGroup>


    )
}

export default HeroesList;
