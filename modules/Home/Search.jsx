import React, { Component } from 'react'
import axios from 'axios'
import languages from '../Utils/languages'
import SearchForm from './Search/SearchForm';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    }

    render() {
        const {
            open, selected, keywords, minVolume, maxVolume, minAdwords, maxAdwords, minCPC, maxCPC, filterKeys, eraseKeys
        } = this.state;
        return (
            <SearchForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                addKeywords={this.addKeywords}
                eraseFilter={this.eraseFilter}
                applyFilter={this.applyFilter}
                set={this.set}
                open={open}
                selected={selected}
                keywords={keywords}
                minVolume={minVolume}
                maxVolume={maxVolume}
                minAdwords={minAdwords}
                maxAdwords={maxAdwords}
                minCPC={minCPC}
                maxCPC={maxCPC}
                filterKeys={filterKeys}
                eraseKeys={eraseKeys}
                eraseKeywords={this.eraseKeywords}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { ip } = this.props
        if ((ip !== '0.0.0.1') && (ip !== prevProps.ip)) {
            axios({
                method: 'post',
                url: `http://server.borjamediavilla.com/api/localLang`,
                data: { ip },
                crossdomain: true
            })
                .then((res) => {
                    const { lang } = res.data
                    if (lang) {
                        const selected = lang.location.country_flag_emoji +
                            lang.country_name + '/' +
                            lang.location.languages[0].name + '-' +
                            lang.location.languages[0].native
                        const select = lang.country_code + ':' +
                            lang.location.languages[0].code + ':' +
                            lang.country_name + ':' +
                            lang.location.languages[0].native
                        console.log('Retrieved from your Locale Info: \n', select, ',', selected)
                        this.setState({ ...this.state, selected, select })
                    }
                    else {
                        console.log('Bad localLang response:', res.data)
                    }
                })
                .catch((e) => {
                    console.log('Bad localLang api:', e)
                })
        }
    }

    applyFilter = () => {
        const {
            minVolume, maxVolume, minAdwords, maxAdwords, minCPC, maxCPC, filterKeys, eraseKeys
        } = this.state;
        let filter = {
            minVolume, maxVolume, minAdwords, maxAdwords, minCPC, maxCPC, filterKeys, eraseKeys
        }
        this.props.set('filter', filter)
        this.setState({ ...this.state, isFilter: true })
    }

    addKeywords = (selected) => {
        if (selected[0]) {
            const option = languages.filter(lang => selected[0] === lang.flag + lang.text)
            if (option[0].value !== undefined) {
                localStorage.setItem("selected", selected[0]);
                this.setState({ ...this.state, select: option[0].value, selected: selected[0] })
            }
            else {
                this.setState({
                    ...this.state,
                    select: 'ES:es:Spain:Spanish:26',
                    selected: '🇪🇸 Spain / Spanish - Español'
                })
            }
        }
    }

    eraseFilter = () => {
        const { keywords, select } = this.state
        let filter = {
            minVolume: 0,
            maxVolume: 1000000,
            minAdwords: 0,
            maxAdwords: 100,
            minCPC: 0,
            maxCPC: 10000,
            filterKeys: '',
            eraseKeys: ''
        }
        this.props.set('query', { keywords, select })
        this.props.set('filter', filter)
        this.setState({
            ...this.state,
            minVolume: 0,
            maxVolume: 1000000,
            minAdwords: 0,
            maxAdwords: 100,
            minCPC: 0,
            maxCPC: 10000,
            isFilter: false,
            filterKeys: '',
            eraseKeys: ''
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            keywords,
            select,
            minVolume,
            maxVolume,
            minAdwords,
            maxAdwords,
            minCPC,
            maxCPC,
            isFilter,
            filterKeys,
            eraseKeys
        } = this.state;
        let filter = {}
        if (isFilter) {
            filter = {
                minVolume, 
                maxVolume, 
                minAdwords, 
                maxAdwords, 
                minCPC, 
                maxCPC, 
                filterKeys:filterKeys.toLowerCase(), 
                eraseKeys:eraseKeys.toLowerCase()
            }
        }
        else {
            filter = {
                minVolume: 0,
                maxVolume: 10000000,
                minAdwords: 0,
                maxAdwords: 100,
                minCPC: 0,
                maxCPC: 10000,
                filterKeys,
                eraseKeys
            }
        }
        this.props.set('query', { keywords:keywords.toLowerCase(), select })
        this.props.set('filter', filter)
    }

    handleChange = (event, item) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                ...this.state,
                [item]: event.target.value
            });
        }
        else {
            this.setState({
                ...this.state,
                [item]: event.target.value,
                validated: true
            });
        }
    }

    set = (key, value) => {
        this.setState({ [key]: value });
    };
}

let defaultState = {
    open: false,
    keywords: '',
    select: "ES:es:Spain:Spanish:26",
    minVolume: 0,
    maxVolume: 1000000,
    minAdwords: 0,
    maxAdwords: 100,
    minCPC: 0,
    maxCPC: 10000,
    filterKeys: '',
    eraseKeys: ''
}
